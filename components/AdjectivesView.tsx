import React, { useState } from 'react';
// FIX: Corrected import name to ADJECTIVES to match the export from constants.ts.
import { ADJECTIVES } from '../constants';
// FIX: Import `View` from `../App` instead of `../types`.
import { Adjective, AdjectiveCategory } from '../types';
import { View } from '../App';
import { generateAndPlayAudio } from '../services/elevenLabsService';
import { PlayIcon, LoadingSpinnerIcon, ChevronDownIcon, LightBulbIcon, CheckCircleIcon, ArrowPathIcon, ArrowLeftIcon } from './Icons';
import { useProgress, saveProgress } from '../services/storageService';

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
            className="p-1 rounded-full hover:bg-teal-200 text-teal-600 transition-colors disabled:opacity-50"
            aria-label={`השמע ${text}`}
        >
            {isLoading ? <LoadingSpinnerIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
        </button>
    );
};

const AdjectiveRow: React.FC<{ adjective: Adjective }> = ({ adjective }) => {
    return (
        <tr className="border-b last:border-0 hover:bg-teal-50/50">
            <td className="p-4 font-semibold text-gray-800">{adjective.hebrew}</td>
            <td className="p-4">
                <div className="flex items-center justify-end gap-2">
                    <AudioButton text={adjective.masculine} />
                    <span className="text-lg text-teal-800">{adjective.masculine}</span>
                </div>
            </td>
            <td className="p-4">
                 <div className="flex items-center justify-end gap-2">
                    <AudioButton text={adjective.feminine} />
                    <span className="text-lg text-teal-800">{adjective.feminine}</span>
                </div>
            </td>
            <td className="p-4">
                 <div className="flex items-center justify-end gap-2">
                    <AudioButton text={adjective.plural} />
                    <span className="text-lg text-teal-800">{adjective.plural}</span>
                </div>
            </td>
        </tr>
    );
};

const CategoryCard: React.FC<{ 
    category: AdjectiveCategory; 
    isExpanded: boolean; 
    onToggle: () => void;
    isCompleted: boolean;
    onToggleComplete: () => void;
}> = ({ category, isExpanded, onToggle, isCompleted, onToggleComplete }) => {
    return (
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
            <button 
                onClick={onToggle}
                className={`w-full text-right p-4 flex justify-between items-center transition-colors ${isCompleted ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'}`}
            >
                <div className="flex items-center gap-3">
                    {isCompleted && <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />}
                    <h3 className="text-xl font-bold text-teal-800">{category.name}</h3>
                </div>
                <ChevronDownIcon className={`w-6 h-6 text-gray-500 transition-transform transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isExpanded && (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] text-right">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="p-3 font-semibold text-gray-600">עברית</th>
                                    <th className="p-3 font-semibold text-gray-600">זכר</th>
                                    <th className="p-3 font-semibold text-gray-600">נקבה</th>
                                    <th className="p-3 font-semibold text-gray-600">רבים</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category.adjectives.map((adj) => (
                                    <AdjectiveRow key={adj.id} adjective={adj} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 bg-gray-50 border-t text-right">
                        <button
                            onClick={onToggleComplete}
                            className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${isCompleted ? 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                        >
                            {isCompleted ? 'סמן כ-"לא הושלם"' : 'סמן כ-"הושלם"'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

interface AdjectivesViewProps {
    setView: (view: View) => void;
}

const AdjectivesView: React.FC<AdjectivesViewProps> = ({ setView }) => {
    const [progress, setProgress] = useProgress();
    const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(ADJECTIVES.length > 0 ? ADJECTIVES[0].id : null);

    const handleToggle = (categoryId: string) => {
        setExpandedCategoryId(currentId => (currentId === categoryId ? null : categoryId));
    };

    const handleToggleComplete = (categoryId: string) => {
        setProgress(currentProgress => {
            const newAdjectivesProgress = { ...(currentProgress.adjectives || {}) };
            newAdjectivesProgress[categoryId] = !newAdjectivesProgress[categoryId];
            return { ...currentProgress, adjectives: newAdjectivesProgress };
        });
    };

    const resetAdjectivesProgress = () => {
        if (window.confirm('האם אתה בטוח שברצונך לאפס את ההתקדמות בשיעור זה?')) {
            setProgress(currentProgress => ({ ...currentProgress, adjectives: {} }));
        }
    };
    
    const completedCount = Object.values(progress.adjectives || {}).filter(Boolean).length;
    const totalCount = ADJECTIVES.length;

    return (
        <div>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">לימוד שמות תואר</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">למדו איך לתאר אנשים וחפצים. זכרו: בערבית, כמו בעברית, שם התואר בא אחרי שם העצם ומתאים לו במין ובמספר.</p>

                 <div className="max-w-md mx-auto bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                    <span className="font-semibold text-gray-700">התקדמות: {completedCount}/{totalCount} הושלמו</span>
                    <button
                        onClick={resetAdjectivesProgress}
                        className="flex items-center gap-2 px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-red-100 hover:text-red-800 transition-colors"
                        aria-label="איפוס התקדמות"
                    >
                        <ArrowPathIcon className="w-4 h-4" />
                        <span>איפוס</span>
                    </button>
                </div>
            </div>

            <div className="bg-blue-50 border-r-4 border-blue-400 p-4 rounded-l-lg mb-8 text-right" dir="rtl">
                <div className="flex">
                    <div className="flex-shrink-0 ml-3 mt-1">
                        <LightBulbIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-base text-blue-800">
                            <strong>טיפ חשוב:</strong> רוב שמות התואר בערבית מקבלים סיומת <strong>-ֶה (ـة)</strong> בצורת הנקבה, וסיומת <strong>-ִין (ـين)</strong> או תבנית מיוחדת בצורת הרבים. שימו לב לדפוסים החוזרים, זה יקל עליכם לזכור!
                            לדוגמה: <strong>כְּבִּיר</strong> (גדול), <strong>כְּבִּירֶה</strong> (גדולה).
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
                {ADJECTIVES.map(category => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        isExpanded={expandedCategoryId === category.id}
                        onToggle={() => handleToggle(category.id)}
                        isCompleted={!!progress.adjectives?.[category.id]}
                        onToggleComplete={() => handleToggleComplete(category.id)}
                    />
                ))}
            </div>

            <div className="mt-12 text-center">
                <button
                    onClick={() => setView('phrases')}
                    className="flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-teal-600 text-white font-bold text-xl rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 shadow-md"
                >
                    <span>לשיעור הבא: ביטויים שימושיים</span>
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default AdjectivesView;