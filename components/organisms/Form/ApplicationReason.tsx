import { View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import ReasonForm from '@/components/atoms/TextField/ReasonForm';
import { colors } from '@/theme';

interface ApplicationReasonProps {
  value: string;
  onChangeText: (value: string) => void;
}

export default function ApplicationReason(props: ApplicationReasonProps) {
  return (
    <ReasonView>
      <ReasonDesc variant="button">스터디에 지원한 이유를 작성해주세요.</ReasonDesc>
      <ReasonForm placeholder={'최소 10자 이상 입력해주세요.'} {...props} />
    </ReasonView>
  );
}

const ReasonDesc = styled(Typography)`
  color: ${colors.primary};
  margin-top: 24px;
`;

const ReasonView = styled(View)`
  padding-top: 24px;
  background-color: ${colors.white};
`;
