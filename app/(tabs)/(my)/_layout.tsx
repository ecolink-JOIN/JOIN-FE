import React from 'react';
import { Stack } from 'expo-router';
import MyHeader from '@/components/organisms/Headers/MyHeader';

function TabLayout() {
  return (
    <Stack
      screenOptions={() => ({
        headerShown: true,
        headerShadowVisible: false,
        contentStyle: {
          borderTopColor: '#FF000000',
          borderTopWidth: 3,
        },
        headerTitle: () => <MyHeader />,
      })}
    />
  );
}

export default TabLayout;
