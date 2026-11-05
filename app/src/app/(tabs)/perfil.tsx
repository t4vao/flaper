import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useNavClearance } from '@/components/FloatingNav';
import { ProfileRow } from '@/components/profile/ProfileRow';
import { ProgressAvatar } from '@/components/profile/ProgressAvatar';
import { STEP_CARD_WIDTH, StepCard } from '@/components/profile/StepCard';
import {
  CameraSticker,
  CitySticker,
  ContributionSticker,
  DiarySticker,
  FollowingSticker,
  GearGlyph,
  InviteSticker,
  ListsSticker,
  NeighborhoodSticker,
  PencilGlyph,
  WantToGoSticker,
} from '@/components/stickers';
import { ME, MY_PROFILE, profileCompletion } from '@/data/demo';
import { colors, fonts, layout } from '@/theme';

// Meu perfil: identity and completion up top, next steps, then the person's own collections.
// Counts come from demo data until accounts exist; actions without a backend stay inert.
export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const clearance = useNavClearance();
  const percent = profileCompletion();

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: clearance }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View
            accessible
            accessibilityLabel={`${MY_PROFILE.contributions} lugares que você colocou no mapa`}
            style={styles.contribPill}
          >
            <ContributionSticker size={24} />
            <Text style={styles.contribCount}>{MY_PROFILE.contributions}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Configurações"
            hitSlop={4}
            style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
          >
            <GearGlyph />
          </Pressable>
        </View>

        <View style={styles.identity}>
          <Text accessibilityRole="header" style={styles.name}>
            {ME.name}
          </Text>
          <Text style={styles.handle}>{ME.handle}</Text>
        </View>

        <View style={styles.avatar}>
          <ProgressAvatar handle={ME.handle} percent={percent} />
        </View>

        <View style={styles.completeWrap}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Completar perfil"
            style={({ pressed }) => [styles.completeButton, pressed && styles.pressed]}
          >
            <PencilGlyph />
            <Text style={styles.completeLabel}>Completar perfil</Text>
          </Pressable>
          <View pointerEvents="none" style={styles.completeDot} />
        </View>

        <View style={styles.sectionHead}>
          <Text accessibilityRole="header" style={styles.sectionTitle}>
            Próximos passos
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ver todos os passos"
            style={({ pressed }) => [styles.seeAll, pressed && styles.pressed]}
          >
            <Text style={styles.seeAllLabel}>Ver tudo</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cards}
          snapToInterval={STEP_CARD_WIDTH + 12}
          decelerationRate="fast"
        >
          <StepCard
            sticker={<CameraSticker size={56} tone="brand" />}
            title="Foto de perfil"
            body="Mostre quem está por trás das suas visitas."
            action="Escolher foto"
          />
          <StepCard
            sticker={<ContributionSticker size={56} tone="brand" />}
            title="Coloque um lugar no mapa"
            body="Sugira um lugar que falta. A primeira aprovação vira conquista."
            action="Sugerir lugar"
          />
          <StepCard
            sticker={<InviteSticker size={56} tone="brand" />}
            title="Chame seus amigos"
            body="Seu convite pessoal libera a entrada deles no beta."
            action="Copiar convite"
          />
        </ScrollView>

        <View style={styles.rows}>
          <ProfileRow sticker={<DiarySticker />} label="Diário" count={MY_PROFILE.visits} />
          <Divider />
          <ProfileRow sticker={<WantToGoSticker />} label="Quero ir" count={MY_PROFILE.wantToGo} />
          <Divider />
          <ProfileRow sticker={<ListsSticker />} label="Listas" count={MY_PROFILE.lists} />
          <Divider />
          <ProfileRow sticker={<FollowingSticker />} label="Seguindo" count={MY_PROFILE.following} />
          <Divider />
          <ProfileRow
            sticker={<ContributionSticker />}
            label="Contribuições"
            count={MY_PROFILE.contributions}
            unread={MY_PROFILE.newApproval ? 'nova aprovação' : undefined}
          />
        </View>

        <View style={styles.tiles}>
          <StatTile sticker={<DiarySticker size={34} />} value={MY_PROFILE.visits} label="visitas" />
          <StatTile sticker={<NeighborhoodSticker size={34} />} value={MY_PROFILE.neighborhoods} label="bairros" />
          <StatTile sticker={<CitySticker size={34} />} value={MY_PROFILE.cities} label="cidades" />
        </View>
      </ScrollView>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function StatTile({ sticker, value, label }: { sticker: React.ReactNode; value: number; label: string }) {
  return (
    <View accessible accessibilityLabel={`${value} ${label}`} style={styles.tile}>
      {sticker}
      <Text style={styles.tileValue}>{value}</Text>
      <Text style={styles.tileLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: layout.gutter,
  },
  contribPill: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 10,
    paddingRight: 14,
    borderRadius: 100,
    backgroundColor: colors.paper,
  },
  contribCount: {
    fontFamily: fonts.label,
    fontSize: 16,
    color: colors.ink,
    fontVariant: ['tabular-nums'],
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  identity: {
    alignItems: 'center',
    marginTop: 4,
  },
  name: {
    fontFamily: fonts.display,
    fontSize: 44,
    lineHeight: 48,
    letterSpacing: -0.8,
    color: colors.ink,
  },
  handle: {
    fontFamily: fonts.label,
    fontSize: 14,
    color: colors.muted,
    marginTop: 2,
  },
  avatar: {
    alignItems: 'center',
    marginTop: 22,
  },
  completeWrap: {
    alignSelf: 'center',
    marginTop: 34,
  },
  completeButton: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 22,
    borderRadius: 100,
    backgroundColor: colors.paper,
  },
  completeLabel: {
    fontFamily: fonts.label,
    fontSize: 16,
    letterSpacing: -0.3,
    color: colors.ink,
  },
  // Marks the button as having steps left; the ring and percentage say the same in words.
  completeDot: {
    position: 'absolute',
    top: -3,
    right: -3,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.navIconSelected,
    borderWidth: 2.5,
    borderColor: colors.white,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: layout.gutter,
    marginTop: 40,
    marginBottom: 14,
  },
  sectionTitle: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 36,
    letterSpacing: -0.6,
    color: colors.ink,
  },
  seeAll: {
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: colors.paper,
  },
  seeAllLabel: {
    fontFamily: fonts.label,
    fontSize: 14,
    color: colors.ink,
  },
  cards: {
    gap: 12,
    paddingHorizontal: layout.gutter,
  },
  rows: {
    paddingHorizontal: layout.gutter,
    marginTop: 26,
  },
  divider: {
    height: 1,
    backgroundColor: colors.hairline,
    marginLeft: 50,
  },
  tiles: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: layout.gutter,
    marginTop: 26,
  },
  tile: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  tileValue: {
    fontFamily: fonts.display,
    fontSize: 32,
    lineHeight: 36,
    color: colors.ink,
    marginTop: 8,
    fontVariant: ['tabular-nums'],
  },
  tileLabel: {
    fontFamily: fonts.label,
    fontSize: 12,
    color: colors.muted,
  },
  pressed: {
    transform: [{ scale: 0.96 }],
  },
});
