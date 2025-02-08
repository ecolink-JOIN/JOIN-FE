import React from 'react';
import StaticView from '@/components/atoms/View/StaticView';
import SignInGuide from '@/components/organisms/Guide/SignInGuide';
import SignInCTA from '@/components/organisms/CTA/SignInCTA';

function SignInScreen() {
  return (
    <StaticView>
      <SignInGuide />
      <SignInCTA />
    </StaticView>
  );
}

export default SignInScreen;
