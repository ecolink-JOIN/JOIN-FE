import React from 'react';
import styled from 'styled-components/native';
import Typography from '../Typography';
import { colors } from '@/theme';

const Days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

const CustomDaypicker = () => {
  return (
    <Container>
      <Typography variant="subtitle2" style={{ color: colors.gray[9] }}>
        요일
      </Typography>
      <DayBox variant="heading4">화요일</DayBox>
    </Container>
  );
};

export default CustomDaypicker;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const DayBox = styled(Typography)`
  padding: 8px 40px;
  border-radius: 8px;
  background-color: ${colors.gray[2]};
`;
