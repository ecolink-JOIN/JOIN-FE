import React from 'react';
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

export default function RecruitBaseInfo() {
  return (
    <StyledView>
      <Typography variant="heading4">스터디 기본 정보를 입력해주세요.</Typography>
      <Category />
      <Nums />
      <EndDate />
      <MeetingWay />
      <MeetingLocation />
      <ActivateDuration />
      <DateTime />
    </StyledView>
  );
}

const StyledView = styled.View`
  margin: 20px 0;
  gap: 20px;
`;
