import React from 'react';
// import { useLocalSearchParams } from 'expo-router';
import {
  ManageView,
  ManageBox,
  ManageBoxView,
  shadowStyles,
  ListComponent,
} from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { Status, Attendance, Approval, KakaoLink } from '@/components/organisms/MyPage/Manage';

const Progress = () => {
  // const { id } = useLocalSearchParams();
  return (
    <ManageView>
      <Typography variant="heading3">진행 관리</Typography>
      <ManageBox title="진행 현황">
        <Status value={false} />
      </ManageBox>
      <ManageBox title="스터디 출석 및 인증 현황">
        <Attendance />
      </ManageBox>
      <ManageBox title="스터디 인증 승인">
        <Approval />
      </ManageBox>
      <ManageBox>
        <ListComponent title="스터디 회차 설정" href="#" />
      </ManageBox>
      <ManageBox title="스터디 메시지">
        <ListComponent title="스터디 공지" href="#" />
        <ListComponent title="자동 알림 메세지 설정" href="#" />
      </ManageBox>
      <ManageBox title="스터디 카카오톡 링크">
        <KakaoLink />
      </ManageBox>
      <ManageBoxView style={shadowStyles.shadow}>
        <ListComponent title="스터디 종료하기" href="#" />
      </ManageBoxView>
    </ManageView>
  );
};

export default Progress;
