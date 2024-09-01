import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ManageView, ManageBox, ManageBoxView, shadowStyles } from '@/components/atoms/View/ManageView';

const Progress = () => {
  const { id } = useLocalSearchParams();
  return (
    <ManageView>
      <ManageBox title="진행 현황"></ManageBox>
      <ManageBox title="스터디 출석 및 인증 현황"></ManageBox>
      <ManageBox title="스터디 인증 승인"></ManageBox>
      <ManageBox title="스터디 회차 설정"></ManageBox>
      <ManageBox title="스터디 메시지"></ManageBox>
      <ManageBox title="스터디 카카오톡 링크"></ManageBox>
      <ManageBoxView style={shadowStyles.shadow}></ManageBoxView>
    </ManageView>
  );
};

export default Progress;
