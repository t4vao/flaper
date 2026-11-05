import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@/components/Avatar';
import { BookmarkIcon, HeartIcon } from '@/components/icons';
import { PlacePhoto } from '@/components/place/PlacePhoto';
import { StarRating } from '@/components/StarRating';
import { type FriendVisit, visitDateLabel } from '@/data/demo';
import { colors, fonts } from '@/theme';

// One visit in the Amigos feed: who, where and when first; rating, photo and text only when present.
export function VisitCard({ visit, onOpenPlace }: { visit: FriendVisit; onOpenPlace: () => void }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.byline}>
        <Avatar handle={visit.author} size={32} />
        <View style={styles.bylineText}>
          <Text style={styles.author} numberOfLines={1}>
            {visit.author}
          </Text>
          <Text style={styles.date}>{visitDateLabel(visit.date)}</Text>
        </View>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel={`Ver ${visit.place.name} no mapa`} onPress={onOpenPlace}>
        {visit.photo && <PlacePhoto uri={visit.photo} style={styles.photo} />}
        <Text style={styles.place} numberOfLines={2}>
          {visit.place.name}
        </Text>
        <Text style={styles.where} numberOfLines={1}>
          {visit.place.neighborhood}
        </Text>
      </Pressable>

      {visit.rating !== undefined && <StarRating value={visit.rating} />}
      {visit.text && (
        <Text style={styles.text} numberOfLines={3}>
          {visit.text}
        </Text>
      )}

      <View style={styles.actions}>
        <Action
          label="Curtir"
          active={liked}
          onPress={() => setLiked((v) => !v)}
          icon={<HeartIcon size={17} fill={liked ? colors.lavender : 'none'} />}
        />
        <Action
          label={saved ? 'Em Quero ir' : 'Quero ir'}
          active={saved}
          onPress={() => setSaved((v) => !v)}
          icon={<BookmarkIcon size={17} fill={saved ? colors.butter : 'none'} />}
        />
      </View>
    </View>
  );
}

function Action({
  label,
  active,
  icon,
  onPress,
}: {
  label: string;
  active: boolean;
  icon: React.ReactNode;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => [styles.action, active && styles.actionActive, pressed && styles.pressed]}
    >
      {icon}
      <Text style={styles.actionLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 10,
  },
  byline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bylineText: {
    flex: 1,
  },
  author: {
    fontFamily: fonts.label,
    fontSize: 13,
    lineHeight: 16,
    color: colors.ink,
  },
  date: {
    fontFamily: fonts.label,
    fontSize: 12,
    lineHeight: 15,
    color: colors.muted,
  },
  photo: {
    width: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: colors.paper,
    marginBottom: 12,
  },
  place: {
    fontFamily: fonts.display,
    fontSize: 28,
    lineHeight: 31,
    letterSpacing: -0.4,
    color: colors.ink,
  },
  where: {
    fontFamily: fonts.label,
    fontSize: 12,
    lineHeight: 15,
    color: colors.muted,
    marginTop: 2,
  },
  text: {
    fontFamily: fonts.label,
    fontSize: 14,
    lineHeight: 20,
    color: colors.graphite,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 100,
    backgroundColor: colors.paper,
  },
  actionActive: {
    backgroundColor: colors.white,
    boxShadow: 'inset 0px 0px 0px 1px rgba(48, 48, 52, 0.14)',
  },
  actionLabel: {
    fontFamily: fonts.label,
    fontSize: 13,
    color: colors.ink,
  },
  pressed: {
    transform: [{ scale: 0.96 }],
  },
});
