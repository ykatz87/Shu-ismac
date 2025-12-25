
import React from 'react';
import { TRANSCRIPTION } from '../constants';
import { PlayIcon, LoadingSpinnerIcon, ArrowLeftIcon } from './Icons';
import { generateAndPlayAudio } from '../services/elevenLabsService';
import { View } from '../App';

const InteractiveExample: React.FC<{ transliteration: string }> = ({ transliteration }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const playAudio = async () => {
        setIsLoading(true);
        await generateAndPlayAudio(transliteration);
        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
            <span className="text-xl font-semibold text-teal-800">{transliteration}</span>
            <button
                onClick={playAudio}
                disabled={isLoading}
                className="p-2 rounded-full hover:bg-teal-200 text-teal-600 transition-colors duration-200 disabled:opacity-50"
            >
                {isLoading ? <LoadingSpinnerIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
            </button>
        </div>
    );
};

interface IntroductionViewProps {
    setView: (view: View) => void;
}

const IntroductionView: React.FC<IntroductionViewProps> = ({ setView }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">מבוא - הבנת שיטת התעתיק</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
            ברוכים הבאים! לפני שנתחיל ללמוד ערבית, חשוב להבין את שיטת התעתיק.
            בערבית יש צלילים שאין בעברית, ולכן אנחנו משתמשים בסימנים מיוחדים.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <h3 className="text-xl font-bold text-white bg-teal-600 px-6 py-4">טבלת תעתיק מפורטת</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-gray-50 border-b border-gray-300">
                  <tr>
                    <th className="p-4 font-semibold text-gray-600">אות עברית</th>
                    <th className="p-4 font-semibold text-gray-600">צליל ערבי</th>
                    <th className="p-4 font-semibold text-gray-600">הערות הגייה</th>
                    <th className="p-4 font-semibold text-gray-600">דוגמה</th>
                  </tr>
                </thead>
                <tbody>
                  {TRANSCRIPTION.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-teal-50/50">
                      <td className="p-4 text-lg font-semibold">{item.hebrew}</td>
                      <td className="p-4 text-lg text-teal-800">{item.sound}</td>
                      <td className="p-4 text-gray-700">{item.notes}</td>
                      <td className="p-4 text-gray-700 font-medium" dir="rtl">{item.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h3 className="text-2xl font-semibold text-teal-700 mb-4">בואו נתרגל!</h3>
            <p className="text-gray-700 mb-4">
                האזינו למילים הבאות כדי להתרגל לצלילים ולשיטת התעתיק.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <InteractiveExample transliteration="מַרחַבּא" />
                <InteractiveExample transliteration="שוּכּרַן" />
                <InteractiveExample transliteration="כּיף חאלַכּ" />
                <InteractiveExample transliteration="אִנשאללה" />
                <InteractiveExample transliteration="צַבּאח אִל-חֵ'יר" />
                <InteractiveExample transliteration="מַעַ א-סְסַלַאמֶה" />
            </div>
        </div>
      </div>

        <div className="mt-12 text-center">
            <button
                onClick={() => setView('pronouns')}
                className="flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-teal-600 text-white font-bold text-xl rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 shadow-md"
            >
                <span>לשיעור הבא: שמות גוף</span>
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
        </div>
    </div>
  );
};

export default IntroductionView;
