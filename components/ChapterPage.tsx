import { ReactNode, useEffect } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { ViewStyle } from 'react-native';

type Props = {
    children: ReactNode;
}

export default function ChapterPage({children}: Props)
{
    const translateX = useSharedValue(100);
    const opacity = useSharedValue(0);

    useEffect(() => {
        translateX.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.ease) });
        opacity.value = withTiming(1, { duration: 400 });
    }, []);

    const style = useAnimatedStyle((): ViewStyle => ({
        transform: [{ translateX: translateX.value }],
        opacity: opacity.value,
    }));

    return <Animated.View style={style}>{children}</Animated.View>;
}