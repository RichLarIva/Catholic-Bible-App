import { useLocalSearchParams, router } from 'expo-router';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    FlatList,
    useColorScheme,
} from 'react-native';
import { getBook } from '../../../utils/bibleLoader';

export default function ChapterGrid() {
    const { book } = useLocalSearchParams();
    const bookName = book as string;
    const bookData = getBook(bookName);
    const theme = useColorScheme();
    const isDark = theme === 'dark';

    if (!bookData) {
        return <Text>Book not found.</Text>;
    }

    const chapters = bookData.chapters.map((c) => c.chapter);

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#FAF8F2' }]}>
            <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>{bookName}</Text>

            <FlatList
                data={chapters}
                keyExtractor={(item) => item.toString()}
                numColumns={4}
                contentContainerStyle={styles.grid}
                renderItem={({ item }) => (
                    <Pressable
                        style={[styles.cell, { backgroundColor: isDark ? '#333' : '#ccc' }]}
                        onPress={() => router.push(`/reader/${bookName}/${item}`)}
                    >
                        <Text style={[styles.cellText, { color: isDark ? '#fff' : '#000' }]}>
                            {item}
                        </Text>
                    </Pressable>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    grid: {
        gap: 8,
        paddingBottom: 40,
    },
    cell: {
        padding: 15,
        margin: 6,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 60,
    },
    cellText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
