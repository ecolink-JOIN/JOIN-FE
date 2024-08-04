import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { colors } from '@/theme';
import Typography from '@/atoms/Typography';

const typoStyles = StyleSheet.create({
  color: {
    color: colors.white,
  },
});

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}
    >
      <ThemedView style={styles.titleContainer}>
        <Typography variant="heading1" style={typoStyles.color}>
          Heading1
        </Typography>
        <Typography variant="heading2" style={typoStyles.color}>
          Heading2
        </Typography>
        <Typography variant="heading3" style={typoStyles.color}>
          Heading3
        </Typography>
        <Typography variant="heading4" style={typoStyles.color}>
          Heading4
        </Typography>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <Typography variant="subtitle1" style={typoStyles.color}>
          Subtitle1
        </Typography>
        <Typography variant="subtitle2" style={typoStyles.color}>
          Subtitle2
        </Typography>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <Typography variant="button" style={typoStyles.color}>
          Button
        </Typography>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <Typography variant="body1" style={typoStyles.color}>
          Body1
        </Typography>
        <Typography variant="body2" style={typoStyles.color}>
          Body2
        </Typography>
        <Typography variant="body3" style={typoStyles.color}>
          Body3
        </Typography>
        <Typography variant="body4" style={typoStyles.color}>
          Body4
        </Typography>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        <Typography variant="caption1" style={typoStyles.color}>
          Caption1
        </Typography>
        <Typography variant="caption2" style={typoStyles.color}>
          Caption2
        </Typography>
        <Typography variant="caption3" style={typoStyles.color}>
          Caption3
        </Typography>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
