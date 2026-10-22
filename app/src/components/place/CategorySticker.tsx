import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { type Category, CATEGORY_LABEL } from '@/data/places';
import { colors, fonts } from '@/theme';

const FILL: Record<Exclude<Category, 'festa'>, string> = {
  restaurante: colors.butter,
  bar: colors.lavender,
  cafe: colors.sky,
};

// The sticker-like label that sits on a pin or on top of the card. Festas get the full brand gradient.
export function CategorySticker({ category, large = false }: { category: Category; large?: boolean }) {
  const size = large ? styles.large : styles.small;

  return (
    <View style={[styles.sticker, size, category !== 'festa' && { backgroundColor: FILL[category] }]}>
      {category === 'festa' && (
        <LinearGradient
          colors={[colors.sky, colors.lavender, colors.butter]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <Text style={[styles.label, large && styles.labelLarge]}>{CATEGORY_LABEL[category]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sticker: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.35)',
  },
  small: {
    height: 22,
    paddingHorizontal: 8,
  },
  large: {
    height: 28,
    paddingHorizontal: 12,
  },
  label: {
    fontFamily: fonts.label,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: -0.2,
    color: colors.ink,
  },
  labelLarge: {
    fontSize: 13,
    lineHeight: 16,
  },
});
