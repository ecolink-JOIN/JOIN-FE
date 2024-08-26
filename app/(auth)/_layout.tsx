import React from 'react';
import { Stack } from 'expo-router';
import Icon from '@/components/atoms/Icon';
import { Pressable } from 'react-native';

function AuthLayout() {
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
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

export default AuthLayout;
