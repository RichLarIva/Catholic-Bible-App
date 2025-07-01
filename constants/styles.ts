import { StyleSheet } from 'react-native';

export const getStyles = (isDark: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: isDark ? '#121212' : '#ffffff',
            padding: 20,
        },
        header: {
            fontFamily: 'CardoBold',
            fontSize: 24,
            color: isDark ? '#ffffff' : '#000000',
            marginBottom: 12,
        },
        verse: {
            fontFamily: 'Cardo',
            fontSize: 16,
            color: isDark ? '#dddddd' : '#222222',
            lineHeight: 24,
            marginBottom: 10,
        },
        input: {
            borderColor: '#ccc',
            borderWidth: 1,
            padding: 10,
            fontSize: 16,
            borderRadius: 6,
            marginBottom: 8,
            fontFamily: 'Cardo',
        },

        noteItem: {
            backgroundColor: '#2a2a2a',
            padding: 12,
            borderRadius: 6,
            marginBottom: 10,
        },

    });
