import { Tabs } from 'expo-router/tabs';

import { FloatingNav } from '@/components/FloatingNav';

export default function TabsLayout() {
  return (
    <Tabs tabBar={(props) => <FloatingNav {...props} />} screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="explorar" options={{ title: 'Explorar' }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
