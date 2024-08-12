import React from 'react';
import ApplicationReason from '@/components/organisms/Form/ApplicationReason';
import ApplicationConsent from '@/components/organisms/Form/ApplicationConsent';
import ApplicationButton from '@/components/organisms/Form/ApplicationButton';
import StaticView from '@/components/atoms/View/StaticView';

export default function application() {
  return (
    <StaticView>
      <ApplicationReason />
      <ApplicationConsent />
      <ApplicationButton />
    </StaticView>
  );
}
