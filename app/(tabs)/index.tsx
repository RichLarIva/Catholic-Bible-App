import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { getBooks, Book } from '../../utils/bibleLoader';
import { loadLastRead } from '../../utils/storage';



export default function HomeScreen() {
    const [lastRead, setLastRead] = useState<{ book: string; chapter: number } | null>(null);
    const [dailyVerse, setDailyVerse] = useState<string>('');

    useEffect(() => {
        loadLastRead().then(setLastRead);
        pickDailyVerse();
    }, []);

    const pickDailyVerse = () => {
        const books = getBooks();
        const today = new Date();
        const index = today.getDate() % books.length;

        const book = books[index];
        const chapter = book.chapters[0];
        const verse = chapter.verses[0];

        setDailyVerse(`${book.book} ${chapter.chapter}:${verse.verse} — ${verse.text}`);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>📖 Welcome to Bible App</Text>

            <Text style={styles.subHeader}>🌞 Daily Verse</Text>
            <Text style={styles.verseBox}>{dailyVerse}</Text>

            {lastRead ? (
                <>
                    <Text style={styles.subHeader}>📌 Last Read</Text>
                    <Button
                        title={`Continue ${lastRead?.book} ${lastRead?.chapter}`}
                        onPress={() => router.push(`/chapters/${book?.book}/${lastRead?.chapter}`)}
                    />
                </>
            ) : undefined}

            <Text style={styles.subHeader}>📚 Browse Books</Text>
            <>
                {getBooks().map((book: Book) => (
                    <View key={book.book} style={styles.buttonWrap}>
                        <Button
                            title={book.book}
                            onPress={() => router.push(`/reader/${book.book}/1`)}
                        />
                    </View>
                ))}
            </>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 12,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
    },
    verseBox: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
    },
    buttonWrap: {
        marginVertical: 4,
    },
});
