import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import React, { useEffect, useState } from 'react';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import Button from '@/components/atoms/Button';
import { AvatarsService, UserService } from '@/apis';
import { Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';

const Index = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newImage, setImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    const data = await UserService().avatars();
    setProfileImage(data.image.url);
    setNickname(data.nickname);
    setEmail(data.email);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      console.log(result);

      setImage(result.assets[0].file || null);
    }
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const updateProfileImage = async () => {
    pickImage().then(() => {
      if (newImage) {
        const body = new FormData();
        body.append('file', newImage);
        body.append('request', {
          string: JSON.stringify({ defaultPhoto: false }),
          type: 'application/json',
        });
        AvatarsService()
          .photos(body)
          .then(() => {
            alert('프로필 사진 변경이 완료되었습니다.');
          })
          .catch(() => {
            alert('프로필 사진 변경 에러');
          });
      }
    });
  };

  return (
    <ManageView>
      <Typography variant="heading3">계정 정보</Typography>
      <ImageWrapper>
        <ProfileImage source={profileImage !== '' ? { uri: profileImage } : require('@/assets/images/profile.png')} />
        <Pressable onPress={updateProfileImage}>
          <CameraIcon source={require('@/assets/images/camera.png')} />
        </Pressable>
      </ImageWrapper>
      <ManageBoxView style={shadowStyles.shadow}>
        <LinkView>
          <Typography variant="body3">닉네임</Typography>
          <Typography variant="body3" style={{ color: colors.gray[9] }}>
            {nickname}
          </Typography>
        </LinkView>
        <LinkView last>
          <Typography variant="body3">이메일</Typography>
          <Typography variant="body3" style={{ color: colors.gray[9] }}>
            {email}
          </Typography>
        </LinkView>
      </ManageBoxView>
      <Withdrawal onPress={toggleModal}>
        <Typography variant="body3" style={{ color: colors.gray[9], textAlign: 'center' }}>
          회원 탈퇴
        </Typography>
      </Withdrawal>

      <ModalWrapper isModalVisible={isModalVisible} toggleModal={toggleModal}>
        <ModalContents>
          {true ? (
            <>
              <Typography variant="subtitle2">스터디장 계정 탈퇴</Typography>
              <Typography variant="body4" style={{ color: colors.black, textAlign: 'center' }}>
                스터디장인 경우{'\n'}스터디원에게 스터디장을 위임한 후{'\n'}탈퇴할 수 있습니다.
              </Typography>
              <Button
                variant="contained"
                onPress={() => {
                  toggleModal();
                }}
                style={{ marginHorizontal: 'auto' }}
              >
                스터디장 위임하기
              </Button>
            </>
          ) : (
            <>
              <Typography variant="subtitle1" style={{ color: colors.black, textAlign: 'center' }}>
                탈퇴 후 계정 복구는 불가합니다.{'\n'}
                정말로 탈퇴하시겠습니까?
              </Typography>
              <ButtonWrapper>
                <Button
                  variant="outlined"
                  onPress={() => {
                    toggleModal();
                  }}
                >
                  취소
                </Button>
                <Button
                  variant="contained"
                  onPress={() => {
                    toggleModal();
                  }}
                >
                  탈퇴하기
                </Button>
              </ButtonWrapper>
            </>
          )}
        </ModalContents>
      </ModalWrapper>
    </ManageView>
  );
};

export default Index;

const LinkView = styled.Pressable<{ last?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom-color: ${colors.gray[2]};
  border-bottom-width: ${({ last }) => (last ? 0 : 2)}px;
  align-items: center;
`;

const ImageWrapper = styled.View`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto;
`;

const CameraIcon = styled.Image`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 999px;
`;

const Withdrawal = styled.Pressable`
  margin: auto auto 0 auto;
`;

const ModalContents = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const ButtonWrapper = styled.View`
  margin-top: 10px;
  flex-direction: row;
  gap: 10px;
`;
