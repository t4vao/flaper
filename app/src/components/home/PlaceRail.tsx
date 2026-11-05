import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { PlacePhoto } from '@/components/place/PlacePhoto';
import type { HomeSection, HomeTile } from '@/data/demo';
import { colors, fonts, layout } from '@/theme';

const TILE = 112;
const GAP = 10;

// A section of the Para você tab: serif title, then a sideways rail of square photo tiles.
export function PlaceRail({ section, onOpen }: { section: HomeSection; onOpen: (placeId: string) => void }) {
  return (
    <View style={styles.section}>
      <Text accessibilityRole="header" style={styles.title}>
        {section.title}
      </Text>
      <FlatList
        horizontal
        data={section.tiles}
        keyExtractor={(tile) => tile.place.id}
        renderItem={({ item }) => <Tile tile={item} onPress={() => onOpen(item.place.id)} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rail}
        snapToInterval={TILE + GAP}
        decelerationRate="fast"
      />
    </View>
  );
}

function Tile({ tile, onPress }: { tile: HomeTile; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${tile.place.name}, ${tile.meta}`}
      onPress={onPress}
      style={({ pressed }) => [styles.tile, pressed && styles.pressed]}
    >
      <PlacePhoto uri={tile.place.reviews[0].photo} style={styles.photo} />
      <Text style={styles.name} numberOfLines={1}>
        {tile.place.name}
      </Text>
      <Text style={styles.meta} numberOfLines={1}>
        {tile.meta}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 38,
    letterSpacing: -0.6,
    color: colors.ink,
    paddingHorizontal: layout.gutter,
  },
  rail: {
    gap: GAP,
    paddingHorizontal: layout.gutter,
  },
  tile: {
    width: TILE,
  },
  photo: {
    width: TILE,
    height: TILE,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.paper,
  },
  name: {
    fontFamily: fonts.display,
    fontSize: 16,
    lineHeight: 20,
    color: colors.ink,
    marginTop: 8,
  },
  meta: {
    fontFamily: fonts.label,
    fontSize: 11,
    lineHeight: 14,
    color: colors.muted,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
});
