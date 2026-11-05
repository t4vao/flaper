import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '@/theme';

// Lucide star and its left half, on the 24×24 grid.
const STAR =
  'M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z';
const LEFT_HALF =
  'M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2z';

// Five stars in half steps. Callers render nothing when a visit has no rating.
export function StarRating({ value, size = 14 }: { value: number; size?: number }) {
  const label = `Nota ${value.toLocaleString('pt-BR')} de 5`;

  return (
    <View accessible accessibilityRole="image" accessibilityLabel={label} style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = value >= n ? 'full' : value >= n - 0.5 ? 'half' : 'empty';
        return (
          <Svg key={n} width={size} height={size} viewBox="0 0 24 24">
            {fill === 'half' && <Path d={LEFT_HALF} fill={colors.butter} />}
            <Path
              d={STAR}
              fill={fill === 'full' ? colors.butter : 'none'}
              stroke={fill === 'empty' ? colors.muted : colors.ink}
              strokeOpacity={fill === 'empty' ? 0.45 : 1}
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
          </Svg>
        );
      })}
    </View>
  );
}
