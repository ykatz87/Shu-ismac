import React, { useState } from 'react';
import { SparklesIcon, LoadingSpinnerIcon } from './Icons';

interface AskAIProps {
    lessonContext: string;
    onAsk: (hebrewPhrase: string) => void;
    isLoading: boolean;
}

const AskAI: React.FC<AskAIProps> = ({ lessonContext, onAsk, isLoading }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim() || isLoading) return;
        onAsk(query.trim());
        setQuery('');
    };

    return (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <SparklesIcon className="w-6 h-6 text-purple-600" />
                יש לך שאלה? שאל את ה-AI!
            </h3>
            <p className="text-gray-600 mb-4" dir="rtl">
                רוצה לדעת איך אומרים משהו שקשור לנושא <strong>"{lessonContext}"</strong>? כתוב כאן בעברית, והבינה המלאכותית תוסיף את התרגום לשיעור ולתרגול.
            </p>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="לדוגמה: איך אומרים 'אפשר לקבל הנחה?'"
                    className="w-full p-3 border-2 bg-purple-50 border-purple-200 rounded-lg text-right text-purple-900 placeholder-purple-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                    rows={2}
                    dir="rtl"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-all transform hover:scale-105 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <LoadingSpinnerIcon className="w-5 h-5" />
                            <span>חושב...</span>
                        </>
                    ) : (
                        <>
                            <SparklesIcon className="w-5 h-5" />
                            <span>הוסף לשיעור</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default AskAI;
