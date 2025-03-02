import React from 'react';
import { Stack } from 'expo-router';
import Icon from '@/components/atoms/Icon';
import { useRouter } from 'expo-router';
import { colors } from '@/theme';

function StudyLayout() {
  const router = useRouter();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="application"
        options={{
          headerShown: true,
          headerTitle: '스터디 신청',
          headerTitleStyle: {
            fontFamily: 'Pretendard-Medium',
            fontWeight: '600',
            fontSize: 24,
            color: colors.black,
          },
          headerLeft: () => <Icon name="arrow-left" onPressIn={() => router.back()} style={{ marginRight: 20 }} />,
          headerShadowVisible: false,
          contentStyle: {
            borderTopWidth: 2,
            borderTopColor: colors.gray[2],
          },
        }}
      />
    </Stack>
  );
}

export default StudyLayout;
