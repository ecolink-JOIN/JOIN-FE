import React from 'react';
// import GNB from '@/components/organisms/GNB';
import { Stack } from 'expo-router';

function TabLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="application" />
      <Stack.Screen name="recruit-base" />
      <Stack.Screen name="recurit-add" />
    </Stack>
  );
}

export default TabLayout;
