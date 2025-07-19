import React from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import Typography from '../Typography';
import { colors } from '@/theme';
import Minus from '@/assets/images/Minus.svg';
import Plus from '@/assets/images/Plus.svg';
import RowView from '../View/RowView';

interface CustomStepperProps {
  active: boolean;
  step: number;
  stepConverter: (step: number) => void;
}

const CustomStepper: React.FC<CustomStepperProps> = ({ active, step, stepConverter }) => {
  const color = active ? colors.gray[9] : colors.gray[6];
  return (
    <StepperView>
      <PressableView
        onPress={() => {
          if (step > 1) {
            stepConverter(step - 1);
          }
        }}
        disabled={!active}
      >
        <Minus color={color} />
      </PressableView>
      <Typography variant="body2" style={{ color: color }}>
        {step}
      </Typography>
      <PressableView
        onPress={() => {
          if (step < 20) {
            stepConverter(step + 1);
          }
        }}
        disabled={!active}
      >
        <Plus color={color} />
      </PressableView>
    </StepperView>
  );
};

export default CustomStepper;

const StepperView = styled(RowView)`
  align-items: center;
  justify-content: space-between;
  display: flex;
  width: 154px;
  height: 40px;
  padding: 8px 16px;
  border: 1px solid ${colors.gray[3]};
  border-radius: 8px;
  background-color: ${colors.gray[2]};
`;

const PressableView = styled(Pressable)`
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;
