import { InstrumentSerif_400Regular_Italic } from '@expo-google-fonts/instrument-serif';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({ InstrumentSerif_400Regular_Italic, Inter_500Medium });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  // The app opens straight on the map; login only appears when saving a place.
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" options={{ presentation: 'fullScreenModal' }} />
    </Stack>
  );
}
