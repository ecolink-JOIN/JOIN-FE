import React, { useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ManageView, ManageBox } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { StudySchedule, MeetingType, StudyRuleDetails } from '@/components/organisms/MyPage/Manage';
import { FlatList } from 'react-native';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import styled from 'styled-components/native';

const StudyRule = ({ id }: { id: string | string[] | undefined }) => {
  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  const handlePresentM = () => {
    bottomSheetModalRef.current?.present();
  };

  const studyToken = typeof id === 'string' ? id : '';

  return (
    <>
      <ManageView>
        <Typography variant="heading3">운영 규칙 확인</Typography>
        <ManageBox title="스터디 스케쥴" icon="arrow-right" onPress={handlePresentM}>
          <StudySchedule studyToken={studyToken} />
        </ManageBox>

        <ManageBox title="모임 방법">
          <MeetingType studyToken={studyToken} />
        </ManageBox>

        <ManageBox title="운영 규칙" caption="스터디 시작 시간 전후 10분 (총 20분간) 출석 가능">
          <StudyRuleDetails studyToken={studyToken} />
        </ManageBox>
      </ManageView>

      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={['55%']}
        component={
          <DateView>
            <Typography variant="heading4" style={{ marginBottom: 24 }}>
              스터디 일정
            </Typography>
            <StudySchedule studyToken={studyToken} />
          </DateView>
        }
      />
    </>
  );
};

const StudyRuleWrapper = () => {
  const { id } = useLocalSearchParams();

  return <FlatList data={[null]} renderItem={() => <StudyRule id={id} />} />;
};

export default StudyRuleWrapper;

const DateView = styled.View`
  padding: 20px;
`;
