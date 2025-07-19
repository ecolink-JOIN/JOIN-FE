import React from 'react';
import styled from 'styled-components/native';
import Typography from '../Typography';
import { colors } from '@/theme';
import { CustomDropdown } from '../Dropdown';

interface CustomDaypickerProps {
  value?: string | null;
  onChangeValue: (value: string | null, idx?: number) => void;
}
export const Days: { label: string; value: string }[] = [
  { label: '월요일', value: 'MON' },
  { label: '화요일', value: 'TUE' },
  { label: '수요일', value: 'WED' },
  { label: '목요일', value: 'THU' },
  { label: '금요일', value: 'FRI' },
  { label: '토요일', value: 'SAT' },
  { label: '일요일', value: 'SUN' },
];
const CustomDaypicker = ({ value, onChangeValue }: CustomDaypickerProps) => {
  return (
    <Container>
      <Typography variant="subtitle2" style={{ color: colors.gray[9] }}>
        요일
      </Typography>
      <DayBox variant="heading4">
        <CustomDropdown items={Days} placeholder={'요일'} onChangeValue={onChangeValue} defaultValue={value} />
      </DayBox>
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
  /* padding: 8px 40px; */
  width: 140px;
  border-radius: 8px;
`;
