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
import { AvatarsService } from '@/apis';
import * as ImagePicker from 'expo-image-picker';

type FormValues = {
  nickname: string;
};

function NickNameGuide() {
  const { setProfileImage, setIsNickNameValid, setNickname } = useNickNameContext();
  const [image, setImage] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      nickname: '',
    },
  });
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].file || null);
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const nickname = watch('nickname');

  useEffect(() => {
    setValidationMessage('');
    setIsNickNameValid(false);
  }, [nickname, setIsNickNameValid]);

  const onSubmit = async (data: FormValues) => {
    const res = await AvatarsService().nicknameValid(nickname);
    console.log(nickname, res);

    if (data.nickname.length < 2 || data.nickname.length > 7) {
      setValidationMessage('2~7자리 한글 및 영문으로 입력해주세요.');
      setNickname('');
      setIsNickNameValid(false);
    } else {
      await AvatarsService()
        .nicknameValid(nickname)
        .then((res) => {
          if (res.valid) {
            setValidationMessage('사용 가능한 닉네임이에요.');
            setIsNickNameValid(true);
            setNickname(nickname);
          } else {
            setValidationMessage('이미 사용 중인 닉네임이에요.');
            setIsNickNameValid(false);
          }
        })
        .catch(() => {
          setValidationMessage('서버 에러입니다.');
          setIsNickNameValid(false);
        });
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
          <ProfileImage source={image ? { uri: image } : require('@/assets/images/profile.png')} />
          <Pressable onPress={pickImage}>
            <CameraIcon source={require('@/assets/images/camera.png')} />
          </Pressable>
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

const CameraIcon = styled.Image`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
  border-radius: 20px;
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
