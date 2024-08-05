import React from 'react';
import { Tabs } from 'expo-router';
import { colors } from '@/theme';
import Icon from '@/components/atoms/Icon';

function GNB() {
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
          tabBarIcon: ({ focused }) => <Icon name={focused ? 'home' : 'home-outline'} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '인증',
          tabBarIcon: ({ focused }) => <Icon name={focused ? 'verify' : 'verify-outline'} />,
        }}
      />
      <Tabs.Screen
        name="typography"
        options={{
          title: '마이',
          tabBarIcon: ({ focused }) => <Icon name={focused ? 'mypage' : 'mypage-outline'} />,
        }}
      />
    </Tabs>
  );
}

export default GNB;
