import React from 'react';
import { Stack } from 'expo-router';
import Icon from '@/components/atoms/Icon';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

function FormLayout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: '',
        headerLeft: () => (
          <Icon
            name="arrow-left"
            onPressIn={() => {
              Alert.alert('뒤로가기', '정말 정보 입력을 취소하시겠습니까?', [
                {
                  text: '취소',
                  style: 'cancel',
                },
                {
                  text: '뒤로가기',
                  onPress: () => router.back(),
                },
              ]);
            }}
            style={{
              paddingVertical: 20,
            }}
          />
        ),
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: 'white',
        },
      }}
    />
  );
}

export default FormLayout;
