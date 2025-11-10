import { ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ManageBoxView, ManageView, shadowStyles } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import styled from 'styled-components/native';
import Button from '@/components/atoms/Button';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import { WithdrawService } from '@/apis';
import { useQuery } from '@tanstack/react-query';

const WidthDrawal = () => {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [isApproveModalVisible, setIsApproveModalVisible] = React.useState(false);
  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = React.useState(false);
  const [selectedWithdrawId, setSelectedWithdrawId] = React.useState<number | null>(null);
  const { data: requestList, refetch } = useQuery({
    queryKey: ['requestList', token],
    queryFn: () => WithdrawService().getRequest(token),
  });

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
            {requestList && requestList.length > 0 ? (
              requestList.map((user) => (
                <Contents key={user.withdrawId}>
                  <ProfileImage
                    source={{ uri: user.profileImage?.url }}
                    style={{ width: 28, height: 28, borderRadius: 100 }}
                  />
                  <Typography variant="body3">{user.nickname}</Typography>
                  <ApproveButton onPress={() => setSelectedWithdrawId(user.withdrawId)}>
                    <Typography variant="body3" style={{ color: colors.primary }}>
                      탈퇴 승인
                    </Typography>
                  </ApproveButton>
                </Contents>
              ))
            ) : (
              <Typography variant="body3" style={{ color: colors.gray[9] }}>
                탈퇴 요청한 계정이 없습니다.
              </Typography>
            )}
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
      <ModalWrapper isModalVisible={selectedWithdrawId !== null} toggleModal={withdrawToggleModal}>
        <ModalContents>
          <Typography variant="subtitle1" style={{ width: 150, height: 28 }}>
            스터디원 탈퇴 승인
          </Typography>
          <Typography variant="body4" style={{ textAlign: 'center' }}>
            해당 스터디원의 탈퇴를 승인합니다.{'\n'}‘확인'을 누르면 스터디에서 탈퇴처리됩니다.
          </Typography>
          <Button
            variant="contained"
            onPress={() =>
              WithdrawService()
                .approveWithdraw(token, selectedWithdrawId!)
                .finally(() => {
                  setSelectedWithdrawId(null);
                  setIsWithdrawModalVisible(false);
                  refetch();
                })
            }
            style={{ marginHorizontal: 'auto' }}
          >
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
