import React, { useState, forwardRef, Ref } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '@/theme';

const StyledTextInput = styled(TextInput)<{ isFocused: boolean }>`
  font: 500 16px 'Pretendard-Medium';
  letter-spacing: -0.5%;
  width: 100%;
  height: 44px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.isFocused ? colors.primary : colors.gray[3])};
  padding: 10px 16px;
  background-color: ${colors.white};
  color: ${colors.black};
`;

interface TextFieldProps extends TextInputProps {}

const TextField = forwardRef<TextInput, TextFieldProps>((props, ref: Ref<TextInput>) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <StyledTextInput
      {...props}
      ref={ref}
      isFocused={isFocused}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholderTextColor={colors.gray[7]}
    />
  );
});

TextField.displayName = 'TextField';

export default TextField;
