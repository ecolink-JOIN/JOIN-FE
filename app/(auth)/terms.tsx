import React from 'react';
import StaticView from '@/components/atoms/View/StaticView';
import TermsGuide from '@/components/organisms/Guide/TermsGuide';
import TermsCTA from '@/components/organisms/CTA/TermsCTA';

function TermsScreen() {
  return (
    <StaticView>
      <TermsGuide />
      <TermsCTA />
    </StaticView>
  );
}

export default TermsScreen;
