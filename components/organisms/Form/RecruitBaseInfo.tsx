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
import BottomSheetComp from '@/components/organisms/BottomSheet';
import dayjs from 'dayjs';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import DateTimePicker from 'react-native-ui-datepicker';

interface durationProps {
  start: dayjs.Dayjs | null;
  end: dayjs.Dayjs | null;
}

export default function RecruitBaseInfo() {
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [duration, setDuration] = useState<durationProps>({ start: null, end: null });
  const bottomSheetModalRef1 = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);
  const [online, setOnline] = useState(true);
  return (
    <StyledView>
      <Typography variant="heading4">스터디 기본 정보를 입력해주세요.</Typography>
      <Category />
      <Nums />
      <EndDate value={endDate} bottomSheetModalRef={bottomSheetModalRef1} />
      <MeetingWay online={online} setOnline={setOnline} />
      {online || <MeetingLocation />}
      <ActivateDuration value={duration} bottomSheetModalRef={bottomSheetModalRef2} />
      <DateTime />
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef1}
        component={
          <DateTimePicker
            mode="single"
            date={endDate || new Date()}
            onChange={(params: any) => {
              setEndDate(params.date);
              bottomSheetModalRef1.current?.dismiss();
            }}
          />
        }
      />
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef2}
        component={
          <DateTimePicker
            mode="range"
            startDate={duration.start}
            endDate={duration.end}
            onChange={({ startDate, endDate }: any) => {
              if (duration.start !== startDate || duration.end !== endDate) {
                setDuration({ start: startDate, end: endDate });
              }
              startDate && endDate && bottomSheetModalRef2.current?.dismiss();
            }}
          />
        }
      />
    </StyledView>
  );
}

const StyledView = styled.View`
  margin: 20px 0;
  gap: 20px;
  height: 100%;
`;
