import { View } from 'react-native';
import React from 'react';
import Button from '@/components/atoms/Button';
import styled from 'styled-components/native';
import { router } from 'expo-router';

export default function ApplicationButton({ disabled }: { disabled: boolean }) {
  const handleApplicationPress = () => {
    router.replace('/(tabs)');
  };
  return (
    <ButtonView>
      <Button variant="contained" onPress={handleApplicationPress} disabled={disabled}>
        신청 완료
      </Button>
    </ButtonView>
  );
}

const ButtonView = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;
