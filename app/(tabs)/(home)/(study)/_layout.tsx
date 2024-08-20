import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { colors } from '@/theme';

function StudyLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: colors.red[1] }}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

export default StudyLayout;
