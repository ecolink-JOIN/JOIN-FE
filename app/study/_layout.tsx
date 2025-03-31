import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { RecommendationProvider } from '@/context/Recommendation';

function StudyLayout() {
  return (
    <RecommendationProvider>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </RecommendationProvider>
  );
}

export default StudyLayout;
