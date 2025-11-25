import React from 'react';
import { PROVERBS } from '../constants';
import { Proverb } from '../types';
import { generateAndPlayAudio } from '../services/elevenLabsService';
import { PlayIcon, LoadingSpinnerIcon, LightBulbIcon } from './Icons';

const AudioButton: React.FC<{ text: string }> = ({ text }) => {
    const [isLoading, setIsLoading] = React.useState(false);
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

const ProverbCard: React.FC<{ proverb: Proverb }> = ({ proverb }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <p className="text-2xl font-bold text-teal-700" dir="rtl">{proverb.transliteration}</p>
          <p className="text-lg text-gray-800" dir="rtl">{proverb.hebrew}</p>
        </div>
        <AudioButton text={proverb.transliteration} />
      </div>
      <div className="pt-4 border-t border-gray-200">
        <p className="text-md text-gray-600 bg-gray-50 p-3 rounded-lg" dir="rtl">
            <span className="font-semibold">הסבר:</span> {proverb.explanation}
        </p>
      </div>
    </div>
  );
};


const ProverbsView: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-10">
        <LightBulbIcon className="w-12 h-12 mx-auto text-teal-600 mb-2" />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">פתגמים וחוכמת חיים</h2>
        <p className="text-lg text-gray-600">למד ביטויים ציוריים שמעשירים את השפה.</p>
      </div>
      
      <div className="space-y-6 max-w-4xl mx-auto">
        {PROVERBS.map((proverb, index) => (
          <ProverbCard key={index} proverb={proverb} />
        ))}
      </div>
    </div>
  );
};

export default ProverbsView;
