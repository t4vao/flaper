import type { BottomTabBarProps } from 'expo-router/tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NavExploreIcon, NavHomeIcon, NavProfileIcon, PlusIcon } from '@/components/icons';
import { colors, layout } from '@/theme';

const BAR_HEIGHT = 56;
const ITEM = 44;

// Distance from the screen's bottom edge to the bar's bottom edge.
function useBarOffset() {
  const insets = useSafeAreaInsets();
  return Math.max(insets.bottom, layout.homeIndicator) + layout.bottomPadding - 12;
}

// Bottom padding a scrolling screen needs so its last item clears the floating bar.
export function useNavClearance() {
  return useBarOffset() + BAR_HEIGHT + 24;
}

// Floating, icon-only nav: Início · Explorar · Perfil. Labels stay for screen readers.
export function FloatingNav({ state, descriptors, navigation, onRegister }: BottomTabBarProps & { onRegister?: () => void }) {
  const bottom = useBarOffset();
  const canRegister = Boolean(onRegister);

  return (
    <View pointerEvents="box-none" style={[styles.dock, { paddingBottom: bottom }]}>
      <View style={styles.controls}>
        <View accessibilityRole="tablist" accessibilityLabel="Navegação principal" style={styles.bar}>
          <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.highlight]} />
          {state.routes.map((route, index) => {
            const focused = state.index === index;
            const options = descriptors[route.key].options;
            const label = options.tabBarAccessibilityLabel ?? options.title ?? route.name;
            const iconColors = focused
              ? { primary: colors.navIconSelected, secondary: colors.navIconSelected }
              : undefined;

            const onPress = () => {
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              if (!focused && !event.defaultPrevented) navigation.navigate(route.name, route.params);
            };

            return (
              <Pressable
                key={route.key}
                accessibilityRole="tab"
                accessibilityLabel={label}
                accessibilityState={{ selected: focused }}
                onPress={onPress}
                onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })}
                style={({ pressed }) => [styles.item, pressed && styles.pressed]}
              >
                <View style={styles.glyph}>
                  {route.name === 'index' ? (
                    <NavHomeIcon {...iconColors} filled={focused} />
                  ) : route.name === 'perfil' ? (
                    <NavProfileIcon {...iconColors} filled={focused} />
                  ) : (
                    <NavExploreIcon {...iconColors} filled={focused} />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Registrar visita"
          accessibilityHint={canRegister ? undefined : 'O registro de visitas ainda não está disponível.'}
          accessibilityState={{ disabled: !canRegister }}
          disabled={!canRegister}
          onPress={onRegister}
          style={({ pressed }) => [styles.register, !canRegister && styles.disabled, pressed && styles.pressed]}
        >
          <LinearGradient
            colors={[colors.sky, colors.lavender, colors.butter]}
            locations={[0, 0.5, 1]}
            start={{ x: 0.3, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View>
            <PlusIcon size={22} strokeWidth={1.5} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  register: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0px 2px 8px ${colors.navActionShadow}`,
  },
  // The tint keeps outline icons readable even when the content behind it is black.
  // Web adds blur; native and browsers without backdrop-filter retain the tint.
  bar: {
    height: BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 6,
    borderRadius: 100,
    backgroundColor: colors.navGlass,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.navGlassBorder,
    boxShadow: `0px 6px 24px ${colors.navShadow}`,
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(18px)' } as object) : null),
  },
  highlight: {
    borderRadius: 100,
    boxShadow: `inset 1px 1px 2px ${colors.navHighlight}, inset -1px -1px 2px ${colors.navInsetShadow}`,
  },
  item: {
    width: ITEM,
    height: ITEM,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ITEM / 2,
  },
  glyph: {
    width: ITEM,
    height: ITEM,
    borderRadius: ITEM / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
});
