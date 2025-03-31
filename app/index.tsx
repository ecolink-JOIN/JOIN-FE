import React, { useEffect } from 'react';
import { TokenStorage } from '@/apis/axios';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // TODO: 안드로이드용 토큰 저장
    TokenStorage.setToken('9e5fc560-a97b-470d-9d66-04a757dfcc45');
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
