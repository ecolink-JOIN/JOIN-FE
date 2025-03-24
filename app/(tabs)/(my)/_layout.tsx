import React from 'react';
import { Stack } from 'expo-router';
import MyHeader from '@/components/organisms/Headers/MyHeader';

function MyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: true, header: () => <MyHeader /> }} />
    </Stack>
  );
}

export default MyLayout;
