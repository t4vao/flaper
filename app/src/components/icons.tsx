import Svg, { Circle, Path } from 'react-native-svg';

import { colors } from '@/theme';

// Glyphs from Lucide (ISC license), drawn on its 24×24 grid.
type IconProps = { size?: number; color?: string; strokeWidth?: number; fill?: string };

function Icon({ size = 24, color = colors.ink, strokeWidth = 1.5, fill = 'none', children }: IconProps & { children: React.ReactNode }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </Svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <Circle cx={11} cy={11} r={8} />
      <Path d="m21 21-4.34-4.34" />
    </Icon>
  );
}

export function MapIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <Path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <Path d="M15 5.764v15" />
      <Path d="M9 3.236v15" />
    </Icon>
  );
}

export function CherryIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <Path d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" />
      <Path d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z" />
      <Path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12" />
      <Path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z" />
    </Icon>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <Path d="M5 12h14" />
      <Path d="M12 5v14" />
    </Icon>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <Path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </Icon>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <Path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </Icon>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <Path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <Path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </Icon>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <Circle cx={12} cy={12} r={10} />
      <Path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
    </Icon>
  );
}

export function BookmarkIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <Path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </Icon>
  );
}

export function NavigationIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <Path d="M3 11 22 2 13 21 11 13 3 11z" />
    </Icon>
  );
}

// Flaper navigation: outline at rest, filled in two neutral tones when selected.
// Kept separate from the outline Lucide glyphs used in content and actions.
type NavIconProps = { size?: number; primary?: string; secondary?: string; filled?: boolean };

// Reuse the same contour rotated around the grid centre: both halves have
// identical weight and the diagonal gap stays consistent at small sizes.
const COMPASS_HALF = 'M18.9 3.2c1.18-.45 2.35.72 1.9 1.9l-3.52 9.17a1.15 1.15 0 0 1-1.89.4l-6.06-6.06a1.15 1.15 0 0 1 .4-1.89z';

function NavIcon({ size = 28, children }: NavIconProps & { children: React.ReactNode }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      {children}
    </Svg>
  );
}

export function NavHomeIcon({ primary = colors.navIconPrimary, secondary = colors.navIconSecondary, filled = false, ...props }: NavIconProps) {
  if (!filled) {
    return (
      <NavIcon {...props}>
        <Path
          d="M5 10.7v7.8a2 2 0 0 0 2 2h3.2v-4a1.8 1.8 0 0 1 3.6 0v4H17a2 2 0 0 0 2-2v-7.8M3.5 10.7l7-6.9a2.15 2.15 0 0 1 3 0l7 6.9"
          stroke={primary}
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </NavIcon>
    );
  }
  return (
    <NavIcon {...props}>
      {/* A narrow gap separates the roof and body, like the detached reference shapes.
          The doorway stays transparent rather than painted white over the glass. */}
      <Path
        fill={secondary}
        d="M6.6 13.2h10.8a1.6 1.6 0 0 1 1.6 1.6v3.7a2 2 0 0 1-2 2h-3.2v-3.3a1.8 1.8 0 0 0-3.6 0v3.3H7a2 2 0 0 1-2-2v-3.7a1.6 1.6 0 0 1 1.6-1.6z"
      />
      <Path
        fill={primary}
        d="M10.45 3.3a2.35 2.35 0 0 1 3.1 0l7.12 6.26c.92.8.35 2.32-.87 2.32H4.2c-1.22 0-1.79-1.52-.87-2.32z"
      />
    </NavIcon>
  );
}

export function NavExploreIcon({ primary = colors.navIconPrimary, secondary = colors.navIconSecondary, filled = false, ...props }: NavIconProps) {
  return (
    <NavIcon {...props}>
      {/* Two detached compass halves echo the reference's soft directional shapes. */}
      <Path
        fill={filled ? primary : 'none'}
        stroke={filled ? 'none' : primary}
        strokeWidth={1.7}
        strokeLinejoin="round"
        d={COMPASS_HALF}
        transform={filled ? undefined : 'translate(0.6 -0.6)'}
      />
      <Path
        fill={filled ? secondary : 'none'}
        stroke={filled ? 'none' : primary}
        strokeWidth={1.7}
        strokeLinejoin="round"
        d={COMPASS_HALF}
        transform={filled ? 'rotate(180 12 12)' : 'rotate(180 12 12) translate(0.6 -0.6)'}
      />
    </NavIcon>
  );
}

export function NavProfileIcon({ primary = colors.navIconPrimary, secondary = colors.navIconSecondary, filled = false, ...props }: NavIconProps) {
  return (
    <NavIcon {...props}>
      <Circle
        cx={12}
        cy={6.8}
        r={3.8}
        fill={filled ? secondary : 'none'}
        stroke={filled ? 'none' : primary}
        strokeWidth={1.7}
      />
      <Path
        fill={filled ? primary : 'none'}
        stroke={filled ? 'none' : primary}
        strokeWidth={1.7}
        strokeLinejoin="round"
        d="M4 18.4c0-3.45 3.58-5.6 8-5.6s8 2.15 8 5.6v.1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
      />
    </NavIcon>
  );
}
