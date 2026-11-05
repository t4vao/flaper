import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavClearance } from '@/components/FloatingNav';
import { type HomeTab, HomeTabs } from '@/components/home/HomeTabs';
import { PlaceRail } from '@/components/home/PlaceRail';
import { VisitCard } from '@/components/home/VisitCard';
import { PillButton } from '@/components/PillButton';
import { FRIEND_VISITS, HOME_SECTIONS } from '@/data/demo';
import { colors, fonts, layout } from '@/theme';

// Início. Para você works with no connections at all; Amigos is the feed of people you follow.
// `?amigos=vazio` previews the feed before following anyone.
export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const clearance = useNavClearance();
  const { amigos } = useLocalSearchParams<{ amigos?: string }>();
  const [tab, setTab] = useState<HomeTab>('para-voce');

  const visits = amigos === 'vazio' ? [] : FRIEND_VISITS;
  const openPlace = (place: string) => router.navigate({ pathname: '/explorar', params: { place } });

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 14, paddingBottom: clearance }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.top}>
          <HomeTabs value={tab} onChange={setTab} />
        </View>

        {tab === 'para-voce' ? (
          <View style={styles.sections}>
            {HOME_SECTIONS.map((section) => (
              <PlaceRail key={section.id} section={section} onOpen={openPlace} />
            ))}
          </View>
        ) : visits.length > 0 ? (
          <View style={styles.feed}>
            {visits.map((visit) => (
              <VisitCard key={visit.id} visit={visit} onOpenPlace={() => openPlace(visit.place.id)} />
            ))}
          </View>
        ) : (
          <NoFriendsYet onBrowse={() => setTab('para-voce')} />
        )}
      </ScrollView>
    </View>
  );
}

function NoFriendsYet({ onBrowse }: { onBrowse: () => void }) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>Seus amigos ainda não estão por aqui</Text>
      <Text style={styles.emptyBody}>
        Convide quem sempre indica lugares para você. As visitas deles vão aparecer neste feed.
      </Text>
      <View style={styles.emptyActions}>
        <PillButton variant="dark" label="Convidar amigos" />
        <PillButton variant="light" label="Ver sugestões no Rio" onPress={onBrowse} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    gap: 30,
  },
  top: {
    gap: 22,
    paddingHorizontal: layout.gutter,
  },
  sections: {
    gap: 34,
  },
  feed: {
    gap: 40,
    paddingHorizontal: layout.gutter,
  },
  empty: {
    gap: 12,
    paddingHorizontal: layout.gutter,
    paddingTop: 24,
  },
  emptyTitle: {
    fontFamily: fonts.display,
    fontSize: 34,
    lineHeight: 38,
    letterSpacing: -0.6,
    color: colors.ink,
  },
  emptyBody: {
    fontFamily: fonts.label,
    fontSize: 14,
    lineHeight: 20,
    color: colors.graphite,
  },
  emptyActions: {
    gap: 10,
    marginTop: 12,
  },
});
