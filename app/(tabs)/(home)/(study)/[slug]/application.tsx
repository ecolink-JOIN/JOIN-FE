import React, { useEffect, useState } from 'react';
import ApplicationReason from '@/components/organisms/Form/ApplicationReason';
import ApplicationConsent from '@/components/organisms/Form/ApplicationConsent';
import ApplicationButton from '@/components/organisms/Form/ApplicationButton';
import StaticView from '@/components/atoms/View/StaticView';
import { router, useLocalSearchParams } from 'expo-router';
import { ApplicationsService } from '@/apis';
import Toast from 'react-native-toast-message';

export default function Application() {
  const params = useLocalSearchParams<{ slug: string }>();
  const [agree, setAgreed] = useState(false);
  const [reason, setReason] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const showToast = (text1: string, text2: string) => {
    Toast.show({
      type: 'success',
      text1,
      text2,
    });
  };

  useEffect(() => {
    setButtonDisabled(!(agree && reason && reason.length >= 10));
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
        showToast('신청이 완료되었습니다.', '스터디 참여 신청 확인 페이지로 이동합니다.');
        router.replace('/(tabs)');
      });
  };
  return (
    <StaticView>
      <ApplicationReason value={reason} onChangeText={setReason} />
      <ApplicationConsent {...{ agree, onChangeAgree }} />
      <ApplicationButton disabled={buttonDisabled} onPressIn={onSubmit} />
    </StaticView>
  );
}
