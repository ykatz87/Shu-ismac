
import React, { useState, useRef, useCallback } from 'react';
// FIX: Import `PHRASES` as it is the available export, instead of the non-existent `PLAYGROUND_PHRASES`.
import { PHRASES } from '../constants';
import { MicrophoneIcon, PlayIcon, StopIcon, SparklesIcon, LoadingSpinnerIcon } from './Icons';
import { generateConversationTopic, getPronunciationFeedback } from '../services/geminiService';
import { generateAndPlayAudio } from '../services/elevenLabsService';

interface Phrase {
  id: number;
  category: string;
  transliteration: string;
  hebrew: string;
}

// FIX: Generate `PLAYGROUND_PHRASES` from the imported `PHRASES` constant to provide data in the expected format.
const PLAYGROUND_PHRASES: Phrase[] = PHRASES.flatMap((category, categoryIndex) => 
  category.phrases.map((phrase, phraseIndex) => ({
    ...phrase,
    id: categoryIndex * 1000 + phraseIndex,
    category: category.id,
  }))
);

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const PronunciationPractice: React.FC<{ phrase: Phrase }> = ({ phrase }) => {
  const [permission, setPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [userAudioURL, setUserAudioURL] = useState<string | null>(null);
  const [userAudioBlob, setUserAudioBlob] = useState<Blob | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isFetchingFeedback, setIsFetchingFeedback] = useState(false);
  const [isSourceAudioLoading, setIsSourceAudioLoading] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const playSourceAudio = async () => {
    if (isSourceAudioLoading) return;
    setIsSourceAudioLoading(true);
    try {
      await generateAndPlayAudio(phrase.transliteration);
    } finally {
      setIsSourceAudioLoading(false);
    }
  };

  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setPermission(true);
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };
        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
          setUserAudioBlob(audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          setUserAudioURL(audioUrl);
          audioChunks.current = [];
          setFeedback(null); // Clear previous feedback
        };
      } catch (err) {
        alert("נדרשת גישה למיקרופון כדי להקליט.");
        console.error("Error getting microphone permission:", err);
      }
    } else {
      alert("הדפדפן שלך לא תומך בהקלטת אודיו.");
    }
  };

  const startRecording = () => {
    const start = () => {
        if (mediaRecorder.current) {
            setUserAudioURL(null);
            setUserAudioBlob(null);
            setFeedback(null);
            setIsRecording(true);
            mediaRecorder.current.start();
        }
    }
    if (!permission) {
      getMicrophonePermission().then(start);
    } else {
        start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
        setIsRecording(false);
        mediaRecorder.current.stop();
    }
  };

  const handleGetFeedback = async () => {
    if (!userAudioBlob) return;
    setIsFetchingFeedback(true);
    setFeedback(null);
    try {
      const audioBase64 = await blobToBase64(userAudioBlob);
      const geminiFeedback = await getPronunciationFeedback(audioBase64, phrase.transliteration);
      setFeedback(geminiFeedback);
    } catch (err) {
      console.error("Failed to get feedback:", err);
      setFeedback("שגיאה: לא הצלחנו לקבל משוב על ההקלטה שלך.");
    } finally {
      setIsFetchingFeedback(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 space-y-4">
      <div className="text-center">
        <p className="text-gray-600">תרגל את הביטוי:</p>
        <p className="text-3xl font-bold text-teal-700 my-2" dir="rtl">{phrase.transliteration}</p>
        <p className="text-xl text-gray-800">{phrase.hebrew}</p>
      </div>

      <div className="flex justify-center items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-1">מקור</p>
          <button 
            onClick={playSourceAudio}
            disabled={isSourceAudioLoading}
            className="p-3 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-transform transform hover:scale-110 disabled:bg-teal-300 disabled:cursor-wait">
            {isSourceAudioLoading ? <LoadingSpinnerIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
          </button>
        </div>
        <div className="w-px h-16 bg-gray-300"></div>
        <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">ההקלטה שלך</p>
            {userAudioURL ? (
                <audio controls src={userAudioURL} className="h-10"></audio>
            ) : (
                <div className="h-10 flex items-center justify-center text-gray-500">הקלט כדי לשמוע</div>
            )}
        </div>
      </div>
      
      <div className="flex justify-center">
        {!isRecording ? (
          <button onClick={startRecording} className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-bold rounded-full hover:bg-blue-600 transition-all transform hover:scale-105 shadow-md">
            <MicrophoneIcon className="w-6 h-6" />
            <span>התחל הקלטה</span>
          </button>
        ) : (
          <button onClick={stopRecording} className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-all shadow-md animate-pulse">
            <StopIcon className="w-6 h-6" />
            <span>עצור הקלטה</span>
          </button>
        )}
      </div>

      {userAudioURL && (
        <div className="mt-4 text-center">
          <button 
            onClick={handleGetFeedback}
            disabled={isFetchingFeedback}
            className="flex items-center justify-center gap-2 w-full max-w-xs mx-auto px-4 py-2 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition-all transform hover:scale-105 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <SparklesIcon className="w-5 h-5" />
            <span>{isFetchingFeedback ? 'מעבד...' : 'קבל משוב מהבינה המלאכותית'}</span>
          </button>
        </div>
      )}

      {isFetchingFeedback && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
              <p className="text-gray-600 animate-pulse">הבינה המלאכותית מאזינה להקלטה שלך...</p>
          </div>
      )}

      {feedback && !isFetchingFeedback && (
          <div className="mt-4 p-4 bg-green-50 border-r-4 border-green-500 rounded-lg whitespace-pre-wrap text-right" dir="rtl">
              <p className="font-semibold text-green-800">משוב על ההגייה שלך:</p>
              <p className="text-gray-700">{feedback}</p>
          </div>
      )}
    </div>
  );
};

const ConversationGenerator: React.FC = () => {
    const [topic, setTopic] = useState<{ topic: string, vocabulary: { arabic: string, hebrew: string }[], example: string } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleNewTopic = useCallback(async () => {
        setIsLoading(true);
        setTopic(null);
        try {
            const newTopic = await generateConversationTopic();
            setTopic(newTopic);
        } catch (error) {
            console.error("Failed to generate topic:", error);
            // Handle error state if needed
        }
        setIsLoading(false);
    }, []);

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 text-center">
            <p className="text-gray-600 mb-4">צריך רעיון על מה לדבר? קבל נושא שיחה מהבינה המלאכותית.</p>
            <button
                onClick={handleNewTopic}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-all transform hover:scale-105 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                <SparklesIcon className="w-6 h-6" />
                <span>{isLoading ? 'חושב...' : 'קבל רעיון לשיחה'}</span>
            </button>
            {isLoading && <LoadingSpinnerIcon className="w-8 h-8 mx-auto mt-4 text-purple-600" />}
            {topic && !isLoading && (
                <div className="mt-6 p-4 bg-purple-50 border-r-4 border-purple-500 rounded-lg text-right" dir="rtl">
                    <h4 className="text-lg font-semibold text-purple-800">💡 נושא: {topic.topic}</h4>
                    <div className="mt-4">
                        <p className="font-semibold text-gray-700">מילים שימושיות:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {topic.vocabulary.map((word, i) => (
                                <li key={i} className="text-gray-800">
                                    <span className="font-mono text-purple-700">{word.arabic}</span> - {word.hebrew}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
                         <p className="font-semibold text-gray-700">נסה לבנות משפט!</p>
                    </div>
                </div>
            )}
        </div>
    );
}


const PlaygroundView: React.FC = () => {
    const [practicePhrase, setPracticePhrase] = useState<Phrase>(PLAYGROUND_PHRASES.find(p => p.category === 'PlaygroundDefault') || PLAYGROUND_PHRASES[0]);
    
    const selectRandomPhrase = () => {
        const otherPhrases = PLAYGROUND_PHRASES.filter(p => p.id !== practicePhrase.id);
        const randomIndex = Math.floor(Math.random() * otherPhrases.length);
        setPracticePhrase(otherPhrases[randomIndex]);
    };

    return (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">מגרש משחקים</h2>
        <p className="text-lg text-gray-600 mb-8">כאן המקום לתרגל את ההגייה, לשחק ולהשתפר!</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-700">תרגול הגייה עם AI</h3>
                <PronunciationPractice phrase={practicePhrase} />
                <button 
                    onClick={selectRandomPhrase}
                    className="w-full py-3 bg-white border-2 border-teal-500 text-teal-600 font-bold rounded-lg hover:bg-teal-50 transition-transform transform hover:scale-105"
                >
                    בחר ביטוי אחר
                </button>
            </div>
            <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-700">מחולל נושאי שיחה</h3>
                 <ConversationGenerator />
            </div>
        </div>
    </div>
  );
};

export default PlaygroundView;