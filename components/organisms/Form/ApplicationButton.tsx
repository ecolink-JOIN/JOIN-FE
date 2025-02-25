import React from 'react';
import Button from '@/components/atoms/Button';
import styled from 'styled-components/native';
import RowView from '@/components/atoms/View/RowView';

export default function ApplicationButton({ disabled, onPress }: { disabled: boolean; onPress: () => void }) {
  return (
    <ButtonView>
      <Button variant="contained" onPress={onPress} disabled={disabled}>
        신청 완료
      </Button>
    </ButtonView>
  );
}

const ButtonView = styled(RowView)`
  width: 100%;
  justify-content: center;
`;
