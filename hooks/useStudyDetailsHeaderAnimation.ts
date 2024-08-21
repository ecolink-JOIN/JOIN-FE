import {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  interpolateColor,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { colors } from '@/theme';

const HEADER_HEIGHT = 130;
const ICON_BUTTON_HEIGHT = 30;
const COVER_THRESHOLD = HEADER_HEIGHT - ICON_BUTTON_HEIGHT;

export const useStudyDetailsHeaderAnimation = () => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
      [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT],
    );

    const backgroundColor = interpolateColor(scrollY.value, [0, HEADER_HEIGHT], [colors.primary, 'white']);

    return {
      transform: [{ translateY }],
      backgroundColor,
    };
  });

  const iconBackgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = scrollY.value >= COVER_THRESHOLD ? 'white' : 'transparent';
    return { backgroundColor };
  });

  const scrollViewBackgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = scrollY.value >= HEADER_HEIGHT ? 'white' : colors.primary;
    return { backgroundColor };
  });

  const whiteStrokeStyle = useAnimatedStyle(() => {
    const display = scrollY.value >= COVER_THRESHOLD ? 'none' : 'flex';
    return { display };
  });

  const blackStrokeStyle = useAnimatedStyle(() => {
    const display = scrollY.value < COVER_THRESHOLD ? 'none' : 'flex';
    return { display };
  });

  return {
    scrollY,
    scrollHandler,
    headerAnimatedStyle,
    iconBackgroundStyle,
    scrollViewBackgroundStyle,
    whiteStrokeStyle,
    blackStrokeStyle,
  };
};
