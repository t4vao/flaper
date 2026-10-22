import { LinearGradient } from 'expo-linear-gradient';
import { type Ref, useEffect, useImperativeHandle, useState } from 'react';
import {
  Animated,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

import { HeartIcon, NavigationIcon, StarIcon } from '@/components/icons';
import { CategorySticker } from '@/components/place/CategorySticker';
import { PlacePhoto } from '@/components/place/PlacePhoto';
import { CATEGORY_LABEL, type Place } from '@/data/places';
import { colors, fonts } from '@/theme';

const NATIVE_DRIVER = Platform.OS !== 'web';

const PREVIEW_W = 248;
const PREVIEW_PHOTO_H = 196;
const PREVIEW_H = 264;
const TAIL_H = 12;
// Lets the map finish most of its ease towards the pin before the card pops out of it.
const APPEAR_DELAY = 160;

export type PlaceCardHandle = {
  // Animates the card back into its pin, then calls onClosed.
  dismiss: () => void;
};

type Props = {
  place: Place;
  // Screen y of the pin's tip; the card's tail points at it.
  anchorY: number;
  onClosed: () => void;
  ref?: Ref<PlaceCardHandle>;
};

// The pin opens into a photo preview; tapping the preview grows it into the full place card.
export function PlaceCard({ place, anchorY, onClosed, ref }: Props) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [appear] = useState(() => new Animated.Value(0));
  const [expand] = useState(() => new Animated.Value(0));
  const [expanded, setExpanded] = useState(false);
  const [fullText, setFullText] = useState(false);

  const expandedW = Math.min(width - 32, 420);
  const expandedH = Math.max(PREVIEW_H, Math.min(480, anchorY - TAIL_H - insets.top - 24));

  useEffect(() => {
    Animated.spring(appear, {
      toValue: 1,
      delay: APPEAR_DELAY,
      damping: 15,
      stiffness: 210,
      mass: 0.9,
      useNativeDriver: NATIVE_DRIVER,
    }).start();
  }, [appear]);

  useImperativeHandle(ref, () => ({
    dismiss: () =>
      Animated.timing(appear, { toValue: 0, duration: 160, useNativeDriver: NATIVE_DRIVER }).start(() => onClosed()),
  }));

  const open = () => {
    setExpanded(true);
    Animated.spring(expand, { toValue: 1, damping: 19, stiffness: 190, mass: 1, useNativeDriver: false }).start();
  };

  const appearStyle = {
    opacity: appear.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0, 1, 1] }),
    transform: [
      { translateY: appear.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) },
      { scale: appear.interpolate({ inputRange: [0, 1], outputRange: [0.25, 1] }) },
    ],
  };
  const sizeStyle = {
    width: expand.interpolate({ inputRange: [0, 1], outputRange: [PREVIEW_W, expandedW] }),
    height: expand.interpolate({ inputRange: [0, 1], outputRange: [PREVIEW_H, expandedH] }),
  };
  const previewOpacity = expand.interpolate({ inputRange: [0, 0.35], outputRange: [1, 0], extrapolate: 'clamp' });
  const detailOpacity = expand.interpolate({ inputRange: [0.35, 0.9], outputRange: [0, 1], extrapolate: 'clamp' });

  return (
    <View pointerEvents="box-none" style={[styles.stage, { height: anchorY }]}>
      <Animated.View style={[styles.lift, appearStyle]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={expanded ? undefined : `Abrir ${place.name}`}
          disabled={expanded}
          onPress={open}
        >
          <Animated.View style={[styles.card, sizeStyle]}>
            <Animated.View pointerEvents="none" style={[styles.layer, { opacity: previewOpacity }]}>
              <Preview place={place} />
            </Animated.View>
            <Animated.View
              pointerEvents={expanded ? 'auto' : 'none'}
              style={[styles.layer, { width: expandedW, height: expandedH, opacity: detailOpacity }]}
            >
              <Detail place={place} fullText={fullText} onToggleText={() => setFullText((v) => !v)} />
            </Animated.View>
          </Animated.View>
        </Pressable>

        <View pointerEvents="none" style={styles.sticker}>
          <CategorySticker category={place.category} large />
        </View>
        {/* Wrapped in a View so on web it stacks above the card's shadow. */}
        <View style={styles.tail}>
          <Svg width={26} height={TAIL_H} viewBox="0 0 26 12">
            <Path d="M0 0h26L15.4 10.8a3.4 3.4 0 0 1-4.8 0z" fill={colors.white} />
          </Svg>
        </View>
      </Animated.View>
    </View>
  );
}

function Preview({ place }: { place: Place }) {
  return (
    <>
      <View style={styles.previewPhoto}>
        <PlacePhoto uri={place.reviews[0].photo} style={StyleSheet.absoluteFill} />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.72)']}
          start={{ x: 0.5, y: 0.35 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.previewCaption}>
          <Text style={styles.previewName} numberOfLines={1}>
            {place.name}
          </Text>
          <Text style={styles.previewTagline} numberOfLines={1}>
            {place.tagline}
          </Text>
        </View>
      </View>
      <View style={styles.previewMeta}>
        <Meta place={place} />
      </View>
    </>
  );
}

function Detail({ place, fullText, onToggleText }: { place: Place; fullText: boolean; onToggleText: () => void }) {
  const [lng, lat] = place.lngLat;
  const route = () => Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);

  return (
    <View style={styles.detail}>
      <ScrollView style={styles.detailScroll} contentContainerStyle={styles.detailContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.detailName}>{place.name}</Text>
        <Text style={styles.address}>
          {place.address} · {place.neighborhood}
        </Text>
        <Meta place={place} />
        {place.when && <Text style={styles.when}>{place.when}</Text>}

        <Text style={styles.description} numberOfLines={fullText ? undefined : 3}>
          {place.description}
        </Text>
        <Pressable onPress={onToggleText} hitSlop={8}>
          <Text style={styles.more}>{fullText ? 'Ver menos' : 'Ver mais'}</Text>
        </Pressable>

        <Text style={styles.section}>Avaliações com foto</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.reviews}>
          {place.reviews.map((review) => (
            <View key={review.author} style={styles.review}>
              <PlacePhoto uri={review.photo} style={styles.reviewPhoto} />
              <View style={styles.reviewHead}>
                <Text style={styles.reviewAuthor} numberOfLines={1}>
                  {review.author}
                </Text>
                <StarIcon size={11} color={colors.ink} fill={colors.butter} strokeWidth={1.5} />
                <Text style={styles.reviewAuthor}>{review.rating}</Text>
              </View>
              <Text style={styles.reviewText} numberOfLines={2}>
                {review.text}
              </Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.counts}>
          <HeartIcon size={15} color={colors.ink} fill={colors.lavender} />
          <Text style={styles.count}>{place.likes}</Text>
          <Text style={styles.countMuted}>· {place.reviewCount} avaliações</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={route}
          style={({ pressed }) => [styles.routeButton, pressed && styles.pressed]}
        >
          <NavigationIcon size={14} color={colors.white} />
          <Text style={styles.routeLabel}>Abrir rota</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Meta({ place }: { place: Place }) {
  return (
    <View style={styles.meta}>
      <StarIcon size={13} color={colors.ink} fill={colors.butter} strokeWidth={1.5} />
      <Text style={styles.metaStrong}>{place.rating.toFixed(1)}</Text>
      <Text style={styles.metaText}>
        · {CATEGORY_LABEL[place.category]} · {place.neighborhood}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  lift: {
    alignItems: 'center',
    transformOrigin: 'bottom',
  },
  card: {
    borderRadius: 28,
    backgroundColor: colors.white,
    overflow: 'hidden',
    boxShadow: '0px 14px 40px rgba(0, 0, 0, 0.5)',
  },
  layer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  sticker: {
    position: 'absolute',
    top: -14,
    transform: [{ rotate: '-4deg' }],
  },
  tail: {
    marginTop: -1,
  },

  previewPhoto: {
    height: PREVIEW_PHOTO_H,
    margin: 6,
    borderRadius: 22,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  previewCaption: {
    padding: 14,
    gap: 2,
  },
  previewName: {
    fontFamily: fonts.logo,
    fontSize: 28,
    lineHeight: 30,
    letterSpacing: -0.8,
    color: colors.white,
  },
  previewTagline: {
    fontFamily: fonts.label,
    fontSize: 12,
    lineHeight: 15,
    color: 'rgba(255, 255, 255, 0.82)',
  },
  previewMeta: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaStrong: {
    fontFamily: fonts.label,
    fontSize: 13,
    color: colors.ink,
  },
  metaText: {
    fontFamily: fonts.label,
    fontSize: 13,
    color: colors.muted,
  },

  detail: {
    flex: 1,
  },
  detailScroll: {
    flex: 1,
  },
  detailContent: {
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 12,
    gap: 6,
  },
  detailName: {
    fontFamily: fonts.logo,
    fontSize: 34,
    lineHeight: 36,
    letterSpacing: -1,
    color: colors.ink,
  },
  address: {
    fontFamily: fonts.label,
    fontSize: 12,
    color: colors.muted,
    marginBottom: 2,
  },
  when: {
    fontFamily: fonts.label,
    fontSize: 13,
    color: colors.ink,
    alignSelf: 'flex-start',
    backgroundColor: colors.paper,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    overflow: 'hidden',
    marginTop: 4,
  },
  description: {
    fontFamily: fonts.label,
    fontSize: 14,
    lineHeight: 20,
    color: colors.graphite,
    marginTop: 8,
  },
  more: {
    fontFamily: fonts.label,
    fontSize: 13,
    color: '#7B5CE0',
  },
  section: {
    fontFamily: fonts.label,
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
    color: colors.muted,
    marginTop: 14,
  },
  reviews: {
    gap: 10,
    paddingTop: 4,
  },
  review: {
    width: 150,
    gap: 4,
  },
  reviewPhoto: {
    width: 150,
    height: 112,
    borderRadius: 16,
    overflow: 'hidden',
  },
  reviewHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  reviewAuthor: {
    fontFamily: fonts.label,
    fontSize: 12,
    color: colors.ink,
    flexShrink: 1,
  },
  reviewText: {
    fontFamily: fonts.label,
    fontSize: 12,
    lineHeight: 16,
    color: colors.muted,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(48, 48, 52, 0.12)',
  },
  counts: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  count: {
    fontFamily: fonts.label,
    fontSize: 13,
    color: colors.ink,
  },
  countMuted: {
    fontFamily: fonts.label,
    fontSize: 13,
    color: colors.muted,
  },
  routeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 100,
    backgroundColor: colors.ink,
  },
  routeLabel: {
    fontFamily: fonts.label,
    fontSize: 14,
    color: colors.white,
  },
  pressed: {
    transform: [{ scale: 0.96 }],
  },
});
