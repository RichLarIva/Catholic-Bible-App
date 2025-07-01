export const bibleBooks = [
    { name: 'Genesis', chapters: 50 },
    { name: 'Exodus', chapters: 40 },
    { name: 'Leviticus', chapters: 27 },
    // Add more books as needed...
];

export const getNextChapter = (
    book: string,
    chapter: number
): { book: string; chapter: number } | null => {
    const current = bibleBooks.find(b => b.name === book);
    if (!current) return null;
    if (chapter < current.chapters) return { book, chapter: chapter + 1 };

    const index = bibleBooks.findIndex(b => b.name === book);
    const nextBook = bibleBooks[index + 1];
    if (nextBook) return { book: nextBook.name, chapter: 1 };

    return null;
};

export const getPreviousChapter = (
    book: string,
    chapter: number
): { book: string; chapter: number } | null => {
    if (chapter > 1) return { book, chapter: chapter - 1 };

    const index = bibleBooks.findIndex(b => b.name === book);
    const prevBook = bibleBooks[index - 1];
    if (prevBook) return { book: prevBook.name, chapter: prevBook.chapters };

    return null;
};
