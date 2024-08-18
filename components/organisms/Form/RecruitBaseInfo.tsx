import React, { useRef } from 'react';
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

export default function RecruitBaseInfo() {
  const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  return (
    <StyledView>
      <Typography variant="heading4">스터디 기본 정보를 입력해주세요.</Typography>
      <Category />
      <Nums />
      <EndDate value={endDate} setValue={setEndDate} bottomSheetModalRef={bottomSheetModalRef} />
      <MeetingWay />
      <MeetingLocation />
      <ActivateDuration />
      <DateTime />
      <BottomSheetComp value={endDate} setValue={setEndDate} bottomSheetModalRef={bottomSheetModalRef} />
    </StyledView>
  );
}

const StyledView = styled.View`
  margin: 20px 0;
  gap: 20px;
  height: 100%;
`;
