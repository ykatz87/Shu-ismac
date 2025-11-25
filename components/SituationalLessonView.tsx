import React, { useState, useEffect } from 'react';
import { SituationalLesson, Phrase, SituationalLessonDrill, VocabularyWord } from '../types';
import { View } from '../App';
import { generateAndPlayAudio } from '../services/elevenLabsService';
import { getTranslationForDrill } from '../services/geminiService';
import { PlayIcon, LoadingSpinnerIcon, CheckCircleIcon, SparklesIcon, LightBulbIcon } from './Icons';
import AskAI from './AskAI';

const AudioButton: React.FC<{ text: string }> = ({ text }) => {
    const [isLoading, setIsLoading] = useState(false);
    const play = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isLoading || !text) return;
        setIsLoading(true);
        await generateAndPlayAudio(text);
        setIsLoading(false);
    };
    return (
        <button
            onClick={play}
            disabled={isLoading}
            className="p-2 rounded-full text-teal-600 transition-all duration-200 disabled:opacity-50 hover:bg-teal-100 active:scale-90 transform"
            aria-label={`השמע ${text}`}
        >
            {isLoading ? <LoadingSpinnerIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
        </button>
    );
};


const LearnView: React.FC<{ phrases: Phrase[]; vocabulary?: VocabularyWord[] }> = ({ phrases, vocabulary }) => (
    <div className="space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">ביטויים שימושיים</h3>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] text-right">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="p-3 font-semibold text-gray-600">ביטוי (תעתיק)</th>
                            <th className="p-3 font-semibold text-gray-600">תרגום</th>
                            <th className="p-3 font-semibold text-gray-600 text-center">שמע</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phrases.map((phrase, index) => (
                            <tr key={index} className="border-b last:border-0 hover:bg-teal-50/50">
                                <td className="p-4 text-xl font-semibold text-teal-800" dir="rtl">{phrase.transliteration}</td>
                                <td className="p-4 text-gray-700" dir="rtl">{phrase.hebrew}</td>
                                <td className="p-4 text-center">
                                    <AudioButton text={phrase.transliteration} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {vocabulary && vocabulary.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">שמות עצם בנושא</h3>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px] text-right">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="p-3 font-semibold text-gray-600">מילה (תעתיק)</th>
                                <th className="p-3 font-semibold text-gray-600">תרגום</th>
                                <th className="p-3 font-semibold text-gray-600 text-center">שמע</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vocabulary.map((word, index) => (
                                <tr key={`vocab-${index}`} className="border-b last:border-0 hover:bg-teal-50/50">
                                    <td className="p-4 text-xl font-semibold text-teal-800" dir="rtl">{word.transliteration}</td>
                                    <td className="p-4 text-gray-700" dir="rtl">{word.hebrew}</td>
                                    <td className="p-4 text-center">
                                        <AudioButton text={word.transliteration} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
    </div>
);

const PracticeView: React.FC<{ drills: SituationalLessonDrill[], onComplete: () => void }> = ({ drills, onComplete }) => {
    const [currentDrillIndex, setCurrentDrillIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        if(drills.length > 0) {
            setCurrentDrillIndex(0);
            setScore(0);
            setUserAnswer(null);
            setIsAnswered(false);
            setShowSuccessModal(false);
        }
    }, [drills]);

    if (drills.length === 0) {
        return <div className="text-center p-8 bg-white rounded-xl shadow-md">אין תרגילים זמינים לנושא זה עדיין.</div>
    }

    const currentDrill = drills[currentDrillIndex];

    const handleAnswer = (selectedOption: string) => {
        if (isAnswered) return;
        setIsAnswered(true);
        setUserAnswer(selectedOption);
        if (selectedOption === currentDrill.correctAnswer) {
            setScore(prev => prev + 1);
        }
    };
    
    const handleNext = () => {
        if (currentDrillIndex < drills.length - 1) {
            setCurrentDrillIndex(prev => prev + 1);
            setIsAnswered(false);
            setUserAnswer(null);
        } else {
            setShowSuccessModal(true);
        }
    };

    const getButtonClass = (option: string) => {
        if (!isAnswered) return 'bg-white hover:bg-teal-50 border-gray-300';
        if (option === currentDrill.correctAnswer) return 'bg-green-100 border-green-500 text-green-800 font-bold';
        if (option === userAnswer) return 'bg-red-100 border-red-500 text-red-800';
        return 'bg-gray-100 border-gray-300 text-gray-500';
    };

    return (
        <div className="max-w-3xl mx-auto">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">תרגול</h3>
                <div className="text-lg font-bold text-teal-600">
                    שאלה {currentDrillIndex + 1}/{drills.length} | ציון: {score}
                </div>
            </div>
             <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="text-center mb-8">
                    <p className="text-xl font-semibold text-gray-800" dir="rtl">{currentDrill.prompt}</p>
                </div>
                <div className="space-y-4">
                    {currentDrill.options.map((option, index) => (
                         <div key={index} className="flex items-center gap-3">
                            <button
                                onClick={() => handleAnswer(option)}
                                disabled={isAnswered}
                                className={`w-full p-4 rounded-lg border-2 text-xl text-center transition-all duration-200 ${getButtonClass(option)}`}
                                dir="rtl"
                            >
                                <span>{option}</span>
                            </button>
                            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                                {isAnswered && option === currentDrill.correctAnswer && (
                                   <AudioButton text={currentDrill.transliterationToPlay} />
                               )}
                           </div>
                        </div>
                    ))}
                </div>
                {isAnswered && (
                     <div className="mt-6 text-right" dir="rtl">
                         {userAnswer === currentDrill.correctAnswer ? (
                            <div className="p-4 bg-green-50 border-r-4 border-green-500 rounded-lg">
                                <p className="font-bold text-green-800">יפה מאוד!</p>
                            </div>
                         ) : (
                             <div className="p-4 bg-red-50 border-r-4 border-red-500 rounded-lg">
                                <p className="font-bold text-red-800">תשובה שגויה.</p>
                                <p className="text-gray-700 mt-1"><strong className="font-semibold">הסבר:</strong> {currentDrill.explanation}</p>
                            </div>
                         )}
                         <button
                            onClick={handleNext}
                            className="mt-6 w-full px-8 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-transform transform hover:scale-105 shadow-md"
                        >
                            {currentDrillIndex < drills.length - 1 ? 'השאלה הבאה' : 'סיים תרגול'}
                        </button>
                     </div>
                )}
             </div>

             {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300 animate-fade-in">
                     <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full transform transition-all animate-slide-up">
                        <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                            <CheckCircleIcon className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">כל הכבוד!</h3>
                        <p className="text-lg text-gray-600 mb-6">
                            סיימת את התרגול עם ציון {score} מתוך {drills.length}.
                        </p>
                        <button onClick={onComplete} className="w-full px-6 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700">
                            חזרה לשיעור
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const TabButton: React.FC<{ isActive: boolean, onClick: () => void, children: React.ReactNode }> = ({ isActive, onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-3 font-semibold text-lg transition-colors duration-200 -mb-px ${isActive ? 'border-b-4 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-teal-600'}`}
        >
            {children}
        </button>
    );
};

interface SituationalLessonViewProps {
  lesson: SituationalLesson;
  setView: (view: View, payload?: any) => void;
}

const SituationalLessonView: React.FC<SituationalLessonViewProps> = ({ lesson: initialLesson, setView }) => {
    const [mode, setMode] = useState<'learn' | 'practice'>('learn');
    const [lesson, setLesson] = useState<SituationalLesson>(initialLesson);
    const [isAskingAI, setIsAskingAI] = useState(false);

    useEffect(() => {
        setLesson(initialLesson);
        setMode('learn');
    }, [initialLesson]);

    const handleAskAI = async (hebrewPhrase: string) => {
        setIsAskingAI(true);
        try {
            const transliteration = await getTranslationForDrill(hebrewPhrase, lesson.name);
            
            const newPhrase: Phrase = { hebrew: hebrewPhrase, transliteration };
            
            // Create a simple drill with distractors from existing phrases
            const distractors = [...lesson.phrases]
                .sort(() => 0.5 - Math.random()) // Shuffle
                .slice(0, 3)
                .map(p => p.transliteration);

            const newDrill: SituationalLessonDrill = {
                prompt: `איך אומרים "${hebrewPhrase}"?`,
                options: [transliteration, ...distractors].sort(() => 0.5 - Math.random()),
                correctAnswer: transliteration,
                explanation: `זהו התרגום שהתקבל מהבינה המלאכותית לשאלתך.`,
                transliterationToPlay: transliteration,
            };
            
            setLesson(currentLesson => ({
                ...currentLesson,
                phrases: [...currentLesson.phrases, newPhrase],
                drills: [...currentLesson.drills, newDrill],
            }));

        } catch (error) {
            console.error("Failed to get translation from AI", error);
            alert("שגיאה: לא הצלחנו לקבל תרגום מהבינה המלאכותית.");
        } finally {
            setIsAskingAI(false);
        }
    };
    
    return (
        <div>
            <div className="mb-8 flex justify-center border-b border-gray-300">
                <TabButton isActive={mode === 'learn'} onClick={() => setMode('learn')}>
                    📚 לימוד
                </TabButton>
                 <TabButton isActive={mode === 'practice'} onClick={() => setMode('practice')}>
                    ✏️ תרגול
                </TabButton>
            </div>

            {mode === 'learn' ? (
                <div>
                    <LearnView phrases={lesson.phrases} vocabulary={lesson.vocabulary} />
                    <AskAI lessonContext={lesson.name} onAsk={handleAskAI} isLoading={isAskingAI} />
                </div>
            ) : (
                <PracticeView drills={lesson.drills} onComplete={() => setMode('learn')} />
            )}
        </div>
    );
};

export default SituationalLessonView;