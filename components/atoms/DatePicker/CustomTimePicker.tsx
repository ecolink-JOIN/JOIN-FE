import React from 'react';
import Typography from '../Typography';
import { colors } from '@/theme';
import styled from 'styled-components/native';
import { TextInput, View } from 'react-native';

interface CustomTimePickerProps {
  title: string;
  value?: string;
  onChangeValue: (value: string | null, idx?: number) => void;
}

const CustomTimePicker = ({ title, value, onChangeValue }: CustomTimePickerProps) => {
  const [hour, setHour] = React.useState<string | null>(value?.split(':')[0] || null);
  const [minute, setMinute] = React.useState<string | null>(value?.split(':')[1] || null);

  React.useEffect(() => {
    onChangeValue(`${hour?.padStart(2, '0')}:${minute?.padStart(2, '0')}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, minute]);

  const handleHourChange = (value: string) => {
    value = value.replace(/[^0-9]/g, '');
    if (value.length > 2 && value.startsWith('0')) {
      if (parseInt(value) > 23) setHour('23');
      else setHour(value.slice(1));
    } else if (parseInt(value) > 23) setHour('23');
    else setHour(value);
  };

  const handleMinuteChange = (value: string) => {
    value = value.replace(/[^0-9]/g, '');
    if (value.length > 2 && value.startsWith('0')) {
      if (parseInt(value) > 59) setMinute('59');
      else setMinute(value.slice(1));
    } else if (parseInt(value) > 59) setMinute('59');
    else setMinute(value);
  };

  return (
    <Container>
      <Typography variant="subtitle2" style={{ color: colors.gray[9] }}>
        {title}
      </Typography>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TimeBox onChangeText={handleHourChange} value={hour || ''} />
        <Typography variant="heading1">:</Typography>
        <TimeBox onChangeText={handleMinuteChange} value={minute || ''} />
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

const TimeBox = styled(TextInput)`
  padding: 8px 16px;
  border-radius: 8px;
  background-color: ${colors.gray[2]};
  font-size: 22px;
`;
