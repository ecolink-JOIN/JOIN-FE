import React, { useEffect, useState } from 'react';
import ApplicationReason from '@/components/organisms/Form/ApplicationReason';
import ApplicationConsent from '@/components/organisms/Form/ApplicationConsent';
import ApplicationButton from '@/components/organisms/Form/ApplicationButton';
import StaticView from '@/components/atoms/View/StaticView';

export default function Application() {
  const [agree, setAgreed] = useState(false);
  const [reason, setReason] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    setButtonDisabled(!(agree && reason && reason.length >= 10));
  }, [agree, reason]);
  return (
    <StaticView>
      <ApplicationReason value={reason} onChangeText={setReason} />
      <ApplicationConsent agree={agree} onChangeAgree={setAgreed} />
      <ApplicationButton disabled={buttonDisabled} />
    </StaticView>
  );
}
