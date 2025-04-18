import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { RecommendationProvider } from '@/context/Recommendation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
function StudyLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <RecommendationProvider>
          <View style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }} />
          </View>
        </RecommendationProvider>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}

export default StudyLayout;
