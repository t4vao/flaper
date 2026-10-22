import 'maplibre-gl/dist/maplibre-gl.css';

import { Map as MapLibreMap, type MapLibreEvent, Marker } from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { StyleSheet, View } from 'react-native';

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
import { colors } from '@/theme';

// Web preview of the same map, so the app can be checked on localhost.
// Each pin is a maplibre Marker whose element hosts the shared PlacePin through a portal.
export function RioMap({ places, selectedId, onSelectPlace, onPressMap, onUserGesture }: RioMapProps) {
  const container = useRef<View>(null);
  const map = useRef<MapLibreMap | null>(null);
  // One element per place; the effect below hands each to a maplibre Marker.
  const [anchors] = useState(() =>
    Object.fromEntries(places.map((place) => [place.id, document.createElement('div')] as const)),
  );
  const [detailed, setDetailed] = useState(RIO_ZOOM >= DETAIL_ZOOM);

  // Map listeners are bound once; read the latest callbacks through a ref.
  const handlers = useRef({ onPressMap, onUserGesture });
  useEffect(() => {
    handlers.current = { onPressMap, onUserGesture };
  }, [onPressMap, onUserGesture]);

  useEffect(() => {
    const instance = new MapLibreMap({
      container: container.current as unknown as HTMLElement,
      style: MAP_STYLE,
      center: RIO_CENTER,
      zoom: RIO_ZOOM,
      minZoom: 10,
      maxBounds: RIO_BOUNDS,
      attributionControl: { compact: true },
    });
    map.current = instance;

    for (const place of places) {
      new Marker({ element: anchors[place.id], anchor: 'bottom' }).setLngLat(place.lngLat).addTo(instance);
    }

    instance.on('zoom', () => setDetailed(instance.getZoom() >= DETAIL_ZOOM));
    // Only gestures carry an originalEvent; our own easeTo doesn't.
    const gesture = (e: MapLibreEvent<unknown>) => {
      if (e.originalEvent) handlers.current.onUserGesture();
    };
    instance.on('dragstart', gesture);
    instance.on('zoomstart', gesture);
    instance.on('click', (e) => {
      if ((e.originalEvent.target as HTMLElement).closest('.maplibregl-marker')) return;
      handlers.current.onPressMap();
    });

    return () => {
      instance.remove();
      map.current = null;
    };
  }, [places, anchors]);

  // Bring the selected place to the focus point where its card opens.
  useEffect(() => {
    const instance = map.current;
    const place = places.find((p) => p.id === selectedId);
    if (!instance || !place) return;
    instance.easeTo({
      center: place.lngLat,
      zoom: Math.max(instance.getZoom(), FOCUS_ZOOM),
      offset: [0, instance.getContainer().clientHeight * (PIN_FOCUS_RATIO - 0.5)],
      duration: FOCUS_DURATION,
    });
  }, [selectedId, places]);

  // maplibre-gl.css forces `position: relative` on the container, so it can't be the absolute layer itself.
  return (
    <View style={StyleSheet.absoluteFill}>
      <View ref={container} style={styles.fill} />
      {places.map((place) =>
        createPortal(
          <PlacePin
            place={place}
            detailed={detailed}
            hidden={place.id === selectedId}
            onPress={() => onSelectPlace(place.id)}
          />,
          anchors[place.id],
          place.id,
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: colors.night,
  },
});
