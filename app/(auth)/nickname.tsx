import React from 'react';
import StaticView from '@/components/atoms/View/StaticView';
import NickNameCTA from '@/components/organisms/CTA/NickNameCTA';
import NickNameGuide from '@/components/organisms/Guide/NickNameGuide';

function NickNameScreen() {
  return (
    <StaticView>
      <NickNameGuide />
      <NickNameCTA />
    </StaticView>
  );
}

export default NickNameScreen;
