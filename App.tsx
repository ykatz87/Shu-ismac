import React, { useState } from 'react';
import HomeView from './components/HomeView';
import IntroductionView from './components/IntroductionView';
import VerbsView from './components/VerbsView';
import NounsView from './components/NounsView';
import ParticiplesView from './components/ParticiplesView';
import AdjectivesView from './components/AdjectivesView';
import DrillsView from './components/DrillsView';
import PlaygroundView from './components/Playground';
import StoriesView from './components/StoriesView';
import LearningPathView from './components/LearningPathView';
import PhrasesView from './components/PhrasesView';
import ProverbsView from './components/ProverbsView';
import SituationalLessonsView from './components/SituationalLessonsView';
import SituationalLessonView from './components/SituationalLessonView';
import { HomeIcon, ArrowRightIcon } from './components/Icons';
import { SITUATIONAL_LESSONS } from './constants';

export type View = 
  | 'home'
  | 'introduction' 
  | 'verbs' 
  | 'nouns'
  | 'participles'
  | 'adjectives'
  | 'drills'
  | 'playground'
  | 'stories'
  | 'learningPath'
  | 'phrases'
  | 'proverbs'
  | 'situationalLessons'
  | 'situationalLesson';

const viewTitles: Record<string, string> = {
    home: "שוּ אִסְמַכּ? - למד ערבית פלסטינית",
    introduction: "מבוא - שיטת התעתיק",
    verbs: "בנק הפעלים",
    nouns: "לימוד שמות עצם",
    participles: "בינוני פועל ופעול",
    adjectives: "לימוד שמות תואר",
    drills: "תרגול ומשחקים",
    playground: "מגרש משחקים",
    stories: "סיפורים ומשלים",
    learningPath: "מסלול לימוד מומלץ",
    phrases: "ביטויים שימושיים",
    proverbs: "פתגמים וחוכמת חיים",
    situationalLessons: "לימוד לפי נושא",
};

const App: React.FC = () => {
  const [viewHistory, setViewHistory] = useState<View[]>(['home']);
  const [currentSituationalLessonId, setCurrentSituationalLessonId] = useState<string | null>(null);

  const currentView = viewHistory[viewHistory.length - 1];

  const navigateTo = (view: View, payload?: any) => {
    if (view === 'situationalLesson' && payload?.lessonId) {
        setCurrentSituationalLessonId(payload.lessonId);
    }
    setViewHistory(prev => [...prev, view]);
  };

  const goBack = () => {
    if (viewHistory.length > 1) {
      setViewHistory(prev => prev.slice(0, -1));
    }
  };
  
  const goHome = () => {
    setViewHistory(['home']);
  };

  const getCurrentTitle = () => {
    if (currentView === 'situationalLesson' && currentSituationalLessonId) {
        const lesson = SITUATIONAL_LESSONS.find(l => l.id === currentSituationalLessonId);
        return lesson ? `נושא: ${lesson.name}` : 'טוען שיעור...';
    }
    return viewTitles[currentView];
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView setView={navigateTo} />;
      case 'introduction':
        return <IntroductionView setView={navigateTo} />;
      case 'verbs':
        return <VerbsView setView={navigateTo} />;
      case 'nouns':
          return <NounsView setView={navigateTo} />;
      case 'participles':
        return <ParticiplesView setView={navigateTo} />;
      case 'adjectives':
        return <AdjectivesView setView={navigateTo} />;
      case 'drills':
          return <DrillsView setView={navigateTo} />;
      case 'playground':
        return <PlaygroundView />;
      case 'stories':
        return <StoriesView setView={navigateTo} />;
      case 'learningPath':
        return <LearningPathView setView={navigateTo} />;
      case 'phrases':
        return <PhrasesView setView={navigateTo} />;
      case 'proverbs':
        return <ProverbsView />;
      case 'situationalLessons':
        return <SituationalLessonsView setView={navigateTo} />;
      case 'situationalLesson':
        const lesson = SITUATIONAL_LESSONS.find(l => l.id === currentSituationalLessonId);
        return lesson ? <SituationalLessonView lesson={lesson} setView={navigateTo} /> : <div>טוען שיעור...</div>;
      default:
        return <HomeView setView={navigateTo} />;
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold text-teal-700">
                {getCurrentTitle()}
              </h1>
            </div>
            <div className="flex items-center gap-2">
                {viewHistory.length > 1 && (
                     <button
                        onClick={goBack}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:bg-teal-100 hover:text-teal-800"
                       >
                         <ArrowRightIcon className="w-5 h-5" />
                         <span className="hidden sm:inline">חזרה</span>
                    </button>
                )}
                {currentView !== 'home' && (
                   <button
                    onClick={goHome}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 hover:bg-teal-100 hover:text-teal-800"
                   >
                     <HomeIcon className="w-5 h-5" />
                     <span className="hidden sm:inline">חזרה לדף הבית</span>
                  </button>
                )}
            </div>
          </div>
        </nav>
      </header>
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {renderView()}
        </div>
      </main>
      <footer className="py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} פרויקט לימוד ערבית. כל הזכויות שמורות.</p>
      </footer>
    </div>
  );
};

export default App;