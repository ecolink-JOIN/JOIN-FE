// 별도의 컴포넌트로 만들어야 한다고 하심
import React, { useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';

type DuplicateCheckButtonProps = {
  onPress: () => void;
};

function DuplicateCheckButton({ onPress }: DuplicateCheckButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9, // 버튼이 살짝 작아지게
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // 원래 크기로 돌아옴
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ transform: [{ scale: scaleAnim }] }}
    >
      <Typography variant="button">중복 확인</Typography>
    </AnimatedPressable>
  );
}

const AnimatedPressable = styled(Animated.createAnimatedComponent(Pressable))`
  margin-bottom: 12px;
  height: 36px;
  padding-vertical: 6px;
  padding-horizontal: 10px;
  background-color: ${colors.gray[4]};
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export default DuplicateCheckButton;
