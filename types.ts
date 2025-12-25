
// FIX: Removed self-import of VocabularyWord. A file cannot import from itself.
export type Tense = 'past' | 'present' | 'future' | 'imperative';

export interface Conjugation {
    pronoun: string;
    arabicPronoun: string;
    transliteration: string;
    hebrew: string;
}

export interface Example {
    transliteration: string;
    hebrew: string;
}

export interface TenseData {
    conjugations: Conjugation[];
    examples?: Example[];
}

export interface Verb {
    id: string;
    infinitive: string;
    root: string;
    conjugations: {
        [key in Tense]?: TenseData;
    };
}

export interface VerbPattern {
    id: string;
    name: string;
    verbs: Verb[];
}

export interface Binyan {
    id: string;
    name: string;
    patterns: VerbPattern[];
}

export interface WordForm {
    transliteration: string;
    hebrew: string;
}

export interface Noun {
    id: string;
    category: string;
    singular: WordForm;
    plural?: WordForm;
    definite: {
        singular: string;
        plural?: string;
    };
    possessives: Array<{
        pronoun: string;
        singular: string;
        plural?: string;
    }>;
}

export interface Pronoun {
  id: string;
  hebrew: string;
  transliteration: string;
  category: 'singular' | 'plural';
}

export interface PseudoVerb {
  id: string;
  baseHebrew: string;
  baseTransliteration: string;
  conjugations: Array<{
    pronoun: string;
    arabicPronoun: string;
    transliteration: string;
    hebrew: string;
  }>;
}

export interface StorySentence {
    transliteration: string;
    hebrew: string;
}

export interface VocabularyWord {
    transliteration: string;
    hebrew: string;
}

export interface Story {
    id: number;
    title: string;
    sentences: StorySentence[];
    vocabulary: VocabularyWord[];
    moral: string;
}

export interface AppProgress {
    verbs: {
        [binyanId: string]: {
            [key in Tense]?: {
                [verbId: string]: boolean;
            };
        };
    };
    adjectives?: {
        [categoryId: string]: boolean;
    };
}

export interface Phrase {
    transliteration: string;
    hebrew: string;
}

export interface PhraseCategory {
    id: string;
    name: string;
    phrases: Phrase[];
}

export interface Proverb {
    transliteration: string;
    hebrew: string;
    explanation: string;
}

export interface ParticipleForm {
    transliteration: string;
    hebrew: string;
}

export interface ParticipleExample {
    id: string;
    root: string;
    verb: ParticipleForm;
    active: ParticipleForm; // בינוני פועל
    passive: ParticipleForm; // בינוני פעול
}

export interface ParticipleBinyan {
    id: string;
    name: string; // e.g., "בניין 1 - פעל"
    explanation: string; // a short explanation of the pattern
    examples: ParticipleExample[];
}

export interface Adjective {
  id: string;
  hebrew: string;
  masculine: string;
  feminine: string;
  plural: string;
}

export interface AdjectiveCategory {
  id: string;
  name: string;
  adjectives: Adjective[];
}

export interface SituationalLessonDrill {
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  transliterationToPlay: string;
}

export interface SituationalLesson {
  id: string;
  name: string;
  description: string;
  icon: 'ChatBubbleLeftRightIcon' | 'ShoppingBagIcon' | 'BuildingStorefrontIcon' | 'TruckIcon' | 'HeartPulseIcon' | 'ClockIcon' | 'UsersIcon' | 'CreditCardIcon';
  phrases: Phrase[];
  drills: SituationalLessonDrill[];
  vocabulary?: VocabularyWord[];
}
