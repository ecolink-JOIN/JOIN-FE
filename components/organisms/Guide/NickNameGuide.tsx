import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Keyboard, View, TouchableWithoutFeedback, TextInput, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Typography from '@/components/atoms/Typography';
import ContentView from '@/components/atoms/View/ContentView';
import RowView from '@/components/atoms/View/RowView';
import { useNickNameContext } from '@/context/NickNameContext';
import { colors } from '@/theme';
import DuplicateCheckButton from '@/components/atoms/DuplicateCheckButton';
import ImageSettingsButton from '@/components/molecules/ImageSettingsButton';

type FormValues = {
  nickname: string;
};

function NickNameGuide() {
  const { setIsNickNameValid, setNickname } = useNickNameContext();
  const [validationMessage, setValidationMessage] = useState<string>('');
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      nickname: '',
    },
  });

  const nickname = watch('nickname');

  useEffect(() => {
    setValidationMessage('');
    setIsNickNameValid(false);
  }, [nickname, setIsNickNameValid]);

  const onSubmit = async (data: FormValues) => {
    if (data.nickname.length < 2 || data.nickname.length > 7) {
      setValidationMessage('2~7자리 한글 및 영문으로 입력해주세요.');
      setNickname('');
      setIsNickNameValid(false);
    } else if (data.nickname === 'existingNickname') {
      setValidationMessage('이미 사용 중인 닉네임이에요.');
      setNickname('');
      setIsNickNameValid(false);
    } else {
      setValidationMessage('사용 가능한 닉네임이에요.');
      setIsNickNameValid(true);
      setNickname(nickname);
    }
  };

  const getMessageColor = () => {
    return validationMessage === '사용 가능한 닉네임이에요.' ? 'blue' : 'red';
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ContentView style={{ gap: 20 }}>
        <ProfileContainer>
          <ProfileImage source={require('@/assets/images/profile.png')} />
          <ImageSettingsButton />
        </ProfileContainer>
        <View style={{ width: '100%', gap: 12 }}>
          <TextFieldContainer>
            <RowView>
              <Controller
                name="nickname"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledTextField value={value} onChangeText={onChange} placeholder="닉네임을 입력하세요" />
                )}
              />
              <DuplicateCheckButton onPress={handleSubmit(onSubmit)} />
            </RowView>
          </TextFieldContainer>
          <ValidationMessage color={getMessageColor()}>{validationMessage || ' '}</ValidationMessage>
        </View>
        <Typography variant="body2">닉네임은 추후에 변경할 수 없어요.{'\n'}신중하게 닉네임을 설정해주세요.</Typography>
      </ContentView>
    </TouchableWithoutFeedback>
  );
}

const ProfileContainer = styled.View`
  position: relative;
  align-self: center;
  width: 140px;
  height: 140px;
  border-radius: 70px;
  margin-top: 20px;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const TextFieldContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray[7]};
`;

const StyledTextField = styled(TextInput)`
  flex: 1;
  margin-right: 8px;
  margin-bottom: 12px;
`;

const ValidationMessage = styled(Typography).attrs({
  variant: 'body3',
})<Partial<React.ComponentProps<typeof Typography>> & { color: string }>`
  color: ${({ color }) => color};
`;

export default NickNameGuide;
