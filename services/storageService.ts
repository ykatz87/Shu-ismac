import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { AppProgress, Tense } from '../types';
import { VERBS } from '../constants';

const PROGRESS_KEY = 'shu-ismak-progress';

const getDefaultProgress = (): AppProgress => ({
    verbs: {},
    adjectives: {},
});

export const getProgress = (): AppProgress => {
    try {
        const saved = window.localStorage.getItem(PROGRESS_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            const defaultProgress = getDefaultProgress();
            // Merge with defaults to handle schema changes and ensure all keys exist
            return {
                ...defaultProgress,
                ...parsed,
                verbs: parsed.verbs || defaultProgress.verbs,
                adjectives: parsed.adjectives || defaultProgress.adjectives,
            };
        }
        return getDefaultProgress();
    } catch (error) {
        console.error("Failed to get progress from localStorage", error);
        return getDefaultProgress();
    }
};

export const saveProgress = (progress: AppProgress): void => {
    try {
        window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    } catch (error) {
        console.error("Failed to save progress to localStorage", error);
    }
};

// FIX: Updated the return type for the `useProgress` hook's setter function to allow for functional updates, which is required by consuming components.
export const useProgress = (): [AppProgress, Dispatch<SetStateAction<AppProgress>>] => {
    const [progress, setProgress] = useState<AppProgress>(getProgress());
    
    useEffect(() => {
        // This effect can be used if progress is modified from another tab, but for now we'll rely on direct saving.
        const handleStorageChange = () => {
             setProgress(getProgress());
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const updateAndSaveProgress: Dispatch<SetStateAction<AppProgress>> = (value) => {
        const newValue = typeof value === 'function' ? value(progress) : value;
        saveProgress(newValue);
        setProgress(newValue);
    };

    return [progress, updateAndSaveProgress];
};


// Logic for pedagogical flow

export const canAccessTense = (binyanId: string, tense: Tense, progress: AppProgress): boolean => {
    if (tense === 'past') return true; // 'past' is always the first tense

    const binyanProgress = progress.verbs?.[binyanId];
    if (!binyanProgress) return false;

    const binyanData = VERBS.find(b => b.id === binyanId);
    if (!binyanData) return false;

    const previousTense = tense === 'present' ? 'past' : tense === 'future' ? 'present' : 'future';
    
    const prevTenseProgress = binyanProgress[previousTense];
    if (!prevTenseProgress) return false;

    // Check if all verbs in the previous tense are completed
    // Fix: Access verbs through patterns, as 'verbs' is not a direct property of 'Binyan'.
    const allVerbsInBinyan = binyanData.patterns.flatMap(p => p.verbs);
    return allVerbsInBinyan.every(verb => prevTenseProgress[verb.id]);
};


export const canAccessBinyan = (binyanId: string, progress: AppProgress): boolean => {
    const binyanIndex = VERBS.findIndex(b => b.id === binyanId);
    if (binyanIndex <= 0) return true; // First binyan is always accessible

    const previousBinyanId = VERBS[binyanIndex - 1].id;
    const prevBinyanData = VERBS[binyanIndex - 1];
    const prevBinyanProgress = progress.verbs?.[previousBinyanId];
    if (!prevBinyanProgress) return false;

    // Fix: Access verbs through patterns, as 'verbs' is not a direct property of 'Binyan'.
    const allVerbsInPrevBinyan = prevBinyanData.patterns.flatMap(p => p.verbs);

    // Check that all tenses in the previous binyan are fully completed
    const tenses: Tense[] = ['past', 'present', 'future', 'imperative'];
    for (const tense of tenses) {
        // Fix: Check if any verb in the binyan has the tense, not just the first one.
        if (allVerbsInPrevBinyan.some(v => v.conjugations[tense])) { // check if tense exists for this binyan
            const tenseProgress = prevBinyanProgress[tense];
            // Fix: Check against all verbs in the binyan.
            if (!tenseProgress || !allVerbsInPrevBinyan.every(v => tenseProgress[v.id])) {
                return false; // Found an incomplete tense
            }
        }
    }
    
    return true;
};