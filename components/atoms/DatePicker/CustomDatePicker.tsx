import React, { useCallback } from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import Typography from '../Typography';
import { colors } from '@/theme';
import Calander from '@/assets/images/Calander.svg';
import dayjs from 'dayjs';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import RowView from '../View/RowView';

interface CustomStepperProps {
  placeholder: string;
  value: string | null;
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
          {value !== undefined && value !== null && dayjs(value).isValid()
            ? dayjs(value).format('YYYY-MM-DD')
            : placeholder}
        </Typography>
      </StepperView>
    </Pressable>
  );
};

export default CustomDatePicker;

const StepperView = styled(RowView)`
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
