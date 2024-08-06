import React from 'react';
import { Pressable, View } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '@/theme';

interface CustomRadioProps {
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

const RadioContainer = styled(Pressable)`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

const RadioOuterCircle = styled(View)<{ selected: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${({ selected }) => (selected ? colors.primary : colors.gray[3])};
  background-color: transparent;
  justify-content: center;
  align-items: center;
`;

const RadioInnerCircle = styled(View)<{ selected: boolean }>`
  width: ${(props) => (props.selected ? '10px' : '0px')};
  height: ${(props) => (props.selected ? '10px' : '0px')};
  border-radius: 6px;
  background-color: ${colors.primary};
`;

const CustomRadio: React.FC<CustomRadioProps> = ({ selected = false, onSelect }) => {
  const handlePress = () => {
    if (onSelect) {
      onSelect(!selected);
    }
  };

  return (
    <RadioContainer onPress={handlePress}>
      <RadioOuterCircle selected={selected}>
        <RadioInnerCircle selected={selected} />
      </RadioOuterCircle>
    </RadioContainer>
  );
};

export default CustomRadio;
