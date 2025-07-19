import React from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import { Checkbox } from '@/components/atoms/Checkbox';

const ConsentTitle = `스터디장에게 (닉네임)님의 이력이 공개됩니다.`;
const ConsentInfo = `* 공개정보\n 1. 닉네임\n 2. 현재 참여중인 스터디 개수\n 3. 현재 참여중인 스터디 평균 참여율\n 4. 지난 스터디 개수 및 평균 참여율`;
const ConsentAgree = `정보 제공에 동의하십니까?`;

interface ApplicationConsentProps {
  agree: boolean;
  onChangeAgree: () => void;
}

export default function ApplicationConsent(props: ApplicationConsentProps) {
  return (
    <ConsentView>
      <Typography variant="body3">{ConsentTitle}</Typography>
      <Typography variant="caption2">{ConsentInfo}</Typography>
      <AgreeView onPressIn={props.onChangeAgree}>
        <Checkbox selected={props.agree} />
        <Typography variant="body4">{ConsentAgree}</Typography>
      </AgreeView>
    </ConsentView>
  );
}

const ConsentView = styled.View`
  gap: 10px;
  padding: 0 8px 24px 8px;
  background-color: ${colors.white};
`;

const AgreeView = styled.Pressable`
  width: 100%;
  gap: 4px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;
