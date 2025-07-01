import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
    useColorScheme,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStyles } from '../../constants/styles';

type Note = {
    id: string;
    text: string;
};

export default function NotesScreen() {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState<Note[]>([]);
    const isDark = useColorScheme() === 'dark';
    const styles = getStyles(isDark);

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        const stored = await AsyncStorage.getItem('bible_notes');
        if (stored) setNotes(JSON.parse(stored));
    };

    const saveNotes = async (newNotes: Note[]) => {
        setNotes(newNotes);
        await AsyncStorage.setItem('bible_notes', JSON.stringify(newNotes));
    };

    const addNote = () => {
        if (!note.trim()) return;
        const newNote = { id: Date.now().toString(), text: note.trim() };
        const updated = [newNote, ...notes];
        saveNotes(updated);
        setNote('');
    };

    const deleteNote = (id: string) => {
        const updated = notes.filter(n => n.id !== id);
        saveNotes(updated);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>📝 Your Notes</Text>
            <View style={{ marginBottom: 12 }}>
                <TextInput
                    style={[styles.input, { height: 80 }]}
                    placeholder="Write a note..."
                    placeholderTextColor={isDark ? '#888' : '#999'}
                    multiline
                    value={note}
                    onChangeText={setNote}
                />
                <Button title="Save Note" onPress={addNote} />
            </View>

            <FlatList
                data={notes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.noteItem}>
                        <Text style={styles.verse}>{item.text}</Text>
                        <TouchableOpacity onPress={() => deleteNote(item.id)}>
                            <Text style={{ color: 'red', marginTop: 4 }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}
