import { GoogleGenAI, Modality } from "@google/genai";
import { convertTransliterationToSpokenArabic } from './geminiService';
import { getCachedAudio, setCachedAudio } from './audioCacheService';

const API_KEY = process.env.API_KEY;

// Keep track of the currently playing audio
let currentAudioContext: AudioContext | null = null;
let currentAudioSource: AudioBufferSourceNode | null = null;

// Helper function to decode base64 string to Uint8Array
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper function to decode raw PCM audio data into an AudioBuffer
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const playDecodedAudio = async (base64Audio: string) => {
    // Stop any currently playing audio before starting a new one
    if (currentAudioSource) {
        try {
            currentAudioSource.stop();
        } catch (e) {
            console.warn("Could not stop previous audio source", e);
        }
        currentAudioSource = null;
    }
    if (currentAudioContext && currentAudioContext.state !== 'closed') {
        await currentAudioContext.close().catch(e => console.warn("Could not close previous audio context", e));
        currentAudioContext = null;
    }

    const sampleRate = 24000;
    const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate });
    currentAudioContext = outputAudioContext;

    const audioBuffer = await decodeAudioData(
        decode(base64Audio),
        outputAudioContext,
        sampleRate,
        1, // mono channel
    );

    const source = outputAudioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(outputAudioContext.destination);
    source.start();
    currentAudioSource = source;

    // Clean up when audio finishes
    source.onended = () => {
         if (currentAudioSource === source) {
            currentAudioSource = null;
        }
        if (currentAudioContext === outputAudioContext && outputAudioContext.state !== 'closed') {
            outputAudioContext.close().catch(e => console.warn("Error closing audio context", e));
        }
    };
};

export async function generateAndPlayAudio(text: string): Promise<void> {
    if (!API_KEY) {
        alert("Gemini API key not found. Audio features will not work.");
        console.warn("Gemini API key not found. Audio features will not work.");
        return;
    }

    try {
        // Step 1: Check cache first
        const cachedAudio = await getCachedAudio(text);
        if (cachedAudio) {
            await playDecodedAudio(cachedAudio);
            return;
        }

        // Step 2: If not in cache, generate audio via API
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        
        const arabicText = await convertTransliterationToSpokenArabic(text);
        if (!arabicText) {
            console.error("Conversion to Arabic script returned an empty string for input:", text);
            throw new Error("Conversion to Arabic script failed.");
        }

        // Add a specific prompt to the TTS model to enforce dialect pronunciation.
        const ttsPrompt = `As a native speaker of Palestinian Arabic, please pronounce the following text. It is crucial to use the spoken dialect's pronunciation, not the formal literary one. Pay close attention to the vowels, especially at the end of words: ${arabicText}`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: ttsPrompt }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' }, 
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        
        if (!base64Audio) {
            console.error("Gemini TTS API Response did not contain audio data. Full response:", JSON.stringify(response, null, 2));
            throw new Error("No audio data received from Gemini TTS API.");
        }

        // Step 3: Play the newly generated audio
        await playDecodedAudio(base64Audio);

        // Step 4: Save the new audio to cache for next time
        await setCachedAudio(text, base64Audio);

    } catch (error) {
        console.error("Error generating or playing audio with Gemini TTS:", error);
        alert("שגיאה: לא הצלחנו לנגן את השמע.");
    }
}