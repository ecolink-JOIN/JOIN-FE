import React from 'react';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import Typography from '../Typography';

interface TimePickerProps {
  time: string | null;
}

const TimePicker = ({ time }: TimePickerProps) => {
  return (
    <StyledTimePicker>
      <Typography variant="body2">{time || '00 : 00'}</Typography>
    </StyledTimePicker>
  );
};

export default TimePicker;

const StyledTimePicker = styled.View`
  border: 1px ${colors.gray[3]};
  border-radius: 8px;
  height: 50px;
  width: 84px;
  justify-content: center;
  align-items: center;
`;
