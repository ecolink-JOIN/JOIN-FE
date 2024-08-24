import { View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import StyledTextInput from '@/components/atoms/TextField';

interface ApplicationReasonProps {
  title: string;
  line?: number;
  placeholder: string;
  value: string;
  height?: number;
  onChangeText: (value: string) => void;
}

export default function NormalTextInput(props: ApplicationReasonProps) {
  return (
    <View>
      <Typography variant="button">{props.title}</Typography>
      <ReasonInput
        onChangeText={(text) => props.onChangeText(text)}
        value={props.value}
        placeholder={props.placeholder}
        style={{ height: props.height ? props.height : 44 }}
        multiline={props.height ? props.height > 44 : false}
      />
    </View>
  );
}

const ReasonInput = styled(StyledTextInput)`
  text-align-vertical: top;
  font-size: 16px;
  font-family: 'Pretendard-Medium';
  margin-top: 10px;
  padding: 12px 16px;
  border-radius: 12px;
`;
