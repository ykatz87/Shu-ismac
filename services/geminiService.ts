import { GoogleGenAI, Type } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export async function convertTransliterationToSpokenArabic(transliteration: string): Promise<string> {
    if (!API_KEY) {
        throw new Error("Gemini API key not found.");
    }
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `
                You are a linguistic tool that converts Hebrew-based phonetic transliteration of spoken Palestinian Arabic into Arabic script with precise diacritics. Your output is fed directly into a Text-to-Speech engine, so the diacritics (harakat) MUST perfectly match the spoken dialect's pronunciation.

                **CRITICAL RULES:**
                1.  **Follow the Nikud:** The Hebrew nikud (vowels) in the transliteration is the absolute source of truth for pronunciation. Your Arabic output must reflect it exactly.
                2.  **Spoken Dialect Only:** Do NOT use formal or literary Arabic (MSA) grammar or endings. This is especially important for case endings.
                3.  **No Extra Text:** Return ONLY the Arabic script with diacritics.

                **EXAMPLES:**
                - Input: "כּיף חאלַכּ"
                - Correct Output: "كِيف حَالَك"
                - Wrong Output: "كَيْفَ حَالُكَ" (This is MSA, incorrect).

                - Input: "אַנַא בַּכְּתֹבּ"
                - Correct Output: "أَنَا بَكْتُب"

                - Input: "שוּ אִסְמַכּ"
                - Correct Output: "شُو اسْمَك"

                **TASK:**
                Convert the following transliteration: "${transliteration}"
            `
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error converting transliteration to Arabic:", error);
        throw new Error("Failed to convert transliteration.");
    }
}


export async function getPronunciationFeedback(
  audioBase64: string,
  correctPhrase: string
): Promise<string> {
  if (!API_KEY) {
    return "תכונת ה-AI אינה זמינה. חסר מפתח API.";
  }

  try {
    const audioPart = {
      inlineData: {
        mimeType: 'audio/wav',
        data: audioBase64,
      },
    };

    const textPart = {
      text: `
אתה מורה לערבית פלסטינית מדוברת. התלמיד ניסה לומר: "${correctPhrase}"

האזן להקלטה ותן משוב בעברית על:
1. דיוק ההגייה
2. איזה צלילים יצאו טוב
3. איזה צלילים צריכים שיפור
4. עצות קונקרטיות לשיפור

המשוב צריך להיות חיובי, מעודד, ומעשי.
החזר רק את גוף המשוב, ללא הקדמות.
לדוגמה:
✅ יפה מאוד! ההגייה שלך מדויקת.
💡 טיפ קטן: נסה להדגיש יותר את הצליל "ח" בתחילת המילה "חאל".
המשך לתרגל! 💪
`
    };
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [audioPart, textPart] },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API for feedback:", error);
    throw new Error("Failed to get pronunciation feedback from Gemini.");
  }
}

export async function generateConversationTopic(): Promise<{ topic: string, vocabulary: { arabic: string, hebrew: string }[], example: string }> {
  if (!API_KEY) {
    throw new Error("Gemini API key not found.");
  }
  
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `
צור נושא שיחה פשוט בערבית פלסטינית מדוברת למתחילים.
התמקד בסיטואציות יומיומיות: קניות, הזמנת אוכל, שאילת שלום, וכו'.
החזר בפורמט JSON בלבד, התואם למבנה הבא:
{
  "topic": "כותרת הנושא בעברית",
  "vocabulary": [
    {"arabic": "תעתיק עברי למילה 1", "hebrew": "תרגום לעברית"},
    {"arabic": "תעתיק עברי למילה 2", "hebrew": "תרגום לעברית"},
    {"arabic": "תעתיק עברי למילה 3", "hebrew": "תרגום לעברית"}
  ],
  "example": "משפט לדוגמה קצר בתעתיק עברי"
}
`,
      config: {
        responseMimeType: "application/json",
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);

  } catch (error) {
    console.error("Error calling Gemini API for conversation topic:", error);
    throw new Error("Failed to generate conversation topic from Gemini.");
  }
}

export async function getTranslationForDrill(
  hebrewPhrase: string,
  context: string
): Promise<string> {
  if (!API_KEY) {
    throw new Error("Gemini API key not found.");
  }
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `
You are a linguistic tool that translates Hebrew to spoken Palestinian Arabic.
Your output must follow a specific Hebrew-based phonetic transliteration system.
The user is in a lesson about "${context}".
The user wants to know how to say: "${hebrewPhrase}"

**Transliteration Rules:**
- ع (ein) -> ע
- غ (ghayn) -> ע׳
- ح (haa) -> ח
- خ (khaa) -> ח׳
- ء (hamza) -> א
- ج (jiim) -> ג'
- ك (kaaf, hard) -> כּ (with dagesh)
- ط (taa) -> ט
- ص (saad) -> צ
- ث (thaa) -> ת'
- ذ (dhaal) -> ד'
- Shadda (doubling) -> double the consonant (e.g., סַכְכַּר)

**CRITICAL TASK:**
Provide ONLY the transliterated spoken Palestinian Arabic phrase. Do not add any other text, explanations, or quotation marks.

Example Input: "אפשר חשבון בבקשה"
Example Output: "מֻמְכֵּן אִל-חְסַאבּ, מִן פַצְ׳לַכּ"
`
    });
    // Remove potential quotes or markdown from the response
    return response.text.trim().replace(/[\`"']/g, '');
  } catch (error) {
    console.error("Error generating translation:", error);
    throw new Error("Failed to generate translation from Gemini.");
  }
}