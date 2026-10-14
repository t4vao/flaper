import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

type Variant = 'light' | 'dark';

const VARIANTS = {
  light: {
    gradient: [colors.white, colors.sky],
    boxShadow: `inset 1px 1px 6.8px ${colors.sky}, inset 0px 4px 4px rgba(176, 216, 253, 0.08)`,
    text: colors.ink,
  },
  dark: {
    gradient: [colors.graphite, colors.ink],
    boxShadow: 'inset 2px 2px 3.6px #6F6F84, inset 0px 4px 4px rgba(255, 255, 255, 0.08)',
    text: colors.white,
  },
} as const;

type Props = {
  label: string;
  variant: Variant;
  onPress?: () => void;
};

export function PillButton({ label, variant, onPress }: Props) {
  const v = VARIANTS[variant];

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <LinearGradient colors={v.gradient} style={StyleSheet.absoluteFill} />
      {/* Inset shadows render below children, so they sit on their own layer above the gradient. */}
      <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.radius, { boxShadow: v.boxShadow }]} />
      <Text style={[styles.label, { color: v.text }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radius: {
    borderRadius: 100,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  label: {
    fontFamily: fonts.label,
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.96, // -0.06em
  },
});
