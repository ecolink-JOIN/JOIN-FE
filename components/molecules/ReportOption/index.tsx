import React from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';
import { colors } from '@/theme';

interface ReportOptionProps {
  onPress: () => void;
  text: string;
  color?: string;
}

const Container = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 18px;
`;

const ReportOption: React.FC<ReportOptionProps> = ({ onPress, text, color = colors.gray[10] }) => {
  return (
    <Container onPress={onPress}>
      <Typography
        variant="body3"
        style={{
          color,
        }}
      >
        {text}
      </Typography>
      <Icon name="arrow-right" />
    </Container>
  );
};

export default ReportOption;
