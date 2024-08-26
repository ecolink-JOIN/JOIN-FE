import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import styled from 'styled-components/native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Icon, { IconTypes } from '../../atoms/Icon';
import { SvgProps } from 'react-native-svg';
import { colors } from '@/theme';

interface IconContainerProps {
  provider?: string;
}
const IconContainer = styled(Animated.View)<IconContainerProps>`
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  padding: 0;
  background-color: ${({ provider }) => {
    switch (provider) {
      case 'kakao':
        return '#FEE500';
      case 'naver':
        return '#05B918';
      case 'google':
        return colors.white;
      case 'apple':
        return colors.black;
      default:
        return 'transparent';
    }
  }};
`;

interface IconButtonProps extends PressableProps {
  provider: IconTypes;
  svgProps?: SvgProps;
  size?: number;
}

const IconButton: React.FC<IconButtonProps> = ({ svgProps, provider, ...rest }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(1.2);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...rest}>
      <IconContainer provider={provider} style={animatedStyle}>
        <Icon name={provider} width={48} height={48} />
      </IconContainer>
    </Pressable>
  );
};

export default IconButton;
