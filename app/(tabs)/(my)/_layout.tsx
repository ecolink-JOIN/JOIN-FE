import React from 'react';
import { Stack } from 'expo-router';
import MyHeader from '@/components/organisms/Headers/MyHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

function MyLayout() {
  return (
    <BottomSheetModalProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: true, header: () => <MyHeader /> }} />
      </Stack>
    </BottomSheetModalProvider>
  );
}

export default MyLayout;
