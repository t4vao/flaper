import { Image, StyleSheet } from 'react-native';

// Provisional Flaper mark (lavender smiley). The source is 150 px, so keep it at 75 pt or
// smaller until a higher-resolution export replaces it.
const MARK = require('../../assets/brand/flaper-mark.png');

type Props = {
  size?: number;
};

export function BrandMark({ size = 72 }: Props) {
  return (
    <Image
      source={MARK}
      style={[styles.mark, { width: size, height: size }]}
      accessibilityIgnoresInvertColors
      // The wordmark beside it already carries the brand name for screen readers.
      accessible={false}
      aria-hidden
    />
  );
}

const styles = StyleSheet.create({
  mark: {
    resizeMode: 'contain',
  },
});
