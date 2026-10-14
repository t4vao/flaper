import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CherryIcon, MapIcon, PlusIcon, SearchIcon } from '@/components/icons';
import { colors, fonts } from '@/theme';

// Floating nav from screen 3: search circle · Mapa/Explorar capsule · gradient "+" circle.
export function BottomNav() {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Buscar"
        style={({ pressed }) => [styles.search, pressed && styles.pressed]}
      >
        <SearchIcon size={22} />
      </Pressable>

      <View style={styles.capsule}>
        <LinearGradient colors={[colors.white, '#ECECEC']} style={StyleSheet.absoluteFill} />
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.capsuleHighlight]} />
        <Tab label="Mapa" icon={<MapIcon size={19} />} />
        <Tab label="Explorar" icon={<CherryIcon size={19} />} />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Adicionar"
        style={({ pressed }) => [styles.add, pressed && styles.pressed]}
      >
        <LinearGradient
          colors={[colors.sky, colors.lavender, colors.butter]}
          locations={[0, 0.5, 1]}
          start={{ x: 0.3, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        {/* Wrapped so it stacks above the absolutely positioned gradient on web too. */}
        <View>
          <PlusIcon size={22} strokeWidth={1.25} />
        </View>
      </Pressable>
    </View>
  );
}

function Tab({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.tab, pressed && styles.pressed]}
    >
      {icon}
      <Text style={styles.tabLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  search: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 8px rgba(48, 48, 52, 0.06)',
  },
  capsule: {
    width: 160,
    height: 50,
    borderRadius: 100,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    boxShadow: '0px 2px 8px rgba(48, 48, 52, 0.06)',
  },
  capsuleHighlight: {
    borderRadius: 100,
    boxShadow: 'inset 1px 1px 2px rgba(255, 255, 255, 0.9), inset -1px -1px 2px rgba(48, 48, 52, 0.04)',
  },
  tab: {
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 6,
  },
  tabLabel: {
    fontFamily: fonts.label,
    fontSize: 12,
    lineHeight: 15,
    letterSpacing: -0.24,
    color: colors.ink,
  },
  add: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    transform: [{ scale: 0.95 }],
  },
});
