import { StyleSheet, Text } from 'react-native';

import { colors, fonts } from '@/theme';

// MaskedView is native-only; on web the original CSS background-clip technique works directly.
export function Logo() {
  return (
    <Text accessibilityRole="header" style={styles.word}>
      Plafer
    </Text>
  );
}

// Web-only CSS that React Native's style types don't model.
const webTextClip = {
  backgroundImage: `linear-gradient(269.89deg, ${colors.butter} 0.1%, ${colors.lavender} 50.48%, ${colors.sky} 99.9%)`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
} as object;

const styles = StyleSheet.create({
  word: {
    fontFamily: fonts.logo,
    fontSize: 100,
    lineHeight: 130,
    letterSpacing: -9,
    paddingHorizontal: 12,
    ...webTextClip,
  },
});
