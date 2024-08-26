import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Keyboard, View, TouchableWithoutFeedback } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@/components/atoms/TextField';
import Typography from '@/components/atoms/Typography';
import ContentView from '@/components/atoms/View/ContentView';
import RowView from '@/components/atoms/View/RowView';
import Button from '@/components/atoms/Button';
import { useNickNameContext } from '@/context/NickNameContext';

type FormValues = {
  nickname: string;
};

function NickNameGuide() {
  const { setIsNickNameValid } = useNickNameContext();
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

  const onSubmit = (data: FormValues) => {
    if (data.nickname.length < 2 || data.nickname.length > 7) {
      setValidationMessage('2~7자리 한글 및 영문으로 입력해주세요.');
      setIsNickNameValid(false);
    } else if (data.nickname === 'existingNickname') {
      setValidationMessage('이미 사용 중인 닉네임이에요.');
      setIsNickNameValid(false);
    } else {
      setValidationMessage('사용 가능한 닉네임이에요.');
      setIsNickNameValid(true);
    }
  };

  const getMessageColor = () => {
    if (validationMessage === '사용 가능한 닉네임이에요.') {
      return 'blue';
    }
    return 'red';
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ContentView style={{ gap: 20 }}>
        <ProfileContainer>
          <ProfileImage source={require('@/assets/images/profile.png')} />
          <CameraIcon source={require('@/assets/images/camera.png')} />
        </ProfileContainer>
        <View style={{ width: '100%', gap: 12 }}>
          <RowView>
            <Controller
              name="nickname"
              control={control}
              render={({ field: { onChange, value } }) => (
                <StyledTextField value={value} onChangeText={onChange} placeholder="닉네임을 입력하세요" />
              )}
            />
            <Button variant="outlined" onPress={handleSubmit(onSubmit)}>
              <Typography variant="button">중복 확인</Typography>
            </Button>
          </RowView>
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
  border-radius: 50%;
  margin-top: 20px;
`;

const ProfileImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const CameraIcon = styled.Image`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const StyledTextField = styled(TextField)`
  flex: 1;
  margin-right: 8px;
`;

const ValidationMessage = styled(Typography).attrs({
  variant: 'body3',
})<Partial<React.ComponentProps<typeof Typography>> & { color: string }>`
  color: ${({ color }) => color};
`;

export default NickNameGuide;
