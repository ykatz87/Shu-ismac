
import { GoogleGenAI, Modality } from "@google/genai";
import { convertTransliterationToSpokenArabic } from './geminiService';
import { getCachedAudio, setCachedAudio } from './audioCacheService';

let currentAudioSource: AudioBufferSourceNode | null = null;

function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const buffer = ctx.createBuffer(1, dataInt16.length, sampleRate);
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < dataInt16.length; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
}

const playDecodedAudio = async (base64Audio: string) => {
    if (currentAudioSource) {
        try { currentAudioSource.stop(); } catch (e) {}
    }
    const sampleRate = 24000;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate });

    const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, sampleRate);
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.start();
    currentAudioSource = source;
};

export async function generateAndPlayAudio(text: string): Promise<void> {
    try {
        const cached = await getCachedAudio(text);
        if (cached) { await playDecodedAudio(cached); return; }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const arabicText = await convertTransliterationToSpokenArabic(text);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Native speaker, spoken Palestinian dialect, natural vowels: ${arabicText}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }
            },
        });

        const audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (audio) {
            await playDecodedAudio(audio);
            await setCachedAudio(text, audio);
        }
    } catch (error) {
        console.error("Audio service error:", error);
    }
}
