import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

const FILLS = [colors.lavender, colors.sky, colors.butter];

function fillFor(handle: string) {
  let hash = 0;
  for (const char of handle) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return FILLS[Math.abs(hash) % FILLS.length];
}

// Initial on a brand pastel until people have profile photos.
export function Avatar({ handle, size = 32 }: { handle: string; size?: number }) {
  const initial = handle.replace(/^@/, '').charAt(0).toUpperCase();

  return (
    <View
      accessible={false}
      style={[styles.circle, { width: size, height: size, borderRadius: size / 2, backgroundColor: fillFor(handle) }]}
    >
      <Text style={[styles.initial, { fontSize: Math.round(size * 0.42) }]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    fontFamily: fonts.label,
    color: colors.ink,
  },
});
