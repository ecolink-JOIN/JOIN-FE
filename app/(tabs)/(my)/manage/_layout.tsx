import React from 'react';
import { router, Stack } from 'expo-router';
import { View } from 'react-native';
import Icon from '@/components/atoms/Icon';

function ManageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="progress/[id]"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          contentStyle: {
            borderTopColor: '#FF000000',
            borderTopWidth: 3,
          },
          headerTitle: '',
          headerLeft: () => <Icon name="arrow-left" onPress={() => router.back()} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Icon name="alarm-unread" onPress={() => router.push('alarm')} />
              <Icon name="search" onPress={() => router.push('search')} />
            </View>
          ),
        }}
      />
    </Stack>
  );
}

export default ManageLayout;
