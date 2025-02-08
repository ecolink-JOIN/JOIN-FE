import React, { useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ManageView, ManageBox } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { StudySchedule, MeetingType, StudyRuleDetails } from '@/components/organisms/MyPage/Manage';
import { FlatList } from 'react-native';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import DateTimePicker from 'react-native-ui-datepicker';

const StudyRule = ({ id }: { id: string | string[] | undefined }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const selectedDates = [
    '2024-10-08',
    '2024-10-10',
    '2024-10-15',
    '2024-10-17',
    '2024-10-22',
    '2024-10-24',
    '2024-10-29',
    '2024-10-31',
    '2024-11-05',
    '2024-11-07',
    '2024-11-12',
    '2024-11-14',
    '2024-11-19',
    '2024-11-21',
    '2024-11-26',
    '2024-11-28',
    '2024-12-03',
    '2024-12-05',
  ];

  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handlePresentM = () => {
    bottomSheetModalRef.current?.present();
  };

  const _id = '123';

  return (
    <>
      <ManageView>
        <Typography variant="heading3">운영 규칙 확인</Typography>
        <ManageBox title="스터디 스케쥴" icon="arrow-right" onPress={handlePresentM}>
          <StudySchedule />
        </ManageBox>

        <ManageBox title="모임 방법">
          <MeetingType />
        </ManageBox>

        <ManageBox title="운영 규칙" caption="스터디 시작 시간 전후 10분 (총 20분간) 출석 가능">
          <StudyRuleDetails />
        </ManageBox>
      </ManageView>

      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={['55%']}
        component={
          <DateView>
            <DateTimePicker
              mode="multiple"
              locale="ko"
              calendarTextStyle={{ fontFamily: 'Pretendard-Medium' }}
              headerButtonColor={colors.primary}
              selectedItemColor={colors.primary}
              dates={selectedDates}
            />
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
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;
