import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { getRandomVerse } from '../../utils/bibleLoader';
import { getStyles } from '../../constants/styles';

export default function DailyScreen() {
    const [dailyVerse, setDailyVerse] = useState('');
    const [gospelVerse, setGospelVerse] = useState('');
    const [psalmVerse, setPsalmVerse] = useState('');

    const theme = useColorScheme();
    const isDark = useColorScheme() === 'dark';
    const styles = getStyles(isDark);

    useEffect(() => {
        const daily = getRandomVerse();
        const gospel = getRandomVerse(b => ['Matthew', 'Mark', 'Luke', 'John'].includes(b.book));
        const psalm = getRandomVerse(b => b.book === 'Psalms');

        setDailyVerse(`${daily.book} ${daily.chapter}:${daily.verse} — ${daily.text}`);
        setGospelVerse(`${gospel.book} ${gospel.chapter}:${gospel.verse} — ${gospel.text}`);
        setPsalmVerse(`${psalm.book} ${psalm.chapter}:${psalm.verse} — ${psalm.text}`);
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#F9F9F9' }]}>
            <View style={styles.center}>
                <Text style={styles.header}>📖 Daily Verse</Text>
                <Text style={[styles.verse, { color: isDark ? '#ccc' : '#333' }]}>{dailyVerse}</Text>

                <Text style={styles.header}>✝️ Gospel of the Day</Text>
                <Text style={[styles.verse, { color: isDark ? '#ccc' : '#333' }]}>{gospelVerse}</Text>

                <Text style={styles.header}>📜 Psalm of the Day</Text>
                <Text style={[styles.verse, { color: isDark ? '#ccc' : '#333' }]}>{psalmVerse}</Text>
            </View>
        </View>
    );
}

