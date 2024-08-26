import React from 'react';
import StaticView from '@/components/atoms/View/StaticView';
import TermsGuide from '@/components/organisms/Guide/TermsGuide';
import TermsCTA from '@/components/organisms/CTA/TermsCTA';
import { TermsProvider } from '@/context/TermsContext';

function TermsScreen() {
  return (
    <TermsProvider>
      <StaticView>
        <TermsGuide />
        <TermsCTA />
      </StaticView>
    </TermsProvider>
  );
}

export default TermsScreen;
