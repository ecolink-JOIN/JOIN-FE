import React from 'react';
import StaticView from '@/components/atoms/View/StaticView';
import StartGuide from '@/components/organisms/Guide/StartGuide';
import StartCTA from '@/components/organisms/CTA/StartCTA';

function SignScreen() {
  return (
    <StaticView>
      <StartGuide />
      <StartCTA />
    </StaticView>
  );
}

export default SignScreen;
