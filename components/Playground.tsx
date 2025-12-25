
import React, { useState, useRef, useCallback } from 'react';
import { PHRASES } from '../constants';
import { MicrophoneIcon, PlayIcon, StopIcon, SparklesIcon, LoadingSpinnerIcon } from './Icons';
import { generateConversationTopic, getPronunciationFeedback } from '../services/geminiService';
import { generateAndPlayAudio } from '../services/elevenLabsService';

interface LocalPhrase {
  id: number;
  category: string;
  transliteration: string;
  hebrew: string;
}

const PLAYGROUND_PHRASES: LocalPhrase[] = PHRASES.flatMap((category, categoryIndex) => 
  category.phrases.map((phrase, phraseIndex) => ({
    ...phrase,
    id: categoryIndex * 1000 + phraseIndex,
    category: category.id,
  }))
);

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const PronunciationPractice: React.FC<{ phrase: LocalPhrase }> = ({ phrase }) => {
  const [permission, setPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [userAudioURL, setUserAudioURL] = useState<string | null>(null);
  const [userAudioBlob, setUserAudioBlob] = useState<Blob | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isFetchingFeedback, setIsFetchingFeedback] = useState(false);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const playSource = async () => {
    setIsLoadingAudio(true);
    await generateAndPlayAudio(phrase.transliteration);
    setIsLoadingAudio(false);
  };

  const getPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermission(true);
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: 'audio/wav' });
        setUserAudioBlob(blob);
        setUserAudioURL(URL.createObjectURL(blob));
        audioChunks.current = [];
      };
    } catch (e) { alert("גישה למיקרופון נדחתה."); }
  };

  const startRec = () => {
    if (!permission) { getPermission().then(() => mediaRecorder.current?.start()); }
    else { mediaRecorder.current?.start(); }
    setIsRecording(true);
    setFeedback(null);
    setUserAudioURL(null);
  };

  const stopRec = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };

  const getFeedback = async () => {
    if (!userAudioBlob) return;
    setIsFetchingFeedback(true);
    try {
      const base64 = await blobToBase64(userAudioBlob);
      const res = await getPronunciationFeedback(base64, phrase.transliteration);
      setFeedback(res);
    } catch (e) { setFeedback("שגיאה בניתוח ההקלטה."); }
    finally { setIsFetchingFeedback(false); }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg border space-y-4">
      <div className="text-center">
        <p className="text-3xl font-bold text-teal-700" dir="rtl">{phrase.transliteration}</p>
        <p className="text-xl text-gray-800">{phrase.hebrew}</p>
      </div>
      <div className="flex justify-center gap-4 p-4 bg-gray-50 rounded-lg">
        <button onClick={playSource} disabled={isLoadingAudio} className="p-3 bg-teal-500 text-white rounded-full">
          {isLoadingAudio ? <LoadingSpinnerIcon className="w-6" /> : <PlayIcon className="w-6" />}
        </button>
        {userAudioURL && <audio controls src={userAudioURL} className="h-10" />}
      </div>
      <div className="flex justify-center">
        {!isRecording ? (
          <button onClick={startRec} className="px-6 py-3 bg-blue-500 text-white rounded-full flex items-center gap-2">
            <MicrophoneIcon className="w-6" /> התחל הקלטה
          </button>
        ) : (
          <button onClick={stopRec} className="px-6 py-3 bg-red-500 text-white rounded-full flex items-center gap-2 animate-pulse">
            <StopIcon className="w-6" /> עצור
          </button>
        )}
      </div>
      {userAudioURL && !isFetchingFeedback && (
        <button onClick={getFeedback} className="w-full py-2 bg-green-600 text-white rounded-full">נתח הגייה עם AI</button>
      )}
      {feedback && <div className="p-4 bg-green-50 rounded-lg text-right" dir="rtl">{feedback}</div>}
    </div>
  );
};

const PlaygroundView: React.FC = () => {
  const [phrase, setPhrase] = useState(PLAYGROUND_PHRASES[0]);
  const [topic, setTopic] = useState<any>(null);
  const [loadingTopic, setLoadingTopic] = useState(false);

  const getTopic = async () => {
    setLoadingTopic(true);
    try { setTopic(await generateConversationTopic()); } catch (e) {}
    finally { setLoadingTopic(false); }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <section>
        <h3 className="text-2xl font-bold mb-4">תרגול הגייה</h3>
        <PronunciationPractice phrase={phrase} />
        <button onClick={() => setPhrase(PLAYGROUND_PHRASES[Math.floor(Math.random() * PLAYGROUND_PHRASES.length)])} className="mt-4 text-teal-600 font-bold">החלף ביטוי</button>
      </section>
      <section className="p-6 bg-purple-50 rounded-xl border border-purple-200">
        <h3 className="text-2xl font-bold mb-4">מחולל שיחות</h3>
        <button onClick={getTopic} disabled={loadingTopic} className="w-full py-3 bg-purple-600 text-white rounded-full flex justify-center items-center gap-2">
          {loadingTopic ? <LoadingSpinnerIcon className="w-6" /> : <SparklesIcon className="w-6" />} קבל נושא לשיחה
        </button>
        {topic && (
          <div className="mt-6 space-y-2 text-right" dir="rtl">
            <p className="font-bold text-purple-800">נושא: {topic.topic}</p>
            <p>דוגמה: {topic.example}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default PlaygroundView;
