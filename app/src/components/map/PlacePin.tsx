import { useEffect, useState } from 'react';
import { Animated, Platform, Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { CategorySticker } from '@/components/place/CategorySticker';
import { PlacePhoto } from '@/components/place/PlacePhoto';
import type { Place } from '@/data/places';
import { colors } from '@/theme';

const PHOTO = 48;
const RING = 3;
const COMPACT = 26;
const NATIVE_DRIVER = Platform.OS !== 'web';

// Stickers lean a little, alternating per place, like they were stuck on by hand.
const TILTS = ['-7deg', '5deg', '-3deg', '8deg', '-5deg'];
function tiltFor(id: string) {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return TILTS[Math.abs(hash) % TILTS.length];
}

type Props = {
  place: Place;
  // Zoomed in: full-size photo with its category sticker. Zoomed out: a small photo dot.
  detailed: boolean;
  // The selected pin hides while its card is open, so the card reads as the pin opening up.
  hidden: boolean;
  onPress: () => void;
};

// Anchored by its bottom edge (the tail tip) on the place's coordinate.
export function PlacePin({ place, detailed, hidden, onPress }: Props) {
  const [zoomIn] = useState(() => new Animated.Value(detailed ? 1 : 0));

  useEffect(() => {
    Animated.spring(zoomIn, {
      toValue: detailed ? 1 : 0,
      damping: 14,
      stiffness: 200,
      mass: 0.8,
      useNativeDriver: NATIVE_DRIVER,
    }).start();
  }, [detailed, zoomIn]);

  const scale = zoomIn.interpolate({ inputRange: [0, 1], outputRange: [COMPACT / (PHOTO + RING * 2), 1] });
  const stickerScale = zoomIn.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0.4, 0.8, 1] });

  return (
    <View style={styles.box} pointerEvents="box-none">
      <Animated.View
        pointerEvents={hidden ? 'none' : 'box-none'}
        style={[styles.pin, { opacity: hidden ? 0 : 1, transform: [{ scale }] }]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${place.name}, ${place.neighborhood}`}
          onPress={onPress}
          hitSlop={4}
          style={styles.pressable}
        >
          <Animated.View
            style={[styles.sticker, { opacity: zoomIn, transform: [{ rotate: tiltFor(place.id) }, { scale: stickerScale }] }]}
          >
            <CategorySticker category={place.category} />
          </Animated.View>
          <View style={styles.ring}>
            <PlacePhoto uri={place.reviews[0].photo} style={styles.photo} />
          </View>
          <Animated.View style={{ opacity: zoomIn }}>
            <Svg width={14} height={7} viewBox="0 0 14 7">
              <Path d="M0 0h14L8.2 6.2a1.6 1.6 0 0 1-2.4 0z" fill={colors.white} />
            </Svg>
          </Animated.View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Wide enough that the tilted sticker is never clipped by the native marker view.
  box: {
    width: 96,
    alignItems: 'center',
  },
  pin: {
    alignItems: 'center',
    transformOrigin: 'bottom',
  },
  pressable: {
    alignItems: 'center',
  },
  sticker: {
    marginBottom: -9,
    zIndex: 1,
  },
  ring: {
    width: PHOTO + RING * 2,
    height: PHOTO + RING * 2,
    borderRadius: (PHOTO + RING * 2) / 2,
    padding: RING,
    backgroundColor: colors.white,
    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.45)',
  },
  photo: {
    width: PHOTO,
    height: PHOTO,
    borderRadius: PHOTO / 2,
    overflow: 'hidden',
  },
});
