import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/BottomNav';
import { RioMap } from '@/components/map/RioMap';
import { colors, layout } from '@/theme';

// Screen 3 — the Rio map fills the screen; the nav floats over it.
export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <RioMap />
      <View
        pointerEvents="box-none"
        style={[
          styles.overlay,
          { paddingBottom: Math.max(insets.bottom, layout.homeIndicator) + layout.bottomPadding + 10 },
        ]}
      >
        <BottomNav />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.paper,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: layout.gutter,
  },
});
