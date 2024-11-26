import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import React, { useState } from 'react';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import Button from '@/components/atoms/Button';

const Index = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <ManageView>
      <Typography variant="heading3">계정 정보</Typography>
      <ImageWrapper>
        <ProfileImage source={require('@/assets/images/profile.png')} />
        <CameraIcon source={require('@/assets/images/camera.png')} />
      </ImageWrapper>
      <ManageBoxView style={shadowStyles.shadow}>
        <LinkView>
          <Typography variant="body3">닉네임</Typography>
          <Typography variant="body3" style={{ color: colors.gray[9] }}>
            조인미현
          </Typography>
        </LinkView>
        <LinkView last>
          <Typography variant="body3">이메일</Typography>
          <Typography variant="body3" style={{ color: colors.gray[9] }}>
            email_join@gmail.com
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
