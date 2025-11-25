import React from 'react';
import { View } from '../App';
import { SITUATIONAL_LESSONS } from '../constants';
import { SituationalLesson } from '../types';
import { ChatBubbleLeftRightIcon, ShoppingBagIcon, BuildingStorefrontIcon, TruckIcon, HeartPulseIcon, ClockIcon, UsersIcon, CreditCardIcon } from './Icons';

interface SituationalLessonsViewProps {
  setView: (view: View, payload?: any) => void;
}

const iconMap: Record<SituationalLesson['icon'], React.ReactNode> = {
    ChatBubbleLeftRightIcon: <ChatBubbleLeftRightIcon className="w-10 h-10" />,
    ShoppingBagIcon: <ShoppingBagIcon className="w-10 h-10" />,
    BuildingStorefrontIcon: <BuildingStorefrontIcon className="w-10 h-10" />,
    TruckIcon: <TruckIcon className="w-10 h-10" />,
    HeartPulseIcon: <HeartPulseIcon className="w-10 h-10" />,
    ClockIcon: <ClockIcon className="w-10 h-10" />,
    UsersIcon: <UsersIcon className="w-10 h-10" />,
    CreditCardIcon: <CreditCardIcon className="w-10 h-10" />,
};

const LessonCard: React.FC<{ lesson: SituationalLesson, onClick: () => void }> = ({ lesson, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="p-6 bg-white rounded-2xl shadow-md border-2 border-transparent text-center w-full h-full flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-2 focus:outline-none focus:ring-4 focus:ring-opacity-50 hover:border-teal-400 focus:ring-teal-300"
        >
            <div className="mb-4 text-teal-600">
                {iconMap[lesson.icon]}
            </div>
            <h3 className="text-xl font-bold text-gray-800">{lesson.name}</h3>
            <p className="text-gray-600 mt-2">{lesson.description}</p>
        </button>
    );
};

const SituationalLessonsView: React.FC<SituationalLessonsViewProps> = ({ setView }) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">לימוד לפי נושא</h2>
        <p className="text-lg text-gray-600">בחר נושא כדי ללמוד אוצר מילים וביטויים הקשורים לסיטואציות יומיומיות.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SITUATIONAL_LESSONS.map(lesson => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            onClick={() => setView('situationalLesson', { lessonId: lesson.id })}
          />
        ))}
      </div>
    </div>
  );
};

export default SituationalLessonsView;