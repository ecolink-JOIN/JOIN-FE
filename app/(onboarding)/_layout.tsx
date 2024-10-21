import React from 'react';
import { Stack, useRouter } from 'expo-router';
import Icon from '@/components/atoms/Icon';
import { OnboardingProvider } from '@/context/OnboardingContext';

function OnBoardingLayout() {
  const router = useRouter();

  return (
    <OnboardingProvider>
      <Stack>
        <Stack.Screen
          name="start"
          options={{
            headerShown: true,
            headerShadowVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen name="select" options={{ headerShown: false }} />
      </Stack>
    </OnboardingProvider>
  );
}

export default OnBoardingLayout;
