import 'maplibre-gl/dist/maplibre-gl.css';

import { Map as MapLibreMap } from 'maplibre-gl';
import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { MAP_STYLE, RIO_BOUNDS, RIO_CENTER, RIO_ZOOM } from '@/components/map/config';

// Web preview of the same map, so the app can be checked on localhost.
export function RioMap() {
  const container = useRef<View>(null);

  useEffect(() => {
    const map = new MapLibreMap({
      container: container.current as unknown as HTMLElement,
      style: MAP_STYLE,
      center: RIO_CENTER,
      zoom: RIO_ZOOM,
      minZoom: 10,
      maxBounds: RIO_BOUNDS,
      attributionControl: { compact: true },
    });
    return () => map.remove();
  }, []);

  // maplibre-gl.css forces `position: relative` on the container, so it can't be the absolute layer itself.
  return (
    <View style={StyleSheet.absoluteFill}>
      <View ref={container} style={styles.fill} />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
