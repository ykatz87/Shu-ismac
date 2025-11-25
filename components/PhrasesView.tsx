import React, { useState } from 'react';
import { PHRASES } from '../constants';
// FIX: Import `View` from `../App` instead of `../types`.
import { Phrase, PhraseCategory } from '../types';
import { View } from '../App';
import { generateAndPlayAudio } from '../services/elevenLabsService';
import { PlayIcon, LoadingSpinnerIcon, ChevronDownIcon, ChatBubbleLeftRightIcon, ArrowLeftIcon } from './Icons';

const AudioButton: React.FC<{ text: string }> = ({ text }) => {
    const [isLoading, setIsLoading] = useState(false);
    const play = async () => {
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

const PhraseRow: React.FC<{ phrase: Phrase }> = ({ phrase }) => {
    return (
        <tr className="border-b last:border-0 hover:bg-teal-50/50">
            <td className="p-4 text-xl font-semibold text-teal-800" dir="rtl">{phrase.transliteration}</td>
            <td className="p-4 text-gray-700" dir="rtl">{phrase.hebrew}</td>
            <td className="p-4 text-center">
                <AudioButton text={phrase.transliteration} />
            </td>
        </tr>
    );
};

const CategoryCard: React.FC<{ category: PhraseCategory; isExpanded: boolean; onToggle: () => void; }> = ({ category, isExpanded, onToggle }) => {
    return (
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
            <button 
                onClick={onToggle}
                className="w-full text-right p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
            >
                <h3 className="text-xl font-bold text-teal-800">{category.name}</h3>
                <ChevronDownIcon className={`w-6 h-6 text-gray-500 transition-transform transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isExpanded && (
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
                            {category.phrases.map((phrase, index) => (
                                <PhraseRow key={index} phrase={phrase} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

interface PhrasesViewProps {
    setView: (view: View) => void;
}

const PhrasesView: React.FC<PhrasesViewProps> = ({ setView }) => {
    const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(PHRASES.length > 0 ? PHRASES[0].id : null);

    const handleToggle = (categoryId: string) => {
        setExpandedCategoryId(currentId => (currentId === categoryId ? null : categoryId));
    };

    return (
        <div>
            <div className="text-center mb-10">
                <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto text-teal-600 mb-2" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">ביטויים שימושיים ואוצר מילים</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">למד משפטים נפוצים לשיחות יומיומיות.</p>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
                {PHRASES.map(category => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        isExpanded={expandedCategoryId === category.id}
                        onToggle={() => handleToggle(category.id)}
                    />
                ))}
            </div>

            <div className="mt-12 text-center">
                <button
                    onClick={() => setView('drills')}
                    className="flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-teal-600 text-white font-bold text-xl rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 shadow-md"
                >
                    <span>הבנתי, בואו נתרגל!</span>
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default PhrasesView;