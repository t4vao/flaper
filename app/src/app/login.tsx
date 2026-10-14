import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Logo } from '@/components/Logo';
import { PillButton } from '@/components/PillButton';
import { colors, layout } from '@/theme';

// Screen 1 — brand + sign-in. Opened over the map when someone tries to save a place.
export default function Login() {
  const insets = useSafeAreaInsets();
  // Auth isn't wired yet; both buttons just return to where the person was.
  const enter = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, layout.homeIndicator) + layout.bottomPadding },
      ]}
    >
      <StatusBar style="light" />

      <View style={styles.content}>
        <Logo />
      </View>

      <View style={styles.actions}>
        <PillButton variant="light" label="Continuar com Google" onPress={enter} />
        <PillButton variant="dark" label="Continuar com Apple" onPress={enter} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.ink,
    paddingHorizontal: layout.gutter,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -3 }], // Figma "Frame 1": calc(50% - 351px/2 - 3px)
  },
  actions: {
    gap: 10,
  },
});
