import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import { PIN_FOCUS_RATIO } from '@/components/map/config';
import { RioMap } from '@/components/map/RioMap';
import { PlaceCard, type PlaceCardHandle } from '@/components/place/PlaceCard';
import { PLACES } from '@/data/places';
import { colors } from '@/theme';

// Explorar — the Rio map fills the screen; the shared nav floats over it.
// Tapping a photo pin opens its card right where the map brings the pin to rest.
// `?place=<id>` (from a home tile) opens straight onto that place.
export default function ExploreScreen() {
  const { height } = useWindowDimensions();
  const { place } = useLocalSearchParams<{ place?: string }>();
  const [selectedId, setSelectedId] = useState<string | null>(place ?? null);
  const [openedFrom, setOpenedFrom] = useState(place);
  const card = useRef<PlaceCardHandle>(null);

  // A new `place` param (another home tile) selects that place.
  if (place !== openedFrom) {
    setOpenedFrom(place);
    if (place) setSelectedId(place);
  }

  const selected = PLACES.find((p) => p.id === selectedId);
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.night,
  },
});
