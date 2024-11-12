import React from 'react';
import StaticView from '@/components/atoms/View/StaticView';
import NickNameCTA from '@/components/organisms/CTA/NickNameCTA';
import NickNameGuide from '@/components/organisms/Guide/NickNameGuide';
import { NickNameProvider } from '@/context/NickNameContext';
import { PhotoProvider } from '@/context/PhotoContext';

function NickNameScreen() {
  return (
    <PhotoProvider>
      <NickNameProvider>
        <StaticView>
          <NickNameGuide />
          <NickNameCTA />
        </StaticView>
      </NickNameProvider>
    </PhotoProvider>
  );
}

export default NickNameScreen;
