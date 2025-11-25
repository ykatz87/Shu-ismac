import React, { useState } from 'react';
import { View } from '../App';
import VerbDrillView from './VerbDrillView';
import NounDrillView from './NounDrillView';
import MixedDrillView from './MixedDrillView';
import { TargetIcon, GamepadIcon } from './Icons';

type DrillType = 'verbs' | 'nouns' | 'mixed';

interface DrillsViewProps {
    setView: (view: View) => void;
}

const DrillsView: React.FC<DrillsViewProps> = ({ setView }) => {
    const [currentDrill, setCurrentDrill] = useState<DrillType | null>(null);

    const handleDrillSelection = (drill: DrillType) => {
        setCurrentDrill(drill);
    };
    
    if (currentDrill) {
        const goBack = <button onClick={() => setCurrentDrill(null)} className="mb-6 text-teal-600 hover:text-teal-800 font-semibold">
                    &larr; חזרה לבחירת תרגיל
                </button>;
        let drillComponent;
        if (currentDrill === 'verbs') {
            drillComponent = <VerbDrillView onSuccess={() => handleDrillSelection('nouns')} onContinue={() => {}} />;
        } else if (currentDrill === 'nouns') {
            drillComponent = <NounDrillView onSuccess={() => handleDrillSelection('mixed')} onContinue={() => {}} />;
        } else { // mixed
            drillComponent = <MixedDrillView onSuccess={() => setView('playground')} />;
        }
        return <div>{goBack}{drillComponent}</div>
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
                <TargetIcon className="w-12 h-12 mx-auto text-teal-600 mb-2" />
                <h2 className="text-3xl font-bold text-gray-800 mb-2">תרגול ומשחקים</h2>
                <p className="text-lg text-gray-600">בחר סוג תרגיל כדי לחזק את הידע שלך או תרגל הגייה במגרש המשחקים.</p>
            </div>
            <div className="space-y-4">
                <DrillCard 
                    title="שינון פעלים" 
                    description="בחן את שליטתך בהטיות הפעלים שלמדת."
                    onClick={() => handleDrillSelection('verbs')}
                />
                <DrillCard 
                    title="שינון שמות עצם" 
                    description="תרגל את הטיות הקניין ושמות העצם."
                    onClick={() => handleDrillSelection('nouns')}
                />
                <DrillCard 
                    title="שינון מעורב" 
                    description="אתגר את עצמך עם שאלות על פעלים ושמות עצם."
                    onClick={() => handleDrillSelection('mixed')}
                />
                 <DrillCard 
                    title="מגרש משחקים" 
                    description="תרגל הגייה, קבל משוב AI ונסה לדבר בחופשיות."
                    onClick={() => setView('playground')}
                    icon={<GamepadIcon className="w-8 h-8"/>}
                />
            </div>
        </div>
    );
};

const DrillCard: React.FC<{title: string; description: string; onClick: () => void; icon?: React.ReactNode}> = ({ title, description, onClick, icon }) => (
    <button onClick={onClick} className="w-full bg-white p-6 rounded-xl shadow-md border border-gray-200 text-right hover:shadow-lg hover:border-teal-400 transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center gap-4">
             {icon && <div className="text-teal-600">{icon}</div>}
            <div className="flex-1">
                <h3 className="text-xl font-bold text-teal-700">{title}</h3>
                <p className="text-gray-600 mt-1">{description}</p>
            </div>
        </div>
    </button>
);


export default DrillsView;