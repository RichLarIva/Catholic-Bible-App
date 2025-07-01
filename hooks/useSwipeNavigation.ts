import { PanResponder } from 'react-native';
import { router } from 'expo-router';
import { getNextChapter, getPreviousChapter } from '../utils/bibleLoader';

export const useSwipeNavigation = (book: string, chapter: number) => {
    return PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
            Math.abs(gestureState.dx) > 30, // start responding after significant horizontal swipe
        onPanResponderRelease: (_, gestureState) => {
            if (gestureState.dx < -50) {
                const next = getNextChapter(book, chapter);
                if (next) router.push(`/reader/${next.book}/${next.chapter}`);
            } else if (gestureState.dx > 50) {
                const prev = getPreviousChapter(book, chapter);
                if (prev) router.push(`/reader/${prev.book}/${prev.chapter}`);
            }
        },
    });
};
