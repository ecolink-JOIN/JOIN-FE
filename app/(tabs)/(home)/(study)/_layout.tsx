import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';

function StudyLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

export default StudyLayout;
