import React from 'react';
import Typography from '../Typography';
import { colors } from '@/theme';
import styled from 'styled-components/native';
import { View } from 'react-native';

const CustomTimePicker = ({ title }: { title: string }) => {
  return (
    <Container>
      <Typography variant="subtitle2" style={{ color: colors.gray[9] }}>
        {title}
      </Typography>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TimeBox variant="heading4">12</TimeBox>
        <Typography variant="heading1">:</Typography>
        <TimeBox variant="heading4">30</TimeBox>
      </View>
    </Container>
  );
};

export default CustomTimePicker;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const TimeBox = styled(Typography)`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${colors.gray[2]};
`;
