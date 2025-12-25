
import React, { useState, useCallback, useEffect } from 'react';
import { PRONOUNS } from '../constants';
import { View } from '../App';
import { Pronoun } from '../types';
import { PlayIcon, LoadingSpinnerIcon, ArrowLeftIcon, UsersIcon, LightBulbIcon, CheckCircleIcon, SparklesIcon } from './Icons';
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

const PronounPractice: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState<{
        prompt: string;
        options: string[];
        correctAnswer: string;
        transliterationToPlay: string;
    } | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(0);

    const generateQuestion = useCallback(() => {
        setIsAnswered(false);
        setUserAnswer(null);
        
        const correct = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];
        const questionType = Math.random() > 0.5 ? 'hebrew' : 'arabic';
        
        const distractors: string[] = [];
        const answerKey = questionType === 'hebrew' ? 'transliteration' : 'hebrew';
        const promptKey = questionType === 'hebrew' ? 'hebrew' : 'transliteration';

        while (distractors.length < 3) {
            const randomP = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];
            const val = randomP[answerKey];
            if (val !== correct[answerKey] && !distractors.includes(val)) {
                distractors.push(val);
            }
        }

        const options = [...distractors, correct[answerKey]].sort(() => Math.random() - 0.5);

        setCurrentQuestion({
            prompt: correct[promptKey],
            options,
            correctAnswer: correct[answerKey],
            transliterationToPlay: correct.transliteration
        });
    }, []);

    useEffect(() => {
        generateQuestion();
    }, [generateQuestion]);

    const handleAnswer = (option: string) => {
        if (isAnswered) return;
        setIsAnswered(true);
        setUserAnswer(option);
        setTotal(t => t + 1);
        if (option === currentQuestion?.correctAnswer) {
            setScore(s => s + 1);
        }
    };

    if (!currentQuestion) return null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold text-teal-800">בחן את עצמך</h4>
                <span className="text-sm font-bold text-gray-500">ציון: {score}/{total}</span>
            </div>
            
            <div className="text-center mb-8">
                <p className="text-lg text-gray-600 mb-1">איך אומרים בערבית?</p>
                <p className="text-3xl font-bold text-teal-700" dir="rtl">"{currentQuestion.prompt}"</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleAnswer(option)}
                        disabled={isAnswered}
                        className={`p-4 rounded-xl border-2 transition-all text-xl font-semibold ${
                            !isAnswered 
                                ? 'border-gray-200 hover:border-teal-400 hover:bg-teal-50' 
                                : option === currentQuestion.correctAnswer
                                    ? 'border-green-500 bg-green-50 text-green-800 shadow-inner'
                                    : option === userAnswer
                                        ? 'border-red-500 bg-red-50 text-red-800'
                                        : 'border-gray-100 bg-gray-50 text-gray-400'
                        }`}
                        dir="rtl"
                    >
                        {option}
                    </button>
                ))}
            </div>

            {isAnswered && (
                <div className="mt-8 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                        <AudioButton text={currentQuestion.transliterationToPlay} />
                        <span className="text-gray-500 text-sm">הקש להאזנה להגייה הנכונה</span>
                    </div>
                    <button
                        onClick={generateQuestion}
                        className="px-8 py-3 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-transform transform hover:scale-105 shadow-md"
                    >
                        השאלה הבאה
                    </button>
                </div>
            )}
        </div>
    );
};

interface PronounsViewProps {
    setView: (view: View) => void;
}

const PronounsView: React.FC<PronounsViewProps> = ({ setView }) => {
    const [tab, setTab] = useState<'learn' | 'practice'>('learn');
    const singularPronouns = PRONOUNS.filter(p => p.category === 'singular');
    const pluralPronouns = PRONOUNS.filter(p => p.category === 'plural');

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <UsersIcon className="w-12 h-12 mx-auto text-teal-600 mb-2" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">שמות גוף (כינויי גוף)</h2>
                <p className="text-lg text-gray-600">הבסיס לכל משפט ופועל. למד כיצד להתייחס לעצמך ולאחרים.</p>
            </div>

            <div className="bg-blue-50 border-r-4 border-blue-400 p-4 rounded-l-lg mb-8 text-right" dir="rtl">
                <div className="flex">
                    <div className="flex-shrink-0 ml-3 mt-1">
                        <LightBulbIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-base text-blue-800 leading-relaxed">
                            <strong>טיפ חשוב:</strong> כינויי הגוף בערבית דומים מאוד לעברית, אבל בדרך כלל בשיחה יומיומית אנחנו משמיטים אותם אם הם מופיעים לפני פועל. לדוגמה: במקום להגיד "אַנַא כַּתַבְּת" (אני כתבתי), לרוב פשוט נגיד "כַּתַבְּת" כי הסיומת כבר אומרת שזה "אני".
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
                <div className="space-y-8 animate-in fade-in duration-500">
                    {/* Singular Section */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                        <div className="px-6 py-4 bg-teal-600">
                            <h3 className="text-xl font-bold text-white">יחיד</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-right">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="p-4 font-semibold text-gray-600">עברית</th>
                                        <th className="p-4 font-semibold text-gray-600">תעתיק</th>
                                        <th className="p-4 font-semibold text-gray-600 text-center">שמע</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {singularPronouns.map((p) => (
                                        <tr key={p.id} className="border-b last:border-0 hover:bg-teal-50/50">
                                            <td className="p-4 text-lg font-medium text-gray-800">{p.hebrew}</td>
                                            <td className="p-4 text-xl font-bold text-teal-800">{p.transliteration}</td>
                                            <td className="p-4 text-center">
                                                <AudioButton text={p.transliteration} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Plural Section */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                        <div className="px-6 py-4 bg-teal-600">
                            <h3 className="text-xl font-bold text-white">רבים</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-right">
                                <thead className="bg-gray-50 border-b">
                                    <tr>
                                        <th className="p-4 font-semibold text-gray-600">עברית</th>
                                        <th className="p-4 font-semibold text-gray-600">תעתיק</th>
                                        <th className="p-4 font-semibold text-gray-600 text-center">שמע</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pluralPronouns.map((p) => (
                                        <tr key={p.id} className="border-b last:border-0 hover:bg-teal-50/50">
                                            <td className="p-4 text-lg font-medium text-gray-800">{p.hebrew}</td>
                                            <td className="p-4 text-xl font-bold text-teal-800">{p.transliteration}</td>
                                            <td className="p-4 text-center">
                                                <AudioButton text={p.transliteration} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="animate-in slide-in-from-bottom-4 duration-500">
                    <PronounPractice />
                </div>
            )}

            <div className="mt-12 text-center">
                <button
                    onClick={() => setView('pseudoVerbs')}
                    className="flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-teal-600 text-white font-bold text-xl rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 shadow-md"
                >
                    <span>לשיעור הבא: רוצה ויש לי</span>
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default PronounsView;
