import React, { useCallback, useRef } from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import Typography from '../Typography';
import { colors } from '@/theme';
import Calander from '@/assets/images/Calander.svg';
import dayjs from 'dayjs';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface CustomStepperProps {
  placeholder: string;
  value: dayjs.Dayjs | null;
  setValue: any;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}

const CustomDatePicker: React.FC<CustomStepperProps> = ({ placeholder, value, bottomSheetModalRef }) => {
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef]);

  return (
    <Pressable onPress={handlePresentModalPress}>
      <StepperView>
        <Calander color={colors.gray[7]} />
        <Typography variant="body2" style={{ color: colors.gray[9] }}>
          {value ? value.format('YYYY-MM-DD') : placeholder}
        </Typography>
      </StepperView>
    </Pressable>
  );
};

export default CustomDatePicker;

const StepperView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  display: flex;
  width: 154px;
  height: 44px;
  padding: 8px 16px;
  border: 1px solid ${colors.gray[3]};
  border-radius: 8px;
  background-color: ${colors.white};
`;
