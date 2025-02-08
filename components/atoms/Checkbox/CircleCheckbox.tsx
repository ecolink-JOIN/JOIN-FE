import React from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import Icon from '../Icon';

interface CustomCircleCheckboxProps {
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

const CircleCheckboxContainer = styled(Pressable)`
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
`;

const CircleCheckboxOuter = styled.View<{ selected: boolean }>`
  width: 20px;
  height: 20px;
  border-width: 2px;
  border-color: ${({ selected }) => (selected ? colors.primary : colors.gray[4])};
  border-radius: 12px;
  background-color: ${({ selected }) => (selected ? colors.primary : colors.gray[4])};
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CustomCircleCheckbox: React.FC<CustomCircleCheckboxProps> = ({ selected = false, onSelect }) => {
  const handlePress = () => {
    if (onSelect) {
      onSelect(!selected);
    }
  };

  return (
    <CircleCheckboxContainer onPress={handlePress}>
      <CircleCheckboxOuter selected={selected}>
        <Icon name="check-outline" />
      </CircleCheckboxOuter>
    </CircleCheckboxContainer>
  );
};

export default CustomCircleCheckbox;
