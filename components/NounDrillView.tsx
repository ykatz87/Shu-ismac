import React, { useState, useEffect, useCallback } from 'react';
import { NOUNS } from '../constants';
import { ArrowPathIcon, SparklesIcon, PlayIcon, LoadingSpinnerIcon } from './Icons';
import { Noun } from '../types';
import { generateAndPlayAudio } from '../services/elevenLabsService';

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

interface Question {
    prompt: string;
    options: string[];
    correctAnswer: string;
    transliterationToPlay: string;
}

interface NounDrillViewProps {
  onSuccess: () => void;
  onContinue: () => void;
}

type NounForm = {
    transliteration: string;
    hebrew: string;
}

const shuffleArray = <T,>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

// Flatten all noun forms into a single array for easier question generation
const allNounForms: NounForm[] = NOUNS.flatMap((noun: Noun) => {
    const forms: NounForm[] = [];
    forms.push({ transliteration: noun.singular.transliteration, hebrew: noun.singular.hebrew });
    if(noun.plural) {
        forms.push({ transliteration: noun.plural.transliteration, hebrew: noun.plural.hebrew });
    }
    noun.possessives.forEach(p => {
        const hebrewPossessive = `${noun.singular.hebrew} ${p.pronoun}`;
        forms.push({ transliteration: p.singular, hebrew: hebrewPossessive });
         if(p.plural && noun.plural) {
            const hebrewPluralPossessive = `${noun.plural.hebrew} ${p.pronoun}`;
            forms.push({ transliteration: p.plural, hebrew: hebrewPluralPossessive });
        }
    });
    return forms;
});


const NounDrillView: React.FC<NounDrillViewProps> = ({ onSuccess, onContinue }) => {
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [score, setScore] = useState(0);
    const [questionsAttempted, setQuestionsAttempted] = useState(0);
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const generateQuestion = useCallback(() => {
        setIsAnswered(false);
        setUserAnswer(null);

        const correctForm = allNounForms[Math.floor(Math.random() * allNounForms.length)];

        const questionType: 'hebrew' | 'transliteration' = Math.random() > 0.5 ? 'hebrew' : 'transliteration';
        
        const answerKey = questionType === 'hebrew' ? 'transliteration' : 'hebrew';
        const promptKey = questionType === 'hebrew' ? 'hebrew' : 'transliteration';
        
        const distractors: string[] = [];
        while (distractors.length < 3) {
            const randomForm = allNounForms[Math.floor(Math.random() * allNounForms.length)];
            const potentialDistractor = randomForm[answerKey];
            if (potentialDistractor !== correctForm[answerKey] && !distractors.includes(potentialDistractor)) {
                distractors.push(potentialDistractor);
            }
        }
        
        const options = shuffleArray([...distractors, correctForm[answerKey]]);
        const promptText = `איך אומרים: "${correctForm[promptKey]}"?`;
        
        setCurrentQuestion({
            prompt: promptText,
            options,
            correctAnswer: correctForm[answerKey],
            transliterationToPlay: correctForm.transliteration,
        });

    }, []);

    useEffect(() => {
        generateQuestion();
    }, [generateQuestion]);

    const handleAnswer = (selectedOption: string) => {
        if (isAnswered) return;

        setIsAnswered(true);
        setUserAnswer(selectedOption);
        setQuestionsAttempted(prev => prev + 1);

        if (selectedOption === currentQuestion?.correctAnswer) {
            setScore(prev => prev + 1);
            const newConsecutive = consecutiveCorrect + 1;
            setConsecutiveCorrect(newConsecutive);
            if (newConsecutive >= 10) {
                setShowSuccessModal(true);
            }
        } else {
            setConsecutiveCorrect(0);
        }
    };
    
    const handleRestart = () => {
        setScore(0);
        setQuestionsAttempted(0);
        setConsecutiveCorrect(0);
        setShowSuccessModal(false);
        generateQuestion();
    };

    if (!currentQuestion) {
        return <div className="text-center text-xl">טוען תרגיל...</div>;
    }

    const getButtonClass = (option: string) => {
        if (!isAnswered) return 'bg-white hover:bg-teal-50 border-gray-300';
        if (option === currentQuestion.correctAnswer) return 'bg-green-100 border-green-500 text-green-800 font-bold';
        if (option === userAnswer) return 'bg-red-100 border-red-500 text-red-800';
        return 'bg-gray-100 border-gray-300 text-gray-500';
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">שינון שמות עצם</h3>
                </div>
                <div className="text-left">
                    <div className="text-xl font-bold text-teal-600">
                        רצף: {consecutiveCorrect} | ציון: {score}/{questionsAttempted}
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="text-center mb-8">
                    <p className="text-2xl font-bold text-teal-800" dir="rtl">{currentQuestion.prompt}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <button
                                onClick={() => handleAnswer(option)}
                                disabled={isAnswered}
                                className={`flex-1 p-4 rounded-lg border-2 text-xl text-center transition-all duration-200 ${getButtonClass(option)}`}
                                dir="rtl"
                            >
                                <span>{option}</span>
                            </button>
                            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                                {isAnswered && option === currentQuestion.correctAnswer && (
                                    <AudioButton text={currentQuestion.transliterationToPlay} />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {isAnswered && (
                    <div className="mt-8 text-center">
                        <button
                            onClick={generateQuestion}
                            className="px-8 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-transform transform hover:scale-105 shadow-md"
                        >
                            השאלה הבאה
                        </button>
                    </div>
                )}
            </div>

            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 transition-opacity duration-300 animate-fade-in">
                     <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full transform transition-all animate-slide-up">
                        <div className="mx-auto bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mb-4">
                            <SparklesIcon className="w-10 h-10 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">מעולה!</h3>
                        <p className="text-lg text-gray-600 mb-6">
                            ענית על 10 שאלות ברצף! אפשר לעבור לתרגול משולב.
                        </p>
                        <button onClick={onSuccess} className="w-full mb-3 px-6 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700">
                            לתרגול משולב
                        </button>
                        <button onClick={() => { setShowSuccessModal(false); onContinue(); }} className="w-full text-sm text-gray-500 hover:text-gray-800 py-2 rounded-full hover:bg-gray-100">
                            המשך לתרגל שמות עצם
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NounDrillView;