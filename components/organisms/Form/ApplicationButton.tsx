import React from 'react';
import Button from '@/components/atoms/Button';
import styled from 'styled-components/native';
import RowView from '@/components/atoms/View/RowView';

export default function ApplicationButton({ disabled, onPressIn }: { disabled: boolean; onPressIn: () => void }) {
  return (
    <ButtonView>
      <Button variant="contained" onPressIn={onPressIn} disabled={disabled}>
        신청 완료
      </Button>
    </ButtonView>
  );
}

const ButtonView = styled(RowView)`
  width: 100%;
  justify-content: center;
`;
