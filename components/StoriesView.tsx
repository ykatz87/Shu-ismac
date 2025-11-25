import React, { useState } from 'react';
import { STORIES } from '../constants';
// FIX: Import `View` from `../App` instead of `../types`.
import { Story, StorySentence } from '../types';
import { View } from '../App';
import { generateAndPlayAudio } from '../services/elevenLabsService';
import { PlayIcon, LoadingSpinnerIcon, TranslateIcon, BookOpenIcon, ChevronDownIcon, ArrowLeftIcon } from './Icons';

const Sentence: React.FC<{ sentence: StorySentence }> = ({ sentence }) => {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className="py-3 border-b border-gray-200 last:border-b-0">
      <div className="flex justify-between items-start gap-4">
        <p className="flex-1 text-xl text-gray-800 leading-relaxed text-right" dir="rtl">
          {sentence.transliteration}
        </p>
        <button 
          onClick={() => setShowTranslation(!showTranslation)}
          className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="הצג תרגום"
        >
          <TranslateIcon className="w-5 h-5" />
        </button>
      </div>
      {showTranslation && (
        <p className="mt-2 text-md text-teal-700 bg-teal-50 p-3 rounded-lg text-right" dir="rtl">
          {sentence.hebrew}
        </p>
      )}
    </div>
  );
};

const StoryCard: React.FC<{ story: Story }> = ({ story }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loadingAudioId, setLoadingAudioId] = useState<number | null>(null);

  const handlePlayStory = async () => {
    if (loadingAudioId) return;
    setLoadingAudioId(story.id);
    try {
      // Join with a period to give the TTS a natural pause between sentences.
      const fullStoryText = story.sentences.map(s => s.transliteration).join('. ');
      await generateAndPlayAudio(fullStoryText);
    } catch (error) {
      console.error("Failed to play story audio", error);
    } finally {
      setLoadingAudioId(null);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-right p-6 hover:bg-gray-50 transition-colors focus:outline-none"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-teal-700">{story.title}</h3>
          <ChevronDownIcon className={`w-6 h-6 text-gray-500 transition-transform transform ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isExpanded && (
        <div className="p-6 border-t border-gray-200">
          <div className="mb-6">
             <button
                onClick={handlePlayStory}
                disabled={loadingAudioId === story.id}
                className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white font-bold rounded-full hover:bg-teal-700 transition-all transform hover:scale-105 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loadingAudioId === story.id ? (
                    <>
                        <LoadingSpinnerIcon className="w-5 h-5" />
                        <span>יוצר שמע...</span>
                    </>
                ) : (
                    <>
                        <PlayIcon className="w-5 h-5" />
                        <span>האזן לסיפור</span>
                    </>
                )}
            </button>
          </div>
          
          <div className="space-y-2 mb-8">
            {story.sentences.map((sentence, index) => (
              <Sentence key={index} sentence={sentence} />
            ))}
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-2 border-b-2 border-teal-200 pb-1">אוצר מילים</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
              {story.vocabulary.map((word, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-semibold text-teal-800" dir="rtl">{word.transliteration}</span> – {word.hebrew}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2 border-b-2 border-teal-200 pb-1">מוסר השכל</h4>
            <p className="text-gray-800 italic bg-gray-100 p-3 rounded-lg text-right" dir="rtl">{story.moral}</p>
          </div>
        </div>
      )}
    </div>
  );
};

interface StoriesViewProps {
    setView: (view: View) => void;
}

const StoriesView: React.FC<StoriesViewProps> = ({ setView }) => {
  return (
    <div>
      <div className="text-center mb-10">
        <BookOpenIcon className="w-12 h-12 mx-auto text-teal-600 mb-2" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">סיפורים ומשלים</h2>
        <p className="text-lg text-gray-600">קראו והאזינו לסיפורים בערבית כדי לשפר את הבנת הנשמע ואוצר המילים.</p>
      </div>
      
      <div className="space-y-6 max-w-4xl mx-auto">
        {STORIES.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>

       <div className="mt-12 text-center">
            <button
                onClick={() => setView('playground')}
                className="flex items-center justify-center gap-3 mx-auto px-8 py-4 bg-purple-600 text-white font-bold text-xl rounded-full hover:bg-purple-700 transition-all transform hover:scale-105 shadow-md"
            >
                <span>מוכנים לדבר? למגרש המשחקים!</span>
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
        </div>
    </div>
  );
};

export default StoriesView;