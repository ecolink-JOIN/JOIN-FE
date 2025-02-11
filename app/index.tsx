import React from 'react';
import { Redirect } from 'expo-router';
import { TokenStorage } from '@/apis/axios';
const Index = () => {
  if (!TokenStorage.getToken()) {
    return <Redirect href="/(auth)" />;
  } else {
    return <Redirect href="/(tabs)" />;
  }
};

export default Index;
