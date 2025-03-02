import React from 'react';
import { Stack } from 'expo-router';
import { RecommendationProvider } from '@/context/Recommendation';

function MoreStudiesLayout() {
  return (
    <RecommendationProvider>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="(explore)" />
    </RecommendationProvider>
  );
}

export default MoreStudiesLayout;
