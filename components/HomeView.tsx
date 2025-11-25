import React from 'react';
import { View } from '../App';
import { MapIcon, TargetIcon, GamepadIcon, ChatBubbleBottomCenterTextIcon } from './Icons';

interface HomeViewProps {
  setView: (view: View) => void;
}

const HomeNavCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  isNew?: boolean;
}> = ({ title, description, icon, onClick, isNew }) => {
  return (
    <button
      onClick={onClick}
      className="relative w-full bg-white p-6 rounded-xl shadow-md border border-gray-200 text-right hover:shadow-lg hover:border-teal-400 transition-all duration-300 transform hover:-translate-y-1"
    >
      {isNew && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">חדש!</span>
      )}
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0 text-white bg-teal-500 p-4 rounded-full shadow-sm">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-teal-800">{title}</h3>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </button>
  );
};


const HomeView: React.FC<HomeViewProps> = ({ setView }) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-2">שוּ אִסְמַכּ?</h2>
        <p className="text-xl text-gray-600">הדרך שלך ללמוד ערבית פלסטינית מדוברת</p>
      </div>
      
      <div className="space-y-12">
        
        {/* Beginners Section */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">למתחילים</h3>
          <p className="text-lg text-gray-500 mb-6">רוצים להתחיל לדבר מהר? התחילו מכאן.</p>
          <div className="max-w-xl mx-auto">
            <HomeNavCard
              title="לימוד לפי נושא"
              description="למד ביטויים ושיחות לפי סיטואציות, כמו מסעדה, שוק והיכרות."
              icon={<ChatBubbleBottomCenterTextIcon className="w-8 h-8" />}
              onClick={() => setView('situationalLessons')}
              isNew={true}
            />
          </div>
        </div>

        {/* Advanced Section */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">למתקדמים</h3>
          <p className="text-lg text-gray-500 mb-6">רוצים לבנות בסיס דקדוקי חזק? זה המסלול בשבילכם.</p>
          <div className="max-w-xl mx-auto">
            <HomeNavCard
              title="מסלול לימוד מודרך"
              description="התחל מהיסודות ולמד את השפה צעד אחר צעד, מהגייה ועד פעלים."
              icon={<MapIcon className="w-8 h-8" />}
              onClick={() => setView('learningPath')}
            />
          </div>
        </div>

        {/* Drills Section */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">תרגול ומשחקים</h3>
          <p className="text-lg text-gray-500 mb-6">חיזוק הידע הוא המפתח להצלחה. בואו לתרגל!</p>
          <div className="space-y-6 max-w-xl mx-auto">
            <HomeNavCard
              title="תרגול ושינון"
              description="בחן את הידע שלך עם תרגילים אינטראקטיביים לחיזוק הזיכרון."
              icon={<TargetIcon className="w-8 h-8" />}
              onClick={() => setView('drills')}
            />
            <HomeNavCard
              title="מגרש משחקים AI"
              description="תרגל הגייה, קבל משוב מהבינה המלאכותית וקבל רעיונות לשיחה."
              icon={<GamepadIcon className="w-8 h-8" />}
              onClick={() => setView('playground')}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeView;