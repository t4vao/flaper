import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors, fonts } from '@/theme';

export const STEP_CARD_WIDTH = 300;
const HEIGHT = 156;
const PANEL = 104;
const SLANT = 22;

type Props = {
  sticker: React.ReactNode;
  title: string;
  body: string;
  action: string;
  onPress?: () => void;
};

// A next step for the profile: an ink panel cut on the diagonal holds the sticker,
// the copy and its one action sit on the white side.
export function StepCard({ sticker, title, body, action, onPress }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.panel}>
        <Svg width={PANEL} height={HEIGHT} style={StyleSheet.absoluteFill}>
          <Path d={`M0 0H${PANEL}L${PANEL - SLANT} ${HEIGHT}H0Z`} fill={colors.ink} />
        </Svg>
        <View style={styles.sticker}>{sticker}</View>
      </View>

      <View style={styles.copy}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </View>
        <Text style={styles.body} numberOfLines={2}>
          {body}
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityHint={onPress ? undefined : 'Disponível quando as contas forem ativadas.'}
          onPress={onPress}
          style={({ pressed }) => [styles.action, pressed && styles.pressed]}
        >
          <Text style={styles.actionLabel}>{action}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: STEP_CARD_WIDTH,
    height: HEIGHT,
    flexDirection: 'row',
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  panel: {
    width: PANEL,
    height: HEIGHT,
    justifyContent: 'center',
    paddingLeft: 22,
  },
  sticker: {
    transform: [{ rotate: '-6deg' }],
  },
  copy: {
    flex: 1,
    paddingVertical: 16,
    paddingRight: 16,
    paddingLeft: 4,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 23,
    lineHeight: 25,
    letterSpacing: -0.3,
    color: colors.ink,
  },
  body: {
    fontFamily: fonts.label,
    fontSize: 12.5,
    lineHeight: 17,
    color: colors.graphite,
  },
  action: {
    alignSelf: 'flex-start',
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: colors.lavender,
  },
  actionLabel: {
    fontFamily: fonts.label,
    fontSize: 14,
    color: colors.ink,
  },
  pressed: {
    transform: [{ scale: 0.96 }],
  },
});
