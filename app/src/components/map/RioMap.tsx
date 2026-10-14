import { Camera, Map } from '@maplibre/maplibre-react-native';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MAP_STYLE, RIO_BOUNDS, RIO_CENTER, RIO_ZOOM } from '@/components/map/config';

export function RioMap() {
  const insets = useSafeAreaInsets();

  return (
    <Map
      style={StyleSheet.absoluteFill}
      mapStyle={MAP_STYLE}
      logo={false}
      compass={false}
      // The provider requires attribution; top-right keeps it clear of the floating nav.
      attribution
      attributionPosition={{ top: insets.top + 8, right: 8 }}
    >
      <Camera
        initialViewState={{ center: RIO_CENTER, zoom: RIO_ZOOM }}
        maxBounds={RIO_BOUNDS}
        minZoom={10}
      />
    </Map>
  );
}
