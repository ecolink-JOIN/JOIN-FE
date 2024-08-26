import React from 'react';
import StaticView from '@/components/atoms/View/StaticView';
import NickNameCTA from '@/components/organisms/CTA/NickNameCTA';
import NickNameGuide from '@/components/organisms/Guide/NickNameGuide';
import { NickNameProvider } from '@/context/NickNameContext';

function NickNameScreen() {
  return (
    <NickNameProvider>
      <StaticView>
        <NickNameGuide />
        <NickNameCTA />
      </StaticView>
    </NickNameProvider>
  );
}

export default NickNameScreen;
