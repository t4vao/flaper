import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { colors } from '@/theme';

// Rounded duotone silhouettes from the same family as the navigation icons.
// Existing export names keep the profile's layout and consumers unchanged.
type StickerProps = { size?: number; tone?: 'neutral' | 'brand' };

function palette(tone: StickerProps['tone']) {
  return tone === 'brand'
    ? { primary: colors.navIconSelected, secondary: colors.lavender }
    : { primary: colors.navIconPrimary, secondary: colors.navIconSecondary };
}

function Sticker({ size = 32, children }: StickerProps & { children: React.ReactNode }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      {children}
    </Svg>
  );
}

export function DiarySticker({ tone, ...props }: StickerProps) {
  const { primary, secondary } = palette(tone);
  return (
    <Sticker {...props}>
      <Rect x={7} y={4.5} width={13} height={17} rx={3} fill={secondary} />
      <Rect x={3.5} y={2.5} width={14} height={17} rx={3} fill={primary} />
      <Rect x={6.5} y={6.5} width={8} height={1.5} rx={0.75} fill={secondary} />
      <Rect x={6.5} y={10} width={6} height={1.5} rx={0.75} fill={secondary} />
    </Sticker>
  );
}

export function WantToGoSticker({ tone, ...props }: StickerProps) {
  const { primary, secondary } = palette(tone);
  return (
    <Sticker {...props}>
      <Path d="M5.5 8h13v11.6c0 1.1-1.2 1.7-2.1 1.1L12 17.9l-4.4 2.8c-.9.6-2.1 0-2.1-1.1z" fill={primary} />
      <Path d="M5.5 6.5V5a2.5 2.5 0 0 1 2.5-2.5h8A2.5 2.5 0 0 1 18.5 5v1.5z" fill={secondary} />
    </Sticker>
  );
}

export function ListsSticker({ tone, ...props }: StickerProps) {
  const { primary, secondary } = palette(tone);
  return (
    <Sticker {...props}>
      <Circle cx={4.5} cy={5.5} r={1.8} fill={primary} />
      <Circle cx={4.5} cy={12} r={1.8} fill={primary} />
      <Circle cx={4.5} cy={18.5} r={1.8} fill={primary} />
      <Rect x={9} y={4} width={12} height={3} rx={1.5} fill={secondary} />
      <Rect x={9} y={10.5} width={10} height={3} rx={1.5} fill={secondary} />
      <Rect x={9} y={17} width={8} height={3} rx={1.5} fill={secondary} />
    </Sticker>
  );
}

export function FollowingSticker({ tone, ...props }: StickerProps) {
  const { primary, secondary } = palette(tone);
  return (
    <Sticker {...props}>
      <Circle cx={16.5} cy={7} r={3} fill={secondary} />
      <Path d="M14.2 13c3.9-1.5 7.8.8 7.8 4.1v.4a2 2 0 0 1-2 2h-5.8z" fill={secondary} />
      <Circle cx={8.5} cy={7.5} r={3.5} fill={primary} />
      <Path d="M1.5 18c0-3 3.1-4.8 7-4.8s7 1.8 7 4.8v.5a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2z" fill={primary} />
    </Sticker>
  );
}

export function ContributionSticker({ tone, ...props }: StickerProps) {
  const { primary, secondary } = palette(tone);
  return (
    <Sticker {...props}>
      <Path d="M8 17.5c1.5 1.9 3 3.4 3.3 3.7a1 1 0 0 0 1.4 0c.3-.3 1.8-1.8 3.3-3.7z" fill={secondary} />
      <Path fill={primary} fillRule="evenodd" d="M7 16c-1.3-2-2.3-4.1-2.3-6.2a7.3 7.3 0 0 1 14.6 0c0 2.1-1 4.2-2.3 6.2zM12 12.6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </Sticker>
  );
}

export function CameraSticker({ tone, ...props }: StickerProps) {
  const { primary, secondary } = palette(tone);
  return (
    <Sticker {...props}>
      <Path d="M7 6.5 8.2 4a1.8 1.8 0 0 1 1.6-1h4.4a1.8 1.8 0 0 1 1.6 1L17 6.5z" fill={primary} />
      <Rect x={2.5} y={7.8} width={19} height={12.7} rx={3} fill={secondary} />
      <Path fill={primary} fillRule="evenodd" d="M17 14a5 5 0 1 1-10 0 5 5 0 0 1 10 0zM14.8 14a2.8 2.8 0 1 0-5.6 0 2.8 2.8 0 0 0 5.6 0z" />
    </Sticker>
  );
}

export function InviteSticker({ tone, ...props }: StickerProps) {
  const { primary, secondary } = palette(tone);
  return (
    <Sticker {...props}>
      <Path d="M13.5 5H5a2.5 2.5 0 0 0-2.5 2.5v2a2.5 2.5 0 0 1 0 5v2A2.5 2.5 0 0 0 5 19h8.5z" fill={secondary} />
      <Path d="M15 5h4a2.5 2.5 0 0 1 2.5 2.5v2a2.5 2.5 0 0 0 0 5v2A2.5 2.5 0 0 1 19 19h-4z" fill={primary} />
      <Rect x={6} y={9} width={4.5} height={1.5} rx={0.75} fill={primary} />
      <Rect x={6} y={13} width={3} height={1.5} rx={0.75} fill={primary} />
    </Sticker>
  );
}

export function NeighborhoodSticker({ tone, ...props }: StickerProps) {
  const { primary, secondary } = palette(tone);
  return (
    <Sticker {...props}>
      <Path d="M3.7 5.8 8 4v14l-3.6 1.5a1 1 0 0 1-1.4-.9V6.8a1 1 0 0 1 .7-1z" fill={secondary} />
      <Path d="m9.5 4 5 2v14l-5-2z" fill={primary} />
      <Path d="m16 6 3.6-1.5a1 1 0 0 1 1.4.9v11.8a1 1 0 0 1-.7 1L16 20z" fill={secondary} />
    </Sticker>
  );
}

export function CitySticker({ tone, ...props }: StickerProps) {
  const { primary, secondary } = palette(tone);
  return (
    <Sticker {...props}>
      <Rect x={2} y={10} width={5} height={10.5} rx={1.5} fill={secondary} />
      <Path fill={primary} fillRule="evenodd" d="M10 3h4a1.5 1.5 0 0 1 1.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 8.5 19V4.5A1.5 1.5 0 0 1 10 3zM11 6v2h2V6zM11 10.5v2h2v-2zM11 15v2h2v-2z" />
      <Rect x={17} y={7} width={5} height={13.5} rx={1.5} fill={secondary} />
    </Sticker>
  );
}

export function GearGlyph({ size = 26, tone }: StickerProps) {
  const { primary, secondary } = palette(tone);
  return (
    <Sticker size={size}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <Rect key={angle} x={10.5} y={2} width={3} height={5} rx={1.3} fill={secondary} transform={`rotate(${angle} 12 12)`} />
      ))}
      <Path fill={primary} fillRule="evenodd" d="M19.5 12a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0zM15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0z" />
    </Sticker>
  );
}

export function PencilGlyph({ size = 20, tone }: StickerProps) {
  const { primary, secondary } = palette(tone);
  return (
    <Sticker size={size}>
      <Path d="m15.4 4 1.1-1.1a2.8 2.8 0 0 1 4 4l-1.1 1.1z" fill={secondary} />
      <Path d="m14.3 5.1 4 4-9.4 9.4-4-4z" fill={primary} />
      <Path d="m4.1 16 3.3 3.3-4.1 1.1a.5.5 0 0 1-.6-.6z" fill={secondary} />
    </Sticker>
  );
}

export function ChevronGlyph({ size = 20, color = colors.navIconSecondary }: StickerProps & { color?: string }) {
  return (
    <Sticker size={size}>
      <Path d="m9 6 6 6-6 6" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    </Sticker>
  );
}
