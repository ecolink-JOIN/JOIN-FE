import React, { useEffect } from 'react';
import { TokenStorage } from '@/apis/axios';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // TODO: 안드로이드용 토큰 저장
    TokenStorage.setToken('0b8d416a-f6cc-45a7-9acc-870b3504fae2');
    TokenStorage.getToken().then((token) => {
      if (token == null) {
        return router.replace('/(auth)');
      } else {
        return router.replace('/(tabs)');
      }
    });
  }, [router]);

  return <View />;
};

export default Index;
