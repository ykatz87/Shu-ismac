
import React, { useState } from 'react';
import { NOUNS } from '../constants';
import { Noun } from '../types';
import { View } from '../App';
import { PlayIcon, LoadingSpinnerIcon, ChevronDownIcon, ArrowLeftIcon } from './Icons';
import { generateAndPlayAudio } from '../services/elevenLabsService';

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

const NounCard: React.FC<{ noun: Noun }> = ({ noun }) => {
    const basicForms = [
        { form: 'יחיד', transliteration: noun.singular.transliteration },
        { form: 'רבים', transliteration: noun.plural?.transliteration || '' },
        { form: "ה' הידיעה (יחיד)", transliteration: noun.definite.singular },
        { form: "ה' הידיעה (רבים)", transliteration: noun.definite.plural || '' },
    ].filter(f => f.transliteration !== '');

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="px-6 py-4 bg-teal-600">
                <h3 className="text-2xl font-bold text-white">{noun.singular.hebrew} ({noun.singular.transliteration})</h3>
            </div>
            
            <div className="p-4 md:p-6 space-y-6">
                <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <div className="p-3 bg-gray-50">
                        <h4 className="font-semibold text-gray-700">צורות יחיד ורבים</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[400px] text-right">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-3 font-semibold text-gray-600">צורה</th>
                                    <th className="p-3 font-semibold text-gray-600">תעתיק</th>
                                    <th className="p-3 font-semibold text-gray-600 text-center">שמע</th>
                                </tr>
                            </thead>
                            <tbody>
                                {basicForms.map((form, index) => (
                                    <tr key={index} className="border-b last:border-0 hover:bg-teal-50/50">
                                        <td className="p-3 font-medium text-gray-800">{form.form}</td>
                                        <td className="p-3 text-lg font-semibold text-teal-800">{form.transliteration}</td>
                                        <td className="p-3 text-center">
                                            <AudioButton text={form.transliteration} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <div className="p-3 bg-gray-50">
                        <h4 className="font-semibold text-gray-700">כינויי קניין (שייכות)</h4>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[500px] text-right">
                             <thead>
                                <tr className="border-b">
                                    <th className="p-3 font-semibold text-gray-600">כינוי</th>
                                    <th className="p-3 font-semibold text-gray-600">הטיית יחיד</th>
                                    {noun.plural && <th className="p-3 font-semibold text-gray-600">הטיית רבים</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {noun.possessives.map((p, index) => (
                                    <tr key={index} className="border-b last:border-0 hover:bg-teal-50/50">
                                        <td className="p-3 font-medium text-gray-800">{p.pronoun}</td>
                                        <td className="p-3">
                                            <div className="flex items-center justify-end gap-2">
                                                <AudioButton text={p.singular} />
                                                <span className="text-lg font-semibold text-teal-800">{p.singular}</span>
                                            </div>
                                        </td>
                                        {noun.plural && (
                                            <td className="p-3">
                                                {p.plural ? (
                                                     <div className="flex items-center justify-end gap-2">
                                                        <AudioButton text={p.plural} />
                                                        <span className="text-lg font-semibold text-teal-800">{p.plural}</span>
                                                    </div>
                                                ) : <span className="text-gray-400">-</span>}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface NounsViewProps {
    setView: (view: View) => void;
}

const NounsView: React.FC<NounsViewProps> = ({ setView }) => {
    const categories = Array.from(new Set(NOUNS.map(n => n.category)));
    const [expandedCategory, setExpandedCategory] = useState<string | null>(categories.length > 0 ? categories[0] : null);
    
    return (
        <div>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">שמות עצם: הטיות וסומכים</h2>
                <p className="text-lg text-gray-600">בחר קטגוריה כדי להתחיל ללמוד.</p>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
                {categories.map(category => (
                    <div key={category} className="rounded-xl border border-gray-200 overflow-hidden">
                        <button 
                            onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                            className="w-full text-right p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
                        >
                            <h3 className="text-xl font-bold text-teal-800">{category}</h3>
                            <ChevronDownIcon className={`w-6 h-6 text-gray-500 transition-transform transform ${expandedCategory === category ? 'rotate-180' : ''}`} />
                        </button>
                        {expandedCategory === category && (
                            <div className="p-4 space-y-6">
                                {NOUNS.filter(n => n.category === category).map(noun => (
                                    <NounCard 
                                        key={noun.id} 
                                        noun={noun}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <button
                    onClick={() => setView('participles')}
                    className="flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-teal-600 text-white font-bold text-xl rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 shadow-md"
                >
                    <span>לשיעור הבא: בינוני פועל ופעול</span>
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default NounsView;
