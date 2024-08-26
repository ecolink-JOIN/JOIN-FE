import React from 'react';
import StaticView from '@/components/atoms/View/StaticView';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignInGuide from '@/components/organisms/Guide/SignInGuide';
import SignInCTA from '@/components/organisms/CTA/SignInCTA';

function SignInScreen() {
  return (
    <StaticView>
      <SafeAreaView style={{ marginTop: 40 }} />
      <SignInGuide />
      <SignInCTA />
    </StaticView>
  );
}

export default SignInScreen;
