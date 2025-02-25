import React, { useEffect, useState } from 'react';
import ApplicationReason from '@/components/organisms/Form/ApplicationReason';
import ApplicationConsent from '@/components/organisms/Form/ApplicationConsent';
import ApplicationButton from '@/components/organisms/Form/ApplicationButton';
import StaticView from '@/components/atoms/View/StaticView';
import { router, useLocalSearchParams } from 'expo-router';
import { ApplicationsService } from '@/apis';
import { Alert } from 'react-native';

export default function Application() {
  const params = useLocalSearchParams<{ slug: string }>();
  const [agree, setAgreed] = useState(false);
  const [reason, setReason] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    setButtonDisabled(!(agree && reason && reason.length >= 10));
    console.log(agree, reason, params.slug);
  }, [agree, reason]);

  const onChangeAgree = () => {
    setAgreed(!agree);
  };

  const onSubmit = () => {
    ApplicationsService()
      .post({
        introduction: reason,
        appDate: new Date(),
        studyToken: params.slug,
      })
      .then(() => {
        Alert.alert('신청 완료', '스터디 신청이 완료되었습니다.');
        router.replace('/(tabs)');
      });
  };
  return (
    <StaticView>
      <ApplicationReason value={reason} onChangeText={setReason} />
      <ApplicationConsent {...{ agree, onChangeAgree }} />
      <ApplicationButton disabled={buttonDisabled} onPress={onSubmit} />
    </StaticView>
  );
}
