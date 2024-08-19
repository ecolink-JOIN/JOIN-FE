import React from 'react';
import { Tabs } from 'expo-router';
import { colors } from '@/theme';
import Icon from '@/components/atoms/Icon';
import Typography from '../atoms/Typography';

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
          borderTopColor: colors.sub2,
          borderTopWidth: 1.5,
        },
        tabBarIconStyle: {
          bottom: 0.5,
        },
        tabBarLabel: ({ children, color }) => (
          <Typography variant="gnb" style={{ color }}>
            {children}
          </Typography>
        ),
        tabBarLabelPosition: 'below-icon',
      }}
    >
      <Tabs.Screen
        name="(home)"
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
