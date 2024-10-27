import React, { useCallback, useRef, useState } from 'react';
import { ManageView, ManageBoxView, shadowStyles } from '@/components/molecules/MyMolecules/ManageView';
import { FlatList, View } from 'react-native';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import { Href, router, useLocalSearchParams } from 'expo-router';
import Button from '@/components/atoms/Button';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';

const StudySchedule = ({
  id,
  bottomSheetModalRef,
}: {
  id: string | string[] | undefined;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
}) => {
  const [duration, setDuration] = useState<{ startDate: DateType; endDate: DateType }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <ManageView>
      <Typography variant="heading3">스터디 스케쥴</Typography>
      <ManageBoxView style={shadowStyles.shadow}>
        <BoxTitle onPress={handlePresentModalPress}>
          <Typography variant="body3" style={{ color: colors.gray[9] }}>
            스터디 기간
          </Typography>
          <Icon name="arrow-right" />
        </BoxTitle>
        <BoxTitle>
          <Typography variant="button">2024.06.04 - 2024.10.31</Typography>
        </BoxTitle>
      </ManageBoxView>
      <ManageBoxView style={shadowStyles.shadow}>
        <BoxTitle>
          <Typography variant="body3" style={{ color: colors.gray[9] }}>
            진행 요일 및 시간
          </Typography>
        </BoxTitle>
        {dayAndTime.map((item, index) => (
          <View key={index}>
            <BoxTitle>
              <Typography variant="button" style={{ color: colors.black }}>
                {item.day}요일
              </Typography>
              <Typography variant="button" style={{ color: colors.gray[9], marginLeft: 'auto', marginRight: 8 }}>
                {item.time}
              </Typography>
              <Icon name="arrow-right" />
            </BoxTitle>
          </View>
        ))}
        <AddAlarm onPress={() => {}}>
          <Icon name="plus-circle-outline" />
          <Typography variant="body2" style={{ color: colors.gray[7] }}>
            추가하기
          </Typography>
        </AddAlarm>
      </ManageBoxView>
      <Button variant="contained" onPress={() => {}} style={{ marginHorizontal: 'auto' }}>
        저장하기
      </Button>
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef}
        component={
          <DateView>
            <DateTimePicker
              mode="range"
              locale="ko"
              calendarTextStyle={{ fontFamily: 'Pretendard-Medium' }}
              headerButtonColor={colors.primary}
              selectedItemColor={colors.primary}
              startDate={duration.startDate}
              endDate={duration.endDate}
              onChange={(dates) => setDuration({ startDate: dates.startDate, endDate: dates.endDate })}
            />
            <Button
              variant="contained"
              style={{ marginHorizontal: 'auto' }}
              onPress={() => bottomSheetModalRef.current?.dismiss()}
            >
              수정하기
            </Button>
          </DateView>
        }
      />
    </ManageView>
  );
};

const RuleWrapper = () => {
  const { id } = useLocalSearchParams();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  return <FlatList data={[null]} renderItem={() => <StudySchedule {...{ id, bottomSheetModalRef }} />} />;
};
export default RuleWrapper;

const BoxTitle = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
`;
const AddAlarm = styled.Pressable`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
`;

const dayAndTime = [
  { day: '월', time: '19:00 - 21:00' },
  { day: '수', time: '19:00 - 21:00' },
  { day: '금', time: '19:00 - 21:00' },
  { day: '일', time: '19:00 - 21:00' },
];

const DateView = styled.View`
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;
