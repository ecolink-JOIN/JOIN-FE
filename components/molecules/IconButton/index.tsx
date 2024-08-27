import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import styled from 'styled-components/native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Icon, { IconTypes } from '../../atoms/Icon';
import { SvgProps } from 'react-native-svg';

const IconContainer = styled(Animated.View)`
  justify-content: center;
  align-items: center;
  padding: 0;
`;

interface IconButtonProps extends PressableProps {
  name: IconTypes;
  svgProps?: SvgProps;
  size?: number;
}

const IconButton: React.FC<IconButtonProps> = ({ name, svgProps, ...rest }) => {
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
      <IconContainer style={animatedStyle}>
        <Icon name={name} {...svgProps} />
      </IconContainer>
    </Pressable>
  );
};

export default IconButton;
