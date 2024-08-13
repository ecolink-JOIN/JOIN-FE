import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import StyledTextInput from '@/components/atoms/TextField';
import Typography from '@/components/atoms/Typography';

interface ReasonFormProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function ReasonForm(props: ReasonFormProps) {
  return (
    <View>
      <ReasonInput {...props} multiline={true} onChangeText={(text) => props.onChangeText(text)} value={props.value} />
      <TextLimit variant="body4">{props.value.length || 0} / 100</TextLimit>
    </View>
  );
}

const ReasonInput = styled(StyledTextInput)`
  text-align-vertical: top;
  font-size: 16px;
  font-family: 'Pretendard-Medium';
  margin-top: 10px;
  height: 160px;
  padding: 20px;
  border-radius: 12px;
  background-color: ${colors.sub2};
`;

const TextLimit = styled(Typography)`
  right: 20px;
  bottom: 40px;
  text-align: right;
  font-size: 12px;
  color: ${colors.gray[7]};
`;
