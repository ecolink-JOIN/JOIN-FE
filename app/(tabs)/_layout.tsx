import { Tabs } from 'expo-router';
import React from 'react';

import TabBarIcon from '@/components/navigation/TabBarIcon';
import { colors } from '@/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[7],
        tabBarStyle: {
          height: 80,
          paddingTop: 8,
          paddingBottom: 16,
        },
        tabBarIconStyle: {
          bottom: 0.5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          lineHeight: 16,
          fontWeight: 500,
        },
        tabBarLabelPosition: 'below-icon',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'home' : 'home-outline'} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '인증',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'auth' : 'auth-outline'} />,
        }}
      />
      <Tabs.Screen
        name="typography"
        options={{
          title: '마이',
          tabBarIcon: ({ color, focused }) => <TabBarIcon name={focused ? 'mypage' : 'mypage-outline'} />,
        }}
      />
    </Tabs>
  );
}
