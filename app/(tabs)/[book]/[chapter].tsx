import { useLayoutEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    useColorScheme,
    useWindowDimensions,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { getChapter } from '../../../utils/bibleLoader';
import { useSwipeNavigation } from '../../../hooks/useSwipeNavigation';
import ChapterPage from '../../../components/ChapterPage';

export default function ReaderScreen() {
    const navigation = useNavigation();
    const { book, chapter } = useLocalSearchParams();
    const bookName = book as string;
    const chapterNumber = parseInt(chapter as string);
    const chapterData = getChapter(bookName, chapterNumber);
    const panResponder = useSwipeNavigation(bookName, chapterNumber);

    const theme = useColorScheme();
    const isDark = theme === 'dark';
    const { width } = useWindowDimensions();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: `${bookName} ${chapterNumber}`,
        });
    }, [navigation, bookName, chapterNumber]);

    if (!chapterData) {
        return (
            <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FAF8F2' }]}>
                <Text style={{ color: isDark ? '#fff' : '#000' }}>Chapter not found.</Text>
            </View>
        );
    }

    return (
        <View
            style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FAF8F2' }]}
            {...panResponder.panHandlers}
        >
            <ChapterPage>
                <Text style={[styles.chapterHeader, { color: isDark ? '#f5f5f5' : '#111' }]}>
                    {bookName} {chapterNumber}
                </Text>

                <FlatList
                    data={chapterData.verses}
                    keyExtractor={(item) => item.verse.toString()}
                    renderItem={({ item }) => (
                        <Text style={[styles.verse, { color: isDark ? '#eaeaea' : '#333' }]}>
                            <Text style={[styles.verseNumber, { color: isDark ? '#81D4FA' : '#1565C0' }]}>
                                {item.verse}{' '}
                            </Text>
                            {item.text}
                        </Text>
                    )}
                />
            </ChapterPage>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    chapterHeader: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10,
    },
    verse: {
        fontSize: 18,
        lineHeight: 28,
        marginBottom: 12,
        fontFamily: 'Cardo',
    },
    verseNumber: {
        fontWeight: 'bold',
    },
});
