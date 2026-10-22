import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, type ImageStyle, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '@/theme';

// A review photo; falls back to the brand gradient if it can't load.
export function PlacePhoto({ uri, style }: { uri: string; style?: StyleProp<ImageStyle> }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <LinearGradient
        colors={[colors.sky, colors.lavender, colors.butter]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={style as StyleProp<ViewStyle>}
      />
    );
  }

  return <Image source={{ uri }} style={style} resizeMode="cover" onError={() => setFailed(true)} />;
}
