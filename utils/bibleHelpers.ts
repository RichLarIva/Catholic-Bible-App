import bible from '../../assets/data/bible.json';

type BibleBook = {
    book: string;
    chapters: {
        chapter: number;
        verses: {
            verse: number;
            text: string;
        }[];
    }[];
};

export const getAllBooks = (): BibleBook[] => {
    return bible as BibleBook[];
};

export const getChapter = (bookName: string, chapterNumber: number) => {
    const book = getAllBooks().find(b => b.book === bookName);
    return book?.chapters.find(c => c.chapter === chapterNumber) || null;
};

export const getNextChapter = (
    bookName: string,
    chapterNumber: number
): { book: string; chapter: number } | null => {
    const allBooks = getAllBooks();
    const currentBookIndex = allBooks.findIndex(b => b.book === bookName);
    if (currentBookIndex === -1) return null;

    const book = allBooks[currentBookIndex];
    if (chapterNumber < book.chapters.length) {
        return { book: bookName, chapter: chapterNumber + 1 };
    }

    const nextBook = allBooks[currentBookIndex + 1];
    if (nextBook) {
        return { book: nextBook.book, chapter: 1 };
    }

    return null;
};

export const getPreviousChapter = (
    bookName: string,
    chapterNumber: number
): { book: string; chapter: number } | null => {
    const allBooks = getAllBooks();
    const currentBookIndex = allBooks.findIndex(b => b.book === bookName);
    if (currentBookIndex === -1) return null;

    if (chapterNumber > 1) {
        return { book: bookName, chapter: chapterNumber - 1 };
    }

    const prevBook = allBooks[currentBookIndex - 1];
    if (prevBook) {
        const lastChapter = prevBook.chapters.length;
        return { book: prevBook.book, chapter: lastChapter };
    }

    return null;
};
