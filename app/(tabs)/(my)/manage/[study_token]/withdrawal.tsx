import { ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ManageBoxView, ManageView, shadowStyles } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import styled from 'styled-components/native';
import Button from '@/components/atoms/Button';
import { ModalWrapper } from '@/components/molecules/ModalViews';

const users = [
  {
    id: 1,
    profile: require('@/assets/images/profile.png'),
    name: '닉네임1',
  },
  {
    id: 2,
    profile: require('@/assets/images/profile.png'),
    name: '닉네임2',
  },
  {
    id: 3,
    profile: require('@/assets/images/profile.png'),
    name: '닉네임3',
  },
  {
    id: 4,
    profile: require('@/assets/images/profile.png'),
    name: '닉네임4',
  },
  {
    id: 5,
    profile: require('@/assets/images/profile.png'),
    name: '닉네임5',
  },
  {
    id: 6,
    profile: require('@/assets/images/profile.png'),
    name: '닉네임6',
  },
];

const WidthDrawal = () => {
  const { id } = useLocalSearchParams();
  const [isApproveModalVisible, setIsApproveModalVisible] = React.useState(false);
  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = React.useState(false);

  const approveToggleModal = () => {
    setIsApproveModalVisible(!isApproveModalVisible);
  };

  const withdrawToggleModal = () => {
    setIsWithdrawModalVisible(!isWithdrawModalVisible);
  };
  return (
    <ScrollView>
      <ManageView>
        <Typography variant="heading3">탈퇴 요청 승인</Typography>
        <ManageBoxView style={[shadowStyles.shadow]}>
          <Typography
            variant="body3"
            style={{
              color: colors.gray[9],
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}
          >
            탈퇴 요청한 계정
          </Typography>
          <ContentsWrapper>
            {users.map((user) => (
              <Contents key={user.id}>
                <ProfileImage source={user.profile} style={{ width: 28, height: 28, borderRadius: 100 }} />
                <Typography variant="body3">{user.name}</Typography>
                <ApproveButton onPress={withdrawToggleModal}>
                  <Typography variant="body3" style={{ color: colors.primary }}>
                    탈퇴 승인
                  </Typography>
                </ApproveButton>
              </Contents>
            ))}
          </ContentsWrapper>
        </ManageBoxView>
      </ManageView>

      <ModalWrapper isModalVisible={isApproveModalVisible} toggleModal={approveToggleModal}>
        <ModalContents>
          <Typography variant="subtitle1">인증 승인 필요</Typography>
          <Typography variant="body4" style={{ textAlign: 'center' }}>
            해당 스터디원의 인증에 대한 승인이 미완료되어있어요!{'\n'}인증 승인을 완료하고 다시 시도해주세요.
          </Typography>
          <Button variant="contained" onPress={approveToggleModal} style={{ marginHorizontal: 'auto' }}>
            인증 승인하러 가기
          </Button>
        </ModalContents>
      </ModalWrapper>
      <ModalWrapper isModalVisible={isWithdrawModalVisible} toggleModal={withdrawToggleModal}>
        <ModalContents>
          <Typography variant="subtitle1" style={{ width: 150, height: 28 }}>
            스터디원 탈퇴 승인
          </Typography>
          <Typography variant="body4" style={{ textAlign: 'center' }}>
            해당 스터디원의 탈퇴를 승인합니다.{'\n'}‘확인'을 누르면 스터디에서 탈퇴처리됩니다.
          </Typography>
          <Button variant="contained" onPress={withdrawToggleModal} style={{ marginHorizontal: 'auto' }}>
            확인
          </Button>
        </ModalContents>
      </ModalWrapper>
    </ScrollView>
  );
};

export default WidthDrawal;
const ContentsWrapper = styled.Pressable`
  border-top-width: 2px;
  border-top-color: ${colors.gray[2]};
  padding: 16px 20px;
  gap: 20px;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  margin-right: 20px;
`;

const Contents = styled.View`
  align-items: center;
  flex-direction: row;
  border-bottom-color: ${colors.gray[3]};
`;

const ApproveButton = styled.Pressable`
  width: 80px;
  height: 32px;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.sub2};
  color: ${colors.primary};
`;

const ModalContents = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;
