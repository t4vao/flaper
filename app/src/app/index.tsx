import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomNav } from '@/components/BottomNav';
import { PIN_FOCUS_RATIO } from '@/components/map/config';
import { RioMap } from '@/components/map/RioMap';
import { PlaceCard, type PlaceCardHandle } from '@/components/place/PlaceCard';
import { PLACES } from '@/data/places';
import { colors, layout } from '@/theme';

// Screen 3 — the Rio map fills the screen; the nav floats over it.
// Tapping a photo pin opens its card right where the map brings the pin to rest.
export default function MapScreen() {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const card = useRef<PlaceCardHandle>(null);

  const selected = PLACES.find((place) => place.id === selectedId);
  const closeCard = useCallback(() => card.current?.dismiss(), []);

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <RioMap
        places={PLACES}
        selectedId={selectedId}
        onSelectPlace={setSelectedId}
        onPressMap={closeCard}
        onUserGesture={closeCard}
      />
      {selected && (
        <PlaceCard
          key={selected.id}
          ref={card}
          place={selected}
          anchorY={Math.round(height * PIN_FOCUS_RATIO)}
          // Another pin may have been chosen while this card was closing.
          onClosed={() => setSelectedId((id) => (id === selected.id ? null : id))}
        />
      )}
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
    backgroundColor: colors.night,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: layout.gutter,
  },
});
