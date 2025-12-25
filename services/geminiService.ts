
import { GoogleGenAI, Type } from "@google/genai";

// Exclusively obtaining the key from process.env.API_KEY as per instructions.
// Vite will inject this during build if defined in Vercel.
const getApiKey = () => {
  try {
    return process.env.API_KEY;
  } catch (e) {
    return undefined;
  }
};

const API_KEY = getApiKey();

/**
 * MASTER PROMPT: The core intelligence of "Shu Ismak"
 * Consolidates transliteration rules, pedagogical approach, and linguistic dialect.
 */
export const SHU_ISMAK_CORE_PROMPT = `
You are "Shu Ismak AI Assistant", a specialist tutor for spoken Palestinian Arabic (Ammiya) designed for Hebrew speakers.

MASTER TRANSLITERATION RULES (Arabic to Hebrew Phonetic):
1. Gutturals:
   - ע (ein) -> ע (e.g., עַרַבִּי)
   - غ (ghayn) -> ע׳ (e.g., ע׳ַאלי)
   - ح (haa) -> ח (e.g., חַבִּיבּ)
   - خ (khaa) -> ח׳ (e.g., ח׳וּבְּז)
2. Stops and Plosives:
   - ء (hamza) or Qaf (dialect) -> א (e.g., סַאַל, אֻלְתִלּוֹ)
   - ج (jiim) -> ג' (e.g., גַ'מִיל)
   - ك (kaaf) -> כּ (hard with dagesh)
3. Emphatics:
   - ט (taa) -> ט
   - צ (saad) -> צ
   - ض (daad) -> צ'
   - ظ (zaad) -> ז'
4. Interdentals:
   - ث (thaa) -> ת' (e.g., תַ'לַאתֶ'ה)
   - ذ (dhaal) -> ד' (e.g., דַ'הַבּ)
5. Shadda (Doubling):
   - Double the Hebrew letter and add a Sheva to the first one (e.g., סַכְכַּר, אַחְנַּא).
6. Vowels (Nikud):
   - Strictly use Hebrew Nikud: PataH/Kamatz (a), Hirik (i), Kubutz/Shuruq (u), Segol/Tzere (e), Holam (o).

PEDAGOGICAL GUIDELINES:
- Focus on practical, every-day communication.
- Use ONLY spoken Palestinian dialect (not Fusha).
- Emphasize root connections between Hebrew and Arabic.
- Be encouraging and clear.
`;

const getAIInstance = () => {
  if (!API_KEY) {
    throw new Error("מפתח API לא הוגדר. אנא הגדר את API_KEY ב-Vercel Environment Variables.");
  }
  return new GoogleGenAI({ apiKey: API_KEY });
};

export async function convertTransliterationToSpokenArabic(transliteration: string): Promise<string> {
    const ai = getAIInstance();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on the rules provided, convert this Hebrew transliteration to standard Arabic script with full diacritics. Input: "${transliteration}"`,
            config: {
                systemInstruction: SHU_ISMAK_CORE_PROMPT + "\nReturn ONLY the Arabic text result."
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error converting transliteration:", error);
        throw error;
    }
}

export async function getPronunciationFeedback(audioBase64: string, correctPhrase: string): Promise<string> {
    const ai = getAIInstance();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { inlineData: { mimeType: 'audio/wav', data: audioBase64 } },
                    { text: `The user is practicing this phrase: "${correctPhrase}". Provide feedback in Hebrew on their pronunciation precision and stress.` }
                ]
            },
            config: { systemInstruction: SHU_ISMAK_CORE_PROMPT }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Feedback error:", error);
        throw error;
    }
}

export async function generateConversationTopic(): Promise<any> {
    const ai = getAIInstance();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: "Generate a conversation topic with vocabulary and one example sentence.",
            config: {
                systemInstruction: SHU_ISMAK_CORE_PROMPT,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        topic: { type: Type.STRING },
                        vocabulary: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    arabic: { type: Type.STRING, description: "Transliterated Arabic" },
                                    hebrew: { type: Type.STRING }
                                }
                            }
                        },
                        example: { type: Type.STRING, description: "Transliterated Arabic example" }
                    }
                }
            }
        });
        return JSON.parse(response.text.trim());
    } catch (error) {
        console.error("Topic generation error:", error);
        throw error;
    }
}

export async function getTranslationForDrill(hebrewPhrase: string, context: string): Promise<string> {
    const ai = getAIInstance();
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Translate to spoken Palestinian Arabic using transliteration rules. Context: "${context}". Hebrew: "${hebrewPhrase}".`,
            config: { systemInstruction: SHU_ISMAK_CORE_PROMPT + "\nReturn ONLY the transliteration." }
        });
        return response.text.trim().replace(/[\`"']/g, '');
    } catch (error) {
        console.error("Translation error:", error);
        throw error;
    }
}
