import React from 'react';
import { Stack } from 'expo-router';
import Icon from '@/components/atoms/Icon';
import { Pressable } from 'react-native';
import { TermsProvider } from '@/context/TermsContext';

function AuthLayout() {
  return (
    <TermsProvider>
      <Stack
        initialRouteName="index"
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
        <Stack.Screen name="terms-detail" options={{ headerShown: false }} />
      </Stack>
    </TermsProvider>
  );
}

export default AuthLayout;
