import React from 'react';
import styled from 'styled-components/native';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import { Pressable } from 'react-native';

interface TermsOptionProps {
  text: string;
  checked: boolean;
  type: Terms.BaseDto['type'];
  onCheckChange: () => void;
  onViewPress: () => void;
}

const Container = styled.Pressable`
  padding-vertical: 12px;
`;

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const IconRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const TermsOption: React.FC<TermsOptionProps> = ({ text, checked, type, onCheckChange, onViewPress }) => {
  return (
    <Container onPress={onCheckChange}>
      <Row>
        <IconRow>
          <Icon name="thin-check" stroke={checked ? colors.primary : colors.gray[6]} />
          <Typography variant="body2">
            {text}
            {type === 'REQUIRED' ? ' (필수)' : ' (선택)'}
          </Typography>
        </IconRow>
        <Pressable onPress={onViewPress}>
          <Typography variant="body1" style={{ color: colors.gray[8] }}>
            보기
          </Typography>
        </Pressable>
      </Row>
    </Container>
  );
};

export default TermsOption;
