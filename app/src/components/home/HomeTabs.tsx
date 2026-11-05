import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

export type HomeTab = 'para-voce' | 'amigos';

const TABS: { id: HomeTab; label: string }[] = [
  { id: 'para-voce', label: 'Para você' },
  { id: 'amigos', label: 'Amigos' },
];

// Two text tabs. The current one is ink with a short rule under it; the other is muted.
export function HomeTabs({ value, onChange }: { value: HomeTab; onChange: (tab: HomeTab) => void }) {
  return (
    <View accessibilityRole="tablist" style={styles.row}>
      {TABS.map((tab) => {
        const active = tab.id === value;
        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(tab.id)}
            hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
            style={styles.tab}
          >
            <Text style={[styles.label, active && styles.labelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 22,
  },
  tab: {},
  label: {
    fontFamily: fonts.label,
    fontSize: 15,
    lineHeight: 19,
    letterSpacing: -0.2,
    color: colors.muted,
  },
  labelActive: {
    color: colors.ink,
  },
});
