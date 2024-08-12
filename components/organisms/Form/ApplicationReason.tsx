import { View } from 'react-native';
import React, { Component } from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import ReasonForm from '@/components/atoms/TextField/ReasonForm';
import { colors } from '@/theme';

export default class ApplicationReason extends Component {
  render() {
    return (
      <ReasonView>
        <ReasonDesc variant="button">스터디에 지원한 이유를 작성해주세요.</ReasonDesc>
        <ReasonForm placeholder={'최소 10자 이상 입력해주세요.'} />
      </ReasonView>
    );
  }
}

const ReasonDesc = styled(Typography)`
  color: ${colors.primary};
  margin-top: 24px;
`;

const ReasonView = styled(View)`
  padding: 24px 20px 0 20px;
  background-color: ${colors.white};
`;
