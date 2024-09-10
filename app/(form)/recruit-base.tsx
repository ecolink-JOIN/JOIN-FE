import StaticView from '@/components/atoms/View/StaticView';
import React, { useRef, useState } from 'react';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import {
  ActivateDuration,
  Category,
  DateTime,
  EndDate,
  MeetingLocation,
  MeetingWay,
  Nums,
} from '@/components/molecules/FormControl/RecruitBase';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import dayjs from 'dayjs';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import DateTimePicker from 'react-native-ui-datepicker';
import { View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '@/components/atoms/Button';

interface DurationProps {
  start: dayjs.Dayjs | null;
  end: dayjs.Dayjs | null;
}

export default function RecruitBase() {
  const router = useRouter();
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [duration, setDuration] = useState<DurationProps>({ start: null, end: null });
  const bottomSheetModalRef1 = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);
  const [online, setOnline] = useState(true);

  const onSubmit = () => {
    router.push('/(form)/recruit-add');
  };

  const renderItem = () => (
    <StyledView>
      <Typography variant="heading4">스터디 기본 정보를 입력해주세요.</Typography>
      <Category />
      <Nums />
      <EndDate value={endDate} bottomSheetModalRef={bottomSheetModalRef1} />
      <MeetingWay online={online} setOnline={setOnline} />
      {online || <MeetingLocation />}
      <ActivateDuration value={duration} bottomSheetModalRef={bottomSheetModalRef2} />
      <DateTime />
      <Button variant="contained" style={{ marginHorizontal: 'auto' }} onPress={onSubmit}>
        다음
      </Button>
    </StyledView>
  );

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <FlatList data={[null]} renderItem={renderItem} />
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef1}
        component={
          <>
            <DateTimePicker
              locale="ko"
              mode="single"
              selectedItemColor="#FF7F5F"
              date={endDate || new Date()}
              onChange={(params: any) => {
                setEndDate(params.date);
              }}
            />
            <Button
              variant="contained"
              style={{ marginHorizontal: 'auto' }}
              onPress={() => bottomSheetModalRef1.current?.dismiss()}
            >
              완료
            </Button>
          </>
        }
      />
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef2}
        component={
          <>
            <DateTimePicker
              mode="range"
              locale="ko"
              selectedItemColor="#FF7F5F"
              startDate={duration.start}
              endDate={duration.end}
              onChange={({ startDate, endDate }: any) => {
                if (duration.start !== startDate || duration.end !== endDate) {
                  setDuration({ start: startDate, end: endDate });
                }
              }}
            />
            <Button
              variant="contained"
              style={{ marginHorizontal: 'auto' }}
              onPress={() => bottomSheetModalRef2.current?.dismiss()}
            >
              완료
            </Button>
          </>
        }
      />
    </View>
  );
}
const StyledView = styled(StaticView)`
  margin: 20px 0;
  gap: 20px;
  height: 100%;
`;
