import AsyncStorage from '@react-native-async-storage/async-storage';

const LAST_READ_KEY = 'last_read';
const NOTES_KEY = 'verse_notes';

export const saveLastRead = async (book: string, chapter: number) => {
    await AsyncStorage.setItem(LAST_READ_KEY, JSON.stringify({ book, chapter }));
};

export const loadLastRead = async (): Promise<{ book: string; chapter: number } | null> => {
    const json = await AsyncStorage.getItem(LAST_READ_KEY);
    return json ? JSON.parse(json) : null;
};

export const saveNote = async (
    book: string,
    chapter: number,
    verse: number,
    note: string
) => {
    const raw = await AsyncStorage.getItem(NOTES_KEY);
    const notes = raw ? JSON.parse(raw) : {};
    const key = `${book}-${chapter}-${verse}`;
    notes[key] = note;
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};

export const loadNote = async (
    book: string,
    chapter: number,
    verse: number
): Promise<string | null> => {
    const raw = await AsyncStorage.getItem(NOTES_KEY);
    const notes = raw ? JSON.parse(raw) : {};
    return notes[`${book}-${chapter}-${verse}`] || null;
};
