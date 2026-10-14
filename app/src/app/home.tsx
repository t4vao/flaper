import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/BottomNav';
import { colors, layout } from '@/theme';

// Screen 3 — empty canvas (the map goes here) with the floating nav.
export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: insets.top, paddingBottom: Math.max(insets.bottom, layout.homeIndicator) + layout.bottomPadding + 10 },
      ]}
    >
      <StatusBar style="dark" />
      <View style={styles.content} />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.paper,
    paddingHorizontal: layout.gutter,
  },
  content: {
    flex: 1,
  },
});
