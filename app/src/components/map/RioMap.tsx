import { Camera, type CameraRef, Map, Marker } from '@maplibre/maplibre-react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  DETAIL_ZOOM,
  FOCUS_DURATION,
  FOCUS_ZOOM,
  MAP_STYLE,
  PIN_FOCUS_RATIO,
  RIO_BOUNDS,
  RIO_CENTER,
  RIO_ZOOM,
} from '@/components/map/config';
import { PlacePin } from '@/components/map/PlacePin';
import type { RioMapProps } from '@/components/map/types';

// A pin tap can also reach the map's own onPress; ignore map taps right after one.
const PIN_TAP_GRACE = 400;

export function RioMap({ places, selectedId, onSelectPlace, onPressMap, onUserGesture }: RioMapProps) {
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const camera = useRef<CameraRef>(null);
  const zoom = useRef(RIO_ZOOM);
  const lastPinTap = useRef(0);
  const [detailed, setDetailed] = useState(RIO_ZOOM >= DETAIL_ZOOM);

  // Bring the selected place to the focus point where its card opens.
  useEffect(() => {
    const place = places.find((p) => p.id === selectedId);
    if (!place) return;
    camera.current?.easeTo({
      center: place.lngLat,
      zoom: Math.max(zoom.current, FOCUS_ZOOM),
      // Top padding moves the visual centre down to PIN_FOCUS_RATIO of the screen height.
      padding: { top: height * (2 * PIN_FOCUS_RATIO - 1), right: 0, bottom: 0, left: 0 },
      duration: FOCUS_DURATION,
    });
  }, [selectedId, places, height]);

  const trackZoom = (next: number) => {
    zoom.current = next;
    setDetailed(next >= DETAIL_ZOOM);
  };

  const selectPin = useCallback(
    (id: string) => {
      lastPinTap.current = Date.now();
      onSelectPlace(id);
    },
    [onSelectPlace],
  );

  return (
    <Map
      style={StyleSheet.absoluteFill}
      mapStyle={MAP_STYLE}
      logo={false}
      compass={false}
      // The provider requires attribution; top-right keeps it clear of the floating nav.
      attribution
      attributionPosition={{ top: insets.top + 8, right: 8 }}
      onPress={() => {
        if (Date.now() - lastPinTap.current > PIN_TAP_GRACE) onPressMap();
      }}
      onRegionWillChange={(e) => {
        if (e.nativeEvent.userInteraction) onUserGesture();
      }}
      onRegionIsChanging={(e) => trackZoom(e.nativeEvent.zoom)}
      onRegionDidChange={(e) => trackZoom(e.nativeEvent.zoom)}
    >
      <Camera
        ref={camera}
        initialViewState={{ center: RIO_CENTER, zoom: RIO_ZOOM }}
        maxBounds={RIO_BOUNDS}
        minZoom={10}
      />
      {places.map((place) => (
        <Marker key={place.id} id={place.id} lngLat={place.lngLat} anchor="bottom" onPress={() => selectPin(place.id)}>
          <PlacePin
            place={place}
            detailed={detailed}
            hidden={place.id === selectedId}
            onPress={() => selectPin(place.id)}
          />
        </Marker>
      ))}
    </Map>
  );
}
