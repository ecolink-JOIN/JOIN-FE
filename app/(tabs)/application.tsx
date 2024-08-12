import React from 'react';
import { View } from 'react-native';
import ApplicationReason from '@/components/organisms/Form/ApplicationReason';
import ApplicationConsent from '@/components/organisms/Form/ApplicationConsent';
import ApplicationButton from '@/components/organisms/Form/ApplicationButton';

export default function application() {
  return (
    <View>
      <ApplicationReason />
      <ApplicationConsent />
      <ApplicationButton />
    </View>
  );
}
