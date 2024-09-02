import React from 'react';
import { Stack } from 'expo-router';
import Icon from '@/components/atoms/Icon';
import { Pressable } from 'react-native';

function ReportLayout() {
  return (
    <Stack
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerShadowVisible: false,
        headerTitle: '',
        headerLeft: () => (
          <Pressable onPress={navigation.goBack}>
            <Icon name="arrow-left" />
          </Pressable>
        ),
      })}
    />
  );
}

export default ReportLayout;
