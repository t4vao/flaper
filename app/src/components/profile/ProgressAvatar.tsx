import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { Avatar } from '@/components/Avatar';
import { colors, fonts } from '@/theme';

const SIZE = 196;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// The avatar inside a ring that fills clockwise from the top as the profile gets completed.
export function ProgressAvatar({ handle, percent }: { handle: string; percent: number }) {
  const filled = (CIRCUMFERENCE * Math.min(100, Math.max(0, percent))) / 100;

  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Perfil completo"
      accessibilityValue={{ min: 0, max: 100, now: percent, text: `${percent}%` }}
      style={styles.wrap}
    >
      <Svg width={SIZE} height={SIZE} style={StyleSheet.absoluteFill}>
        <Circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} stroke={colors.ringTrack} strokeWidth={STROKE} fill="none" />
        {percent > 0 && (
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={colors.navIconSelected}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${filled} ${CIRCUMFERENCE}`}
            fill="none"
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        )}
      </Svg>
      <Avatar handle={handle} size={SIZE - STROKE * 2 - 16} />
      <View style={styles.badge}>
        <Text style={styles.badgeLabel}>{percent}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Sits on the ring's lowest point, half over it, like a tag clipped to the frame.
  badge: {
    position: 'absolute',
    bottom: -14,
    minWidth: 72,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lavender,
    borderWidth: 3,
    borderColor: colors.white,
  },
  badgeLabel: {
    fontFamily: fonts.label,
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: -0.3,
    color: colors.ink,
  },
});
