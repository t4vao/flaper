import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ChevronGlyph } from '@/components/stickers';
import { colors, fonts } from '@/theme';

type Props = {
  sticker: React.ReactNode;
  label: string;
  count?: number;
  // Something new waits behind this row; announced in words, not just the dot.
  unread?: string;
  onPress?: () => void;
};

// One destination of the profile: sticker, serif label, count and chevron.
export function ProfileRow({ sticker, label, count, unread, onPress }: Props) {
  const spoken = [label, count !== undefined ? String(count) : null, unread].filter(Boolean).join(', ');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={spoken}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.sticker}>{sticker}</View>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      {unread && <View style={styles.dot} />}
      {count !== undefined && <Text style={styles.count}>{count}</Text>}
      <ChevronGlyph />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 68,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  sticker: {
    width: 36,
    alignItems: 'center',
  },
  label: {
    flex: 1,
    fontFamily: fonts.display,
    fontSize: 25,
    lineHeight: 30,
    letterSpacing: -0.3,
    color: colors.ink,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.navIconSelected,
  },
  count: {
    fontFamily: fonts.label,
    fontSize: 16,
    color: colors.muted,
    fontVariant: ['tabular-nums'],
  },
  pressed: {
    opacity: 0.6,
  },
});
