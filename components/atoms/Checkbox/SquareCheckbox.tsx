import React from 'react';
import { Animated, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import Icon from '../Icon';

interface CustomCheckboxProps {
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

const CheckboxContainer = styled(Pressable)`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

const CheckboxOuter = styled(Animated.View)<{ selected: boolean }>`
  width: 18px;
  height: 18px;
  background-color: ${({ selected }) => (selected ? colors.sub2 : colors.white)};
  border-width: 2px;
  border-color: ${({ selected }) => (selected ? colors.primary : colors.gray[4])};
  border-radius: 2px;
  justify-content: center;
  align-items: center;
`;

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ selected = false, onSelect }) => {
  const handlePress = () => {
    if (onSelect) {
      onSelect(!selected);
    }
  };

  return (
    <CheckboxContainer onPress={handlePress}>
      <CheckboxOuter selected={selected}>{selected && <Icon name="check" />}</CheckboxOuter>
    </CheckboxContainer>
  );
};

export default CustomCheckbox;
