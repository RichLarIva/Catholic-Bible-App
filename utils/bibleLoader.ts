import bible from '../assets/data/bible.json';

export type Verse = {
    verse: number;
    text: string;
};

export type Chapter = {
    chapter: number;
    verses: Verse[];
};

export type Book = {
    book: string;
    chapters: Chapter[];
};

const bibleData = bible as Book[];

/**
 * Returns all books in the Bible.
 */
export const getBooks = (): Book[] => {
    return bibleData;
};

/**
 * Returns a book by name (e.g., "Genesis").
 */
export const getBook = (bookName: string): Book | undefined => {
    return bibleData.find(b => b.book === bookName);
};

/**
 * Returns a chapter from a specific book.
 */
export const getChapter = (bookName: string, chapterNumber: number): Chapter | undefined => {
    const book = getBook(bookName);
    return book?.chapters.find(c => c.chapter === chapterNumber);
};

/**
 * Returns a specific verse text, or null if not found.
 */
export const getVerse = (bookName: string, chapterNumber: number, verseNumber: number): string | null => {
    const chapter = getChapter(bookName, chapterNumber);
    const verse = chapter?.verses.find(v => v.verse === verseNumber);
    return verse?.text || null;
};

/**
 * Search across all verses for a text match.
 */
export const searchBible = (query: string): { book: string; chapter: number; verse: number; text: string }[] => {
    const results: { book: string; chapter: number; verse: number; text: string }[] = [];

    for (const book of bibleData) {
        for (const chapter of book.chapters) {
            for (const verse of chapter.verses) {
                if (verse.text.toLowerCase().includes(query.toLowerCase())) {
                    results.push({
                        book: book.book,
                        chapter: chapter.chapter,
                        verse: verse.verse,
                        text: verse.text
                    });
                }
            }
        }
    }

    return results;
};

/**
 * Gets the next chapter in the Bible.
 */
export const getNextChapter = (
    currentBook: string,
    currentChapter: number
): { book: string; chapter: number } | null => {
    const bookIndex = bibleData.findIndex(b => b.book === currentBook);
    if (bookIndex === -1) return null;

    const book = bibleData[bookIndex];

    // Next chapter in the same book
    if (currentChapter < book.chapters.length) {
        return { book: currentBook, chapter: currentChapter + 1 };
    }

    // Go to first chapter of next book
    const nextBook = bibleData[bookIndex + 1];
    if (nextBook) {
        return { book: nextBook.book, chapter: 1 };
    }

    return null; // End of Bible
};

/**
 * Gets the previous chapter in the Bible.
 */
export const getPreviousChapter = (
    currentBook: string,
    currentChapter: number
): { book: string; chapter: number } | null => {
    const bookIndex = bibleData.findIndex(b => b.book === currentBook);
    if (bookIndex === -1) return null;

    // Previous chapter in the same book
    if (currentChapter > 1) {
        return { book: currentBook, chapter: currentChapter - 1 };
    }

    // Go to last chapter of previous book
    const prevBook = bibleData[bookIndex - 1];
    if (prevBook) {
        return { book: prevBook.book, chapter: prevBook.chapters.length };
    }

    return null; // Beginning of Bible
};


export const getRandomVerse = (filter?: (book: Book) => boolean): {
    book: string;
    chapter: number;
    verse: number;
    text: string;
} => {
    const sourceBooks = filter ? bibleData.filter(filter) : bibleData;
    const book = sourceBooks[Math.floor(Math.random() * sourceBooks.length)];
    const chapter = book.chapters[Math.floor(Math.random() * book.chapters.length)];
    const verse = chapter.verses[Math.floor(Math.random() * chapter.verses.length)];

    return {
        book: book.book,
        chapter: chapter.chapter,
        verse: verse.verse,
        text: verse.text,
    };
};
