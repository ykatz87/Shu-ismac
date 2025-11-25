import React from 'react';
import { PARTICIPLES } from '../constants';
// FIX: Import `View` from `../App` instead of `../types`.
import { ParticipleBinyan } from '../types';
import { View } from '../App';
import { PlayIcon, LoadingSpinnerIcon, LightBulbIcon, ArrowLeftIcon } from './Icons';
import { generateAndPlayAudio } from '../services/elevenLabsService';

const AudioButton: React.FC<{ text: string }> = ({ text }) => {
    const [isLoading, setIsLoading] = React.useState(false);
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

const BinyanCard: React.FC<{ binyan: ParticipleBinyan }> = ({ binyan }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="px-6 py-4 bg-teal-600">
                <h3 className="text-2xl font-bold text-white">{binyan.name}</h3>
            </div>
            <div className="p-6">
                <p className="text-gray-700 mb-6 bg-teal-50 p-4 rounded-lg border-r-4 border-teal-400" dir="rtl">{binyan.explanation}</p>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-right">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-3 font-semibold text-gray-600">שורש</th>
                                <th className="p-3 font-semibold text-gray-600">פועל (עבר, "הוא")</th>
                                <th className="p-3 font-semibold text-gray-600">בינוני פועל (Active)</th>
                                <th className="p-3 font-semibold text-gray-600">בינוני פעול (Passive)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {binyan.examples.map((ex) => (
                                <tr key={ex.id} className="border-b last:border-0 hover:bg-teal-50/50">
                                    <td className="p-4 font-mono text-lg text-gray-700">{ex.root}</td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <AudioButton text={ex.verb.transliteration} />
                                            <div>
                                                <div className="text-xl font-semibold text-teal-800">{ex.verb.transliteration}</div>
                                                <div className="text-sm text-gray-600">{ex.verb.hebrew}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <AudioButton text={ex.active.transliteration} />
                                            <div>
                                                <div className="text-xl font-semibold text-teal-800">{ex.active.transliteration}</div>
                                                <div className="text-sm text-gray-600">{ex.active.hebrew}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-end gap-2">
                                            <AudioButton text={ex.passive.transliteration} />
                                             <div>
                                                <div className="text-xl font-semibold text-teal-800">{ex.passive.transliteration}</div>
                                                <div className="text-sm text-gray-600">{ex.passive.hebrew}</div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

interface ParticiplesViewProps {
    setView: (view: View) => void;
}

const ParticiplesView: React.FC<ParticiplesViewProps> = ({ setView }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">צורות הבינוני (פועל ופעול)</h2>
        <p className="text-lg text-gray-600">למד כיצד להפוך פעלים לשמות תואר או שמות עצם, בדומה ל"כותב" ו"כתוב" בעברית.</p>
      </div>

       <div className="bg-blue-50 border-r-4 border-blue-400 p-4 rounded-l-lg mb-8 text-right" dir="rtl">
            <div className="flex">
                <div className="flex-shrink-0 ml-3 mt-1">
                    <LightBulbIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div className="space-y-3">
                    <p className="text-base text-blue-800">
                        <strong>מה זה "בינוני"?</strong> זה אחד הנושאים השימושיים ביותר שתלמדו! צורת ה'בינוני' היא דרך להפוך פועל לשם תואר או שם עצם. חשבו על זה בדיוק כמו בעברית: מהפועל <strong>כָּתַב</strong>, אנחנו יכולים ליצור שתי מילים חדשות:
                    </p>
                    <ul className="list-decimal list-inside pr-4 text-blue-900 space-y-2">
                        <li><strong className="font-semibold">כּוֹתֵב:</strong> מתאר את <strong>עושה הפעולה</strong>. זוהי צורת <strong>"בינוני פועֵל"</strong> (Active Participle).</li>
                        <li><strong className="font-semibold">כָּתוּב:</strong> מתאר את מה <strong>שהפעולה נעשתה עליו</strong>. זוהי צורת <strong>"בינוני פעוּל"</strong> (Passive Participle).</li>
                    </ul>
                     <p className="text-base text-blue-800">
                        אותו היגיון קיים בדיוק בערבית. מהפועל **שָׁבַר** בעברית, אנחנו יוצרים **שׁוֹבֵר** ו**שָׁבוּר**. בערבית, נשתמש בצורות הבינוני כדי לומר למשל: 'הדלת **סגורה**' (מְסַכְכַּרַה), 'השיעור **מובן**' (מַפְהוּם), או 'אני **מבין**' (פַאהֵם).
                    </p>
                    <p className="text-base text-blue-800">
                         בשיעור זה נלמד איך יוצרים את שתי הצורות האלה בבניינים השונים. שימו לב לתבניות (ה'משקלים') – הן מאוד עקביות ויעזרו לכם להבין את ההיגיון במהירות.
                    </p>
                </div>
            </div>
        </div>

      <div className="space-y-8">
        {PARTICIPLES.map((binyan) => (
          <BinyanCard key={binyan.id} binyan={binyan} />
        ))}
      </div>

        <div className="mt-12 text-center">
            <button
                onClick={() => setView('adjectives')}
                className="flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-teal-600 text-white font-bold text-xl rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 shadow-md"
            >
                <span>לשיעור הבא: שמות תואר</span>
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
        </div>
    </div>
  );
};

export default ParticiplesView;