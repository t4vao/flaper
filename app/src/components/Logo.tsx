import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

// CSS: linear-gradient(269.89deg, #FFEAA6 0.1%, #DAC9FD 50.48%, #B0D8FD 99.9%)
// 270deg runs right → left, so left-to-right the stops are reversed.
const GRADIENT = [colors.sky, colors.lavender, colors.butter] as const;
const LOCATIONS = [0.001, 0.4952, 0.999] as const;

export function Logo() {
  const word = <Text style={styles.word}>Plafer</Text>;

  return (
    <View accessible accessibilityRole="header" accessibilityLabel="Plafer">
      <MaskedView maskElement={word}>
        <LinearGradient
          colors={GRADIENT}
          locations={LOCATIONS}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        >
          <Text style={[styles.word, styles.hidden]}>Plafer</Text>
        </LinearGradient>
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  word: {
    fontFamily: fonts.logo,
    fontSize: 100,
    lineHeight: 130,
    letterSpacing: -9, // -0.09em
    // Italic glyphs overhang their advance width; pad so the mask doesn't clip them.
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },
  hidden: {
    opacity: 0,
  },
});
