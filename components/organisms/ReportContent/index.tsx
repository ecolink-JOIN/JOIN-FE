import React from 'react';
import styled from 'styled-components/native';
import { Controller } from 'react-hook-form';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';

const Content = styled.View`
  flex: 1;
  justify-content: flex-start;
`;

const InfoText = styled(Typography)`
  margin-top: 20px;
  margin-bottom: 16px;
  color: ${colors.gray[10]};
`;

const InputContainer = styled.View`
  margin-bottom: 20px;
`;

const TextInput = styled.TextInput`
  padding-vertical: 16px;
  padding-horizontal: 20px;
  border-width: 1px;
  border-color: ${colors.gray[3]};
  border-radius: 8px;
  height: 100px;
  text-align-vertical: top;
  font-family: 'Pretendard-Medium';
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.08px;
  text-align: left;
`;

const CharCount = styled(Typography)`
  margin-top: 8px;
  text-align: right;
  color: ${colors.gray[7]};
`;

interface ReportContentProps {
  control: any;
  maxLength: number;
  infoText: string;
}

const ReportContent: React.FC<ReportContentProps> = ({ control, maxLength, infoText }) => {
  return (
    <Content>
      <InfoText variant="button">{infoText}</InfoText>
      <InputContainer>
        <Controller
          control={control}
          name="inputValue"
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                maxLength={maxLength}
                placeholder="신고 내용을 입력해주세요. (최대 300자)"
                placeholderTextColor={colors.gray[7]}
              />
              <CharCount variant="caption1">
                {value.length} / {maxLength}
              </CharCount>
            </>
          )}
        />
      </InputContainer>
    </Content>
  );
};

export default ReportContent;
