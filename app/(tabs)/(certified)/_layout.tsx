import React from 'react';
import { Href, router, Stack } from 'expo-router';
import Typography from '@/components/atoms/Typography';
import { View } from 'react-native';
import Icon from '@/components/atoms/Icon';

function MoreStudiesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerShadowVisible: false,
          contentStyle: {
            borderTopColor: '#FF000000',
            borderTopWidth: 3,
          },
          headerTitle: () => <Typography variant="heading4">인증</Typography>,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <Icon name="alarm-unread" onPress={() => router.push('alarm' as Href)} />
              <Icon name="search" onPress={() => router.push('search' as Href)} />
            </View>
          ),
        }}
      />
    </Stack>
  );
}

export default MoreStudiesLayout;
