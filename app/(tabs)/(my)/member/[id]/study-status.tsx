import React, { useRef } from 'react';
import { Href, router, useLocalSearchParams } from 'expo-router';
import { ManageView, ManageBox, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import {
  Attendance,
  KakaoLink,
  StudyAnnouncement,
  MyAttendance,
  StudySchedule,
} from '@/components/organisms/MyPage/Manage';
import { FlatList } from 'react-native';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import styled from 'styled-components/native';
import { colors } from '@/theme';

const StudyStatus = ({ id }: { id: string | string[] | undefined }) => {
  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  const handlePresentM = () => {
    bottomSheetModalRef.current?.present();
  };

  const studyToken = typeof id === 'string' ? id : '';

  return (
    <>
      <ManageView>
        <Typography variant="heading3">스터디 현황</Typography>
        <ManageBox
          title="스터디 공지"
          icon="arrow-right"
          onPress={() => router.push(`member/${studyToken}/notice` as Href)}
        >
          <StudyAnnouncement />
        </ManageBox>
        <ManageBox title="나의 출석 및 인증 현황">
          <MyAttendance id={studyToken} />
        </ManageBox>
        <ManageBox title="스터디 출석 및 인증 현황">
          <Attendance studyToken={studyToken} />
        </ManageBox>
        <ManageBox title="스터디 스케쥴" icon="arrow-right" onPress={handlePresentM}>
          <StudySchedule studyToken={studyToken} />
        </ManageBox>

        <ManageBox title="스터디 카카오톡 링크">
          <KakaoLink studyToken={studyToken} />
        </ManageBox>
        <ManageBox>
          <ListComponent title="스터디 탈퇴" onPress={() => router.push(`member/${studyToken}/leave` as Href)} />
        </ManageBox>
      </ManageView>

      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={['55%']}
        component={
          <DateView>
            <Typography variant="heading4" style={{ marginBottom: 16 }}>
              스터디 일정
            </Typography>
            <Typography variant="body3" style={{ color: colors.gray[7] }}>
              스터디 규칙 페이지에서 일정을 확인하세요.
            </Typography>
          </DateView>
        }
      />
    </>
  );
};

const StudyStatusWrapper = () => {
  const { id } = useLocalSearchParams();

  return <FlatList data={[null]} renderItem={() => <StudyStatus id={id} />} />;
};

export default StudyStatusWrapper;

const DateView = styled.View`
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;
