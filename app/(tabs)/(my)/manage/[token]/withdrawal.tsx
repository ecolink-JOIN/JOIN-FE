import { ScrollView, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
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
  const [selectedWithdrawId, setSelectedWithdrawId] = useState<number | null>(null);
  const [selectedNickname, setSelectedNickname] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    data: requestList,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['withdrawRequestList', token],
    queryFn: () => WithdrawService().getRequest(token),
    enabled: !!token,
  });

  const handleApprovePress = (withdrawId: number, nickname: string) => {
    setSelectedWithdrawId(withdrawId);
    setSelectedNickname(nickname);
  };

  const handleApprove = async () => {
    if (!selectedWithdrawId || isProcessing) return;

    try {
      setIsProcessing(true);
      await WithdrawService().approveWithdraw(token, selectedWithdrawId);

      Alert.alert('완료', '탈퇴가 승인되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            setSelectedWithdrawId(null);
            setSelectedNickname('');
            refetch();
          },
        },
      ]);
    } catch (error: any) {
      console.error('탈퇴 승인 실패:', error);
      Alert.alert('오류', '탈퇴 승인에 실패했습니다.\n잠시 후 다시 시도해주세요.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleModalClose = () => {
    if (!isProcessing) {
      setSelectedWithdrawId(null);
      setSelectedNickname('');
    }
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
            {isLoading ? (
              <LoadingWrapper>
                <ActivityIndicator size="large" color={colors.primary} />
              </LoadingWrapper>
            ) : requestList && requestList.length > 0 ? (
              requestList.map((user) => (
                <Contents key={user.withdrawId}>
                  <ProfileImage
                    source={
                      user.profileImage?.url ? { uri: user.profileImage.url } : require('@/assets/images/profile.png')
                    }
                  />
                  <Typography variant="body3">{user.nickname}</Typography>
                  <ApproveButton onPress={() => handleApprovePress(user.withdrawId, user.nickname)}>
                    <Typography variant="body3" style={{ color: colors.primary }}>
                      탈퇴 승인
                    </Typography>
                  </ApproveButton>
                </Contents>
              ))
            ) : (
              <EmptyMessage>
                <Typography variant="body3" style={{ color: colors.gray[9] }}>
                  탈퇴 요청한 계정이 없습니다.
                </Typography>
              </EmptyMessage>
            )}
          </ContentsWrapper>
        </ManageBoxView>
      </ManageView>

      <ModalWrapper isModalVisible={selectedWithdrawId !== null} toggleModal={handleModalClose}>
        <ModalContents>
          <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
            스터디원 탈퇴 승인
          </Typography>
          <Typography variant="body4" style={{ textAlign: 'center', color: colors.gray[8] }}>
            <Typography variant="body4" style={{ fontWeight: 'bold', color: colors.black }}>
              {selectedNickname}
            </Typography>
            님의 탈퇴를 승인하시겠습니까?{'\n'}
            승인 후에는 해당 스터디원이{'\n'}
            스터디에서 탈퇴 처리됩니다.
          </Typography>
          <ButtonWrapper>
            <Button variant="outlined" onPress={handleModalClose} disabled={isProcessing}>
              취소
            </Button>
            <Button variant="contained" onPress={handleApprove} disabled={isProcessing}>
              {isProcessing ? '처리 중...' : '승인'}
            </Button>
          </ButtonWrapper>
        </ModalContents>
      </ModalWrapper>
    </ScrollView>
  );
};

export default WidthDrawal;

const ContentsWrapper = styled.View`
  border-top-width: 2px;
  border-top-color: ${colors.gray[2]};
  padding: 16px 20px;
  gap: 20px;
`;

const LoadingWrapper = styled.View`
  padding: 40px 0;
  align-items: center;
  justify-content: center;
`;

const EmptyMessage = styled.View`
  padding: 40px 0;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.Image`
  width: 28px;
  height: 28px;
  border-radius: 100px;
  margin-right: 12px;
`;

const Contents = styled.View`
  align-items: center;
  flex-direction: row;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray[2]};
`;

const ApproveButton = styled.Pressable`
  width: 80px;
  height: 32px;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.sub2};
`;

const ModalContents = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const ButtonWrapper = styled.View`
  margin-top: 10px;
  flex-direction: row;
  gap: 10px;
`;
