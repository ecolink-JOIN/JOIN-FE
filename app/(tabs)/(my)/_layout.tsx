import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import MyHeader from '@/components/organisms/Headers/MyHeader';

function MyLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: true, header: () => <MyHeader /> }} />
      </Stack>
    </View>
  );
}

export default MyLayout;
