// services/audioCacheService.ts

const DB_NAME = 'audio-cache-db';
const STORE_NAME = 'audio-clips';
const DB_VERSION = 1;

interface AudioCacheRecord {
    text: string;
    audioData: string; // Base64 encoded audio
    timestamp: number;
}

let dbPromise: Promise<IDBDatabase> | null = null;

const initDB = (): Promise<IDBDatabase> => {
    if (dbPromise) {
        return dbPromise;
    }
    dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => {
            console.error('IndexedDB error:', request.error);
            reject('Error opening IndexedDB.');
        };

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'text' });
            }
        };

        request.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            resolve(db);
        };
    });
    return dbPromise;
};

export const getCachedAudio = async (text: string): Promise<string | null> => {
    try {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(text);

            request.onerror = () => {
                reject('Error fetching from cache.');
            };

            request.onsuccess = () => {
                if (request.result) {
                    resolve(request.result.audioData);
                } else {
                    resolve(null);
                }
            };
        });
    } catch (error) {
        console.error("Failed to get cached audio:", error);
        return null;
    }
};

export const setCachedAudio = async (text: string, audioData: string): Promise<void> => {
     try {
        const db = await initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const record: AudioCacheRecord = {
                text,
                audioData,
                timestamp: Date.now()
            };
            const request = store.put(record);

            request.onerror = () => {
                reject('Error saving to cache.');
            };
            
            request.onsuccess = () => {
                resolve();
            };
        });
    } catch (error) {
        console.error("Failed to set cached audio:", error);
    }
};
