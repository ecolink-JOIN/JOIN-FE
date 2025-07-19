import React from 'react';
import { Stack, useRouter } from 'expo-router';
import Icon from '@/components/atoms/Icon';
import { Pressable } from 'react-native';

function ReportLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerShadowVisible: false,
        headerTitle: '',
        headerLeft: () => (
          <Pressable onPressIn={() => router.back()}>
            <Icon name="arrow-left" />
          </Pressable>
        ),
      })}
    />
  );
}

export default ReportLayout;
