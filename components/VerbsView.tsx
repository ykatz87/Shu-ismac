import React, { useState } from 'react';
import { VERBS } from '../constants';
// FIX: Import `View` from `../App` instead of `../types`.
import { Verb, Tense, Conjugation, Binyan, VerbPattern } from '../types';
import { View } from '../App';
import { PlayIcon, LoadingSpinnerIcon, ChevronDownIcon, LightBulbIcon, ArrowLeftIcon } from './Icons';
import { generateAndPlayAudio } from '../services/elevenLabsService';

const TENSE_NAMES: Record<Tense, string> = {
    past: 'עבר (מאד\'י)',
    present: 'הווה (מוד\'ארע)',
    future: 'עתיד (מוסתאקבל)',
    imperative: 'ציווי (אמר)',
};

const AudioButton: React.FC<{ text: string }> = ({ text }) => {
    const [isLoading, setIsLoading] = useState(false);
    const play = async () => {
        if (isLoading) return;
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

const VerbConjugationTable: React.FC<{ conjugations: Conjugation[] }> = ({ conjugations }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[400px] text-right">
                <thead>
                    <tr className="border-b">
                        <th className="p-3 font-semibold text-gray-600">כינוי</th>
                        <th className="p-3 font-semibold text-gray-600">הטיית הפועל</th>
                        <th className="p-3 font-semibold text-gray-600 text-center">שמע</th>
                    </tr>
                </thead>
                <tbody>
                    {conjugations.map(c => (
                        <tr key={c.transliteration + c.pronoun} className="border-b last:border-0 hover:bg-teal-50/50">
                            <td className="p-3">
                                <div className="font-medium text-gray-800">{c.pronoun}</div>
                                <div className="text-sm text-gray-500">{c.arabicPronoun}</div>
                            </td>
                            <td className="p-3 text-xl font-semibold text-teal-800">{c.transliteration}</td>
                            <td className="p-3 text-center">
                                <AudioButton text={`${c.arabicPronoun} ${c.transliteration}`} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const VerbTenseDisplay: React.FC<{ verb: Verb; tense: Tense }> = ({ verb, tense }) => {
    const tenseData = verb.conjugations[tense];
    if (!tenseData) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="p-4 bg-gray-50">
                <h4 className="text-xl font-bold text-teal-700">{verb.infinitive}</h4>
                <p className="text-sm text-gray-600">שורש: {verb.root}</p>
            </div>
            <VerbConjugationTable conjugations={tenseData.conjugations} />
        </div>
    );
};

const TenseSection: React.FC<{
    tense: Tense;
    verbs: Verb[];
    isExpanded: boolean;
    onToggle: () => void;
}> = ({ tense, verbs, isExpanded, onToggle }) => {
    const relevantVerbs = verbs.filter(v => v.conjugations[tense]);

    if (relevantVerbs.length === 0) {
        return null;
    }

    return (
        <div className="rounded-lg border border-gray-200 overflow-hidden bg-white/50">
            <button
                onClick={onToggle}
                className="w-full text-right p-4 bg-white hover:bg-gray-50 flex justify-between items-center"
            >
                <h4 className="text-lg font-bold text-gray-700">{TENSE_NAMES[tense]}</h4>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isExpanded && (
                <div className="p-4 space-y-4 bg-gray-50 border-t border-gray-200">
                    {relevantVerbs.map(verb => (
                        <VerbTenseDisplay key={verb.id} verb={verb} tense={tense} />
                    ))}
                </div>
            )}
        </div>
    );
};

const PatternSection: React.FC<{ pattern: VerbPattern; isExpanded: boolean; onToggle: () => void; }> = ({ pattern, isExpanded, onToggle }) => {
    const [expandedTense, setExpandedTense] = useState<Tense | null>(null);

    const handleTenseToggle = (tense: Tense) => {
        setExpandedTense(currentTense => (currentTense === tense ? null : tense));
    };
    
    const tenses: Tense[] = ['past', 'present', 'future', 'imperative'];

    return (
        <div className="rounded-lg border border-gray-300 overflow-hidden">
            <button 
                onClick={onToggle}
                className="w-full text-right p-4 bg-white hover:bg-gray-100 flex justify-between items-center"
            >
                <h4 className="text-lg font-bold text-gray-800">{pattern.name}</h4>
                 <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isExpanded && (
                <div className="p-4 space-y-4 border-t border-gray-300 bg-gray-50/50">
                    {tenses.map(tense => (
                        <TenseSection 
                            key={tense}
                            tense={tense}
                            verbs={pattern.verbs}
                            isExpanded={expandedTense === tense}
                            onToggle={() => handleTenseToggle(tense)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};


const BinyanSection: React.FC<{ binyan: Binyan; isExpanded: boolean; onToggle: () => void; }> = ({ binyan, isExpanded, onToggle }) => {
    const [expandedPatternId, setExpandedPatternId] = useState<string | null>(null);

    const handlePatternToggle = (patternId: string) => {
        setExpandedPatternId(currentId => (currentId === patternId ? null : patternId));
    };

    return (
        <div className="rounded-xl border border-gray-200 overflow-hidden">
            <button 
                onClick={onToggle}
                className="w-full text-right p-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
            >
                <h3 className="text-xl font-bold text-teal-800">{binyan.name}</h3>
                <ChevronDownIcon className={`w-6 h-6 text-gray-500 transition-transform transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isExpanded && (
                <div className="p-4 space-y-4 bg-gray-50">
                     {binyan.patterns.map(pattern => (
                        <PatternSection
                            key={pattern.id}
                            pattern={pattern}
                            isExpanded={expandedPatternId === pattern.id}
                            onToggle={() => handlePatternToggle(pattern.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

interface VerbsViewProps {
    setView: (view: View) => void;
}

const VerbsView: React.FC<VerbsViewProps> = ({ setView }) => {
    const [expandedBinyanId, setExpandedBinyanId] = useState<string | null>(null);

    const handleBinyanToggle = (binyanId: string) => {
        setExpandedBinyanId(currentId => (currentId === binyanId ? null : binyanId));
    };

    return (
        <div>
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">טבלאות נטיית פעלים</h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">לחץ על בניין כדי לראות את תבניות הפעלים השייכות אליו.</p>
            </div>

            <div className="max-w-4xl mx-auto mb-8 space-y-4">
                 <div className="bg-blue-50 border-r-4 border-blue-400 p-4 rounded-l-lg text-right" dir="rtl">
                    <div className="flex">
                        <div className="flex-shrink-0 ml-3">
                            <LightBulbIcon className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm sm:text-base text-blue-800">
                                <strong>טיפ קטן לפני שמתחילים:</strong> זוכרים את השורשים והבניינים מהעברית? בערבית זה עובד באופן דומה מאוד! גם כינויי הגוף (אני, אתה, הוא...) דומים.
                                לדוגמה, השורש <strong>כ-ת-ב</strong> קיים בשתי השפות. בעברית אומרים "אני <strong>כתבתי</strong>", ובערבית אומרים "אַנַא <strong>כַּתַבְּת</strong>". שימו לב לדמיון!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-50 border-r-4 border-blue-400 p-4 rounded-l-lg text-right" dir="rtl">
                    <div className="flex">
                        <div className="flex-shrink-0 ml-3">
                            <LightBulbIcon className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm sm:text-base text-blue-800">
                                <strong>טיפ מפתח להבנת הפעלים:</strong> חשבו על זה כמו בעברית. ברגע שלומדים את תבנית ההטיה של פועל אחד (למשל, איך אומרים 'אני כתבתי', 'אתה כתבת' וכו'), אתם בעצם לומדים איך להטות עשרות פעלים אחרים מאותו בניין! הסיומות והתחיליות שמוסיפים לכל גוף (אני, אתה, היא...) הן קבועות. שימו לב לתבניות החוזרות בטבלאות, ופתאום הכל יתחבר.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
                {VERBS.map(binyan => (
                    <BinyanSection
                        key={binyan.id}
                        binyan={binyan}
                        isExpanded={expandedBinyanId === binyan.id}
                        onToggle={() => handleBinyanToggle(binyan.id)}
                    />
                ))}
            </div>

            <div className="mt-12 text-center">
                <button
                    onClick={() => setView('nouns')}
                    className="flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-teal-600 text-white font-bold text-xl rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 shadow-md"
                >
                    <span>לשיעור הבא: שמות עצם</span>
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default VerbsView;