import React from 'react';
import { Tabs } from 'expo-router';
import { colors } from '@/theme';
import Icon from '@/components/atoms/Icon';
import Typography from '../atoms/Typography';
import { SafeAreaView } from 'react-native';
import { useNotificationContext } from '@/context/NotificationContext';

function GNB() {
  const { unreadCount } = useNotificationContext();

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          tabBarLabel: ({ children, color }) => (
            <Typography variant="gnb" style={{ color }}>
              {children}
            </Typography>
          ),
          tabBarLabelPosition: 'below-icon',
        }}
      >
        {/* TODO: 테스트 페이지 오픈*/}
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="(home)"
          options={{
            title: '홈',
            tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
            tabBarIcon: ({ focused }) => <Icon name={focused ? 'home' : 'home-outline'} />,
          }}
        />
        <Tabs.Screen
          name="(certified)"
          options={{
            title: '인증',
            tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
            tabBarIcon: ({ focused }) => <Icon name={focused ? 'verify' : 'verify-outline'} />,
          }}
        />
        <Tabs.Screen
          name="(my)"
          options={{
            title: '마이',
            tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
            tabBarIcon: ({ focused }) => <Icon name={focused ? 'mypage' : 'mypage-outline'} />,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}

export default GNB;
