import React from 'react';
import { Stack, useRouter } from 'expo-router';
import Icon from '@/components/atoms/Icon';
import { useOnboardingContext } from '@/context/OnboardingContext';

function OnBoardingLayout() {
  const router = useRouter();
  const context = useOnboardingContext();
  const { studyPreferences, setStudyPreferences } = context;
  const { step } = studyPreferences;

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitle: '',
        headerLeft: () => (
          <Icon name="arrow-left" onPress={() => (step ? setStudyPreferences({ step: step - 1 }) : router.back())} />
        ),
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="complete" options={{ headerShown: false }} />
    </Stack>
  );
}

export default OnBoardingLayout;
