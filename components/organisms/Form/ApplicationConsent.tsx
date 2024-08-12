import React, { Component } from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import { Checkbox } from '@/components/atoms/Checkbox';

const ConsentTitle = `스터디장에게 (닉네임)님의 이력이 공개됩니다.`;
const ConsentInfo = `* 공개정보\n 1. 닉네임\n 2. 현재 참여중인 스터디 개수\n 3. 현재 참여중인 스터디 평균 참여율\n 4. 지난 스터디 개수 및 평균 참여율`;

export default class ApplicationConsent extends Component {
  render() {
    return (
      <ConsentView>
        <Typography variant="body3">{ConsentTitle}</Typography>
        <Typography variant="caption2">{ConsentInfo}</Typography>
        {/* <Checkbox /> */}
      </ConsentView>
    );
  }
}

const ConsentView = styled.View`
  padding: 0 28px 24px 28px;
  background-color: ${colors.white};
`;
