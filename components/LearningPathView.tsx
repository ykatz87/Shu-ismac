import React from 'react';
import { View } from '../App';
import { AcademicCapIcon, PencilSwooshIcon, DocumentTextIcon, TargetIcon, GamepadIcon, BookOpenIcon, ChatBubbleLeftRightIcon, SparklesIcon } from './Icons';

interface LearningPathViewProps {
  setView: (view: View) => void;
}

const steps = [
  {
    view: 'introduction' as View,
    title: 'שלב 1: מבוא ושיטת התעתיק',
    description: 'הבסיס להכל. למד כיצד לקרוא ולהגות את הצלילים בערבית.',
    icon: <AcademicCapIcon className="w-8 h-8" />,
  },
  {
    view: 'verbs' as View,
    title: 'שלב 2: לימוד פעלים',
    description: 'למד את הפעלים הנפוצים ביותר ואת הטיותיהם בזמנים השונים.',
    icon: <PencilSwooshIcon className="w-8 h-8" />,
  },
  {
    view: 'nouns' as View,
    title: 'שלב 3: לימוד שמות עצם',
    description: 'הרחב את אוצר המילים שלך עם שמות עצם שימושיים וכינויי קניין.',
    icon: <DocumentTextIcon className="w-8 h-8" />,
  },
  {
    view: 'participles' as View,
    title: 'שלב 4: בינוני פועל ופעול',
    description: 'למד להפוך פעלים לשמות תואר (למשל "כותב" ו"כתוב").',
    icon: <SparklesIcon className="w-8 h-8" />,
  },
  {
    view: 'adjectives' as View,
    title: 'שלב 5: לימוד שמות תואר',
    description: 'למד איך לתאר אנשים, חפצים ומצבים בצבעים, גדלים ותכונות.',
    icon: <SparklesIcon className="w-8 h-8" />,
  },
  {
    view: 'phrases' as View,
    title: 'שלב 6: ביטויים שימושיים',
    description: 'למד משפטים נפוצים והתחל לבנות שיחות פשוטות.',
    icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
  },
  {
    view: 'drills' as View,
    title: 'שלב 7: תרגול ושינון',
    description: 'חזק את הידע שלך עם תרגילים אינטראקטיביים על פעלים ושמות עצם.',
    icon: <TargetIcon className="w-8 h-8" />,
  },
   {
    view: 'stories' as View,
    title: 'שלב 8: סיפורים ומשלים',
    description: 'שפר את הבנת הנשמע ואוצר המילים דרך סיפורים קצרים.',
    icon: <BookOpenIcon className="w-8 h-8" />,
  },
  {
    view: 'playground' as View,
    title: 'שלב 9: מגרש המשחקים',
    description: 'השלב המעשי! תרגל הגייה ושיחה עם עזרה מהבינה המלאכותית.',
    icon: <GamepadIcon className="w-8 h-8" />,
  },
];

const LearningPathView: React.FC<LearningPathViewProps> = ({ setView }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">מסלול הלימוד המומלץ</h2>
        <p className="text-lg text-gray-600">עקוב אחר השלבים כדי לבנות בסיס חזק בערבית מדוברת.</p>
      </div>
      
      <div className="relative pr-6">
        {/* The vertical line */}
        <div className="absolute top-0 right-10 w-1 h-full bg-teal-200 rounded-full" aria-hidden="true"></div>

        <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.view} className="relative flex items-start">
                  <div className="flex-shrink-0 w-20 flex justify-center">
                    <div className="z-10 w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center text-white shadow-md border-4 border-gray-50">
                        {step.icon}
                    </div>
                  </div>
                  <div className="flex-1 mr-6">
                    <PathCard step={step} setView={setView} />
                  </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const PathCard: React.FC<{ step: typeof steps[0]; setView: (view: View) => void; }> = ({ step, setView }) => (
    <button 
        onClick={() => setView(step.view)}
        className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 w-full text-right hover:shadow-xl hover:border-teal-400 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
    >
        <h3 className="text-xl font-bold text-teal-800 mb-2">{step.title}</h3>
        <p className="text-gray-600">{step.description}</p>
    </button>
);


export default LearningPathView;