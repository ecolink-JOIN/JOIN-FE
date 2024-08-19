import React from 'react';
import { Animated, Pressable } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '@/theme';

interface CustomSwitchProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
}

const SwitchContainer = styled(Pressable)`
  width: 52px;
  height: 32px;
  justify-content: center;
`;

const SwitchTrack = styled(Animated.View)<{ active: boolean }>`
  width: 100%;
  height: 100%;
  background-color: ${({ active }) => (active ? colors.primary : colors.gray[3])};
  border-radius: 16px;
  justify-content: center;
`;

const SwitchThumb = styled(Animated.View)`
  width: 24px;
  height: 24px;
  background-color: ${colors.white};
  border-radius: 12px;
  position: absolute;
  top: 4px;
`;

const CustomSwitch: React.FC<CustomSwitchProps> = ({ value = false, onValueChange }) => {
  const position = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(position, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [position, value]);

  const thumbPosition = position.interpolate({
    inputRange: [0, 1],
    outputRange: [4, 24],
  });

  const handlePress = () => {
    if (onValueChange) {
      onValueChange(!value);
    }
  };

  return (
    <SwitchContainer onPress={handlePress}>
      <SwitchTrack active={value}>
        <SwitchThumb
          style={{
            transform: [{ translateX: thumbPosition }],
          }}
        />
      </SwitchTrack>
    </SwitchContainer>
  );
};

export default CustomSwitch;
