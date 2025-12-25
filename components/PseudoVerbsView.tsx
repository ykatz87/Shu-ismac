
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { PSEUDO_VERBS } from '../constants';
import { View } from '../App';
import { PseudoVerb } from '../types';
import { PlayIcon, LoadingSpinnerIcon, ArrowLeftIcon, LightBulbIcon, SparklesIcon } from './Icons';
import { generateAndPlayAudio } from '../services/elevenLabsService';

const AudioButton: React.FC<{ text: string }> = ({ text }) => {
    const [isLoading, setIsLoading] = useState(false);
    const play = async (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (isLoading || !text) return;
        setIsLoading(true);
        await generateAndPlayAudio(text);
        setIsLoading(false);
    };
    return (
        <button
            onClick={play}
            disabled={isLoading}
            className="p-2 rounded-full hover:bg-teal-200 text-teal-600 transition-colors disabled:opacity-50"
            aria-label={`השמע ${text}`}
        >
            {isLoading ? <LoadingSpinnerIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
        </button>
    );
};

// Sub-component for a single verb practice to avoid complexity and loops
const SinglePseudoVerbPractice: React.FC<{ verb: PseudoVerb }> = ({ verb }) => {
    const [currentQuestion, setCurrentQuestion] = useState<{
        prompt: string;
        options: string[];
        correctAnswer: string;
        transliterationToPlay: string;
    } | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [userAnswer, setUserAnswer] = useState<string | null>(null);

    const generateQuestion = useCallback(() => {
        setIsAnswered(false);
        setUserAnswer(null);
        
        const correct = verb.conjugations[Math.floor(Math.random() * verb.conjugations.length)];
        
        const distractors: string[] = [];
        while (distractors.length < 3) {
            const randomOpt = verb.conjugations[Math.floor(Math.random() * verb.conjugations.length)];
            if (randomOpt.transliteration !== correct.transliteration && !distractors.includes(randomOpt.transliteration)) {
                distractors.push(randomOpt.transliteration);
            }
        }

        const options = [...distractors, correct.transliteration].sort(() => Math.random() - 0.5);

        setCurrentQuestion({
            prompt: correct.hebrew,
            options,
            correctAnswer: correct.transliteration,
            transliterationToPlay: correct.transliteration
        });
    }, [verb]);

    useEffect(() => {
        generateQuestion();
    }, [generateQuestion]);

    const handleAnswer = (option: string) => {
        if (isAnswered) return;
        setIsAnswered(true);
        setUserAnswer(option);
    };

    if (!currentQuestion) return null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col h-full">
            <h4 className="text-xl font-bold text-teal-800 mb-4 text-center border-b pb-2">
                תרגול: "{verb.baseHebrew}"
            </h4>
            
            <div className="text-center mb-6">
                <p className="text-sm text-gray-500 mb-1">איך אומרים?</p>
                <p className="text-2xl font-bold text-teal-700" dir="rtl">"{currentQuestion.prompt}"</p>
            </div>

            <div className="grid grid-cols-1 gap-3 flex-1">
                {currentQuestion.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(option)}
                        disabled={isAnswered}
                        className={`p-3 rounded-lg border-2 transition-all text-lg font-semibold ${
                            !isAnswered 
                                ? 'border-gray-100 hover:border-teal-400 hover:bg-teal-50' 
                                : option === currentQuestion.correctAnswer
                                    ? 'border-green-500 bg-green-50 text-green-800 shadow-inner'
                                    : option === userAnswer
                                        ? 'border-red-500 bg-red-50 text-red-800'
                                        : 'border-gray-50 bg-gray-50 text-gray-300'
                        }`}
                        dir="rtl"
                    >
                        {option}
                    </button>
                ))}
            </div>

            {isAnswered && (
                <div className="mt-6 flex flex-col items-center gap-3 animate-in fade-in zoom-in duration-300">
                    <div className="flex items-center gap-2">
                        <AudioButton text={currentQuestion.transliterationToPlay} />
                        <span className="text-gray-500 text-xs">הקש להאזנה</span>
                    </div>
                    <button
                        onClick={generateQuestion}
                        className="w-full py-2 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
                    >
                        הבא
                    </button>
                </div>
            )}
        </div>
    );
};

interface PseudoVerbsViewProps {
    setView: (view: View) => void;
}

const PseudoVerbsView: React.FC<PseudoVerbsViewProps> = ({ setView }) => {
    const [tab, setTab] = useState<'learn' | 'practice'>('learn');

    // Filter the two main words for the practice section
    const biddiVerb = useMemo(() => PSEUDO_VERBS.find(v => v.id === 'biddi'), []);
    const indiVerb = useMemo(() => PSEUDO_VERBS.find(v => v.id === 'indi'), []);

    return (
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
                <SparklesIcon className="w-12 h-12 mx-auto text-teal-600 mb-2" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">רוצה ויש לי (בִּדִּי וְעִנְדִּי)</h2>
                <p className="text-lg text-gray-600">שתי המילים השימושיות ביותר בערבית מדוברת. הן מתנהגות כמו שמות עצם עם שייכות.</p>
            </div>

            <div className="bg-blue-50 border-r-4 border-blue-400 p-4 rounded-l-lg mb-8 text-right" dir="rtl">
                <div className="flex">
                    <div className="flex-shrink-0 ml-3 mt-1">
                        <LightBulbIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-base text-blue-800 leading-relaxed">
                            <strong>טיפ דקדוקי:</strong> בערבית, המילים "רוצה" (בִּדּ-) ו"יש לי" (עִנְד-) הן לא פעלים רגילים. הן מילים שמקבלות <strong>כינויי קניין</strong> (כמו "ביתי", "ביתך"). 
                            לדוגמה: "בִּדִּי" זה מילולית "רצוני".
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-8 flex justify-center border-b border-gray-300">
                <button
                    onClick={() => setTab('learn')}
                    className={`px-8 py-3 font-bold text-lg transition-colors border-b-4 ${tab === 'learn' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-teal-500'}`}
                >
                    📚 לימוד
                </button>
                <button
                    onClick={() => setTab('practice')}
                    className={`px-8 py-3 font-bold text-lg transition-colors border-b-4 ${tab === 'practice' ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-teal-500'}`}
                >
                    ✏️ תרגול
                </button>
            </div>

            {tab === 'learn' ? (
                <div className="grid grid-cols-1 gap-12 animate-in fade-in duration-500">
                    {PSEUDO_VERBS.map((pv) => (
                        <div key={pv.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                            <div className="px-6 py-4 bg-teal-600 flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-white">הטיית המילה "{pv.baseHebrew}" ({pv.baseTransliteration})</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-right">
                                    <thead className="bg-gray-50 border-b">
                                        <tr>
                                            <th className="p-4 font-semibold text-gray-600">גוף</th>
                                            <th className="p-4 font-semibold text-gray-600">תרגום</th>
                                            <th className="p-4 font-semibold text-gray-600">תעתיק</th>
                                            <th className="p-4 font-semibold text-gray-600 text-center">שמע</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pv.conjugations.map((c, idx) => (
                                            <tr key={idx} className="border-b last:border-0 hover:bg-teal-50/50">
                                                <td className="p-4 text-gray-600 font-medium">{c.pronoun} ({c.arabicPronoun})</td>
                                                <td className="p-4 text-lg text-gray-800">{c.hebrew}</td>
                                                <td className="p-4 text-xl font-bold text-teal-800">{c.transliteration}</td>
                                                <td className="p-4 text-center">
                                                    <AudioButton text={c.transliteration} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-500">
                    {biddiVerb && <SinglePseudoVerbPractice verb={biddiVerb} />}
                    {indiVerb && <SinglePseudoVerbPractice verb={indiVerb} />}
                </div>
            )}

            <div className="mt-12 text-center">
                <button
                    onClick={() => setView('verbs')}
                    className="flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-teal-600 text-white font-bold text-xl rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 shadow-md"
                >
                    <span>לשיעור הבא: בנק הפעלים</span>
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default PseudoVerbsView;
