import React from 'react';
import { Href, router, Stack } from 'expo-router';
import { View } from 'react-native';
import Icon from '@/components/atoms/Icon';

function MyInfo() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        contentStyle: {
          borderTopColor: '#FF000000',
          borderTopWidth: 3,
        },
        headerTitle: '',
        headerLeft: () => <Icon name="arrow-left" onPressIn={() => router.back()} />,
        headerRight: () => (
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Icon name="alarm-unread" onPressIn={() => router.push('alarm' as Href)} />
            <Icon name="search" onPressIn={() => router.push('search' as Href)} />
          </View>
        ),
      }}
    />
  );
}

export default MyInfo;
