import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import React, { useEffect, useState } from 'react';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import Button from '@/components/atoms/Button';
import { AvatarsService, UserService } from '@/apis';
import { Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store';

const Index = () => {
  const router = useRouter();
  const { clearUser } = useUserStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [isCheckingWithdraw, setIsCheckingWithdraw] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    const data = await UserService().avatars();
    setProfileImage(data.image.url);
    setNickname(data.nickname);
    setEmail(data.email);
  };

  const toggleModal = async () => {
    if (!isModalVisible) {
      // 모달 열 때 탈퇴 가능 여부 확인
      setIsCheckingWithdraw(true);
      try {
        await AvatarsService().checkWithdraw();
        setCanWithdraw(true);
      } catch (error: any) {
        console.error('탈퇴 가능 여부 확인 실패:', error);
        // 스터디장인 경우 탈퇴 불가
        setCanWithdraw(false);
      } finally {
        setIsCheckingWithdraw(false);
      }
    }
    setIsModalVisible(!isModalVisible);
  };

  const handleWithdraw = async () => {
    try {
      await AvatarsService().withdraw();
      Alert.alert('회원 탈퇴', '회원 탈퇴가 완료되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            // 로그아웃 처리 및 로그인 화면으로 이동
            AvatarsService()
              .logout()
              .finally(() => {
                // Zustand store 초기화
                clearUser();
                router.replace('/(auth)');
              });
          },
        },
      ]);
    } catch (error: any) {
      console.error('회원 탈퇴 실패:', error);
      Alert.alert('회원 탈퇴 실패', '회원 탈퇴에 실패했습니다.\n잠시 후 다시 시도해주세요.');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      // 확인 팝업 표시
      Alert.alert('프로필 사진 변경', '선택한 사진으로 프로필을 변경하시겠습니까?', [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: async () => {
            try {
              // UI 먼저 업데이트
              setProfileImage(imageUri);

              // 파일명 추출
              const filename = imageUri.split('/').pop() || 'profile.jpg';
              const match = /\.(\w+)$/.exec(filename);
              const type = match ? `image/${match[1]}` : 'image/jpeg';

              // API 호출
              const body = new FormData();
              body.append('file', {
                uri: imageUri,
                name: filename,
                type: type,
              } as any);
              body.append('request', {
                string: JSON.stringify({ defaultPhoto: false }),
                type: 'application/json',
              });

              await AvatarsService().photos(body);
              Alert.alert('완료', '프로필 사진이 변경되었습니다.');

              // 프로필 정보 새로고침
              await fetchInfo();
            } catch (error) {
              console.error('프로필 사진 변경 에러:', error);
              Alert.alert('오류', '프로필 사진 변경에 실패했습니다.');
            }
          },
        },
      ]);
    }
  };

  return (
    <ManageView>
      <Typography variant="heading3">계정 정보</Typography>
      <ImageWrapper>
        <ProfileImage source={profileImage !== '' ? { uri: profileImage } : require('@/assets/images/profile.png')} />
        <Pressable onPress={pickImage}>
          <CameraIcon source={require('@/assets/images/camera.png')} />
        </Pressable>
      </ImageWrapper>
      <ManageBoxView style={shadowStyles.shadow}>
        <LinkView onPress={() => router.push('/(tabs)/(my)/myinfo/preference')}>
          <Typography variant="body3">선호 설정</Typography>
          <Typography variant="body3" style={{ color: colors.gray[9] }}>
            {'›'}
          </Typography>
        </LinkView>
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
          {isCheckingWithdraw ? (
            <>
              <Typography variant="subtitle2">확인 중...</Typography>
              <Typography variant="body4" style={{ color: colors.gray[8], textAlign: 'center' }}>
                탈퇴 가능 여부를 확인하고 있습니다.
              </Typography>
            </>
          ) : !canWithdraw ? (
            <>
              <Typography variant="subtitle2">스터디장 계정 탈퇴</Typography>
              <Typography variant="body4" style={{ color: colors.black, textAlign: 'center' }}>
                스터디장인 경우{'\n'}스터디원에게 스터디장을 위임한 후{'\n'}탈퇴할 수 있습니다.
              </Typography>
              <Button
                variant="contained"
                onPress={() => {
                  toggleModal();
                  // 마이페이지의 운영 중인 스터디 탭으로 이동
                  router.push('/(tabs)/(my)');
                }}
                style={{ marginHorizontal: 'auto' }}
              >
                스터디 관리하기
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
                    handleWithdraw();
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
