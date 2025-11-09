import { View, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import { styled } from 'styled-components/native';
import Button from '@/components/atoms/Button';
import { CircleCheckbox } from '@/components/atoms/Checkbox';
import { ProofService } from '@/apis';
import Toast from 'react-native-toast-message';

const Certify = () => {
  const params = useLocalSearchParams<{ user: string; token: string }>();
  const [selected, setSelected] = React.useState<number[]>([]);
  const [userProofs, setUserProofs] = useState<ProofResponse.UserProofs['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchProofs = async () => {
      if (!params.user || !params.token) return;

      try {
        setLoading(true);
        const data = await ProofService().getUserProofs(params.token, params.user);
        setUserProofs(data);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: '인증 목록을 불러올 수 없습니다.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProofs();
  }, [params.user, params.token]);

  const selectedToggle = (proofId: number) => {
    setSelected((prev) => (prev.includes(proofId) ? prev.filter((id) => id !== proofId) : [...prev, proofId]));
  };

  const handleApprove = async () => {
    if (selected.length === 0) {
      Alert.alert('알림', '승인할 인증을 선택해주세요.');
      return;
    }

    try {
      setIsProcessing(true);
      const promises = selected.map((proofId) => {
        const proof = userProofs?.proofs.find((p) => p.proofId === proofId);
        if (!proof) return Promise.resolve();
        return ProofService().approveProof(params.token, proof.meetingNo, proofId);
      });

      await Promise.all(promises);

      Toast.show({
        type: 'success',
        text1: '인증이 승인되었습니다.',
      });

      // 데이터 새로고침
      const data = await ProofService().getUserProofs(params.token, params.user);
      setUserProofs(data);
      setSelected([]);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '인증 승인에 실패했습니다.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (selected.length === 0) {
      Alert.alert('알림', '반려할 인증을 선택해주세요.');
      return;
    }

    try {
      setIsProcessing(true);
      const promises = selected.map((proofId) => {
        const proof = userProofs?.proofs.find((p) => p.proofId === proofId);
        if (!proof) return Promise.resolve();
        return ProofService().rejectProof(params.token, proof.meetingNo, proofId);
      });

      await Promise.all(promises);

      Toast.show({
        type: 'success',
        text1: '인증이 반려되었습니다.',
      });

      // 데이터 새로고침
      const data = await ProofService().getUserProofs(params.token, params.user);
      setUserProofs(data);
      setSelected([]);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '인증 반려에 실패했습니다.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <ManageView>
        <Typography variant="heading3">스터디 인증 승인</Typography>
        <View style={{ padding: 40, alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ManageView>
    );
  }

  if (!userProofs) {
    return (
      <ManageView>
        <Typography variant="heading3">스터디 인증 승인</Typography>
        <View style={{ padding: 40, alignItems: 'center' }}>
          <Typography variant="body3">인증 정보를 불러올 수 없습니다.</Typography>
        </View>
      </ManageView>
    );
  }

  const pendingProofs = userProofs.proofs.filter((p) => p.proofStatus === 'PENDING');

  return (
    <ManageView>
      <Typography variant="heading3">스터디 인증 승인</Typography>
      <ManageBox style={[shadowStyles.shadow]}>
        <ProfileImage
          source={{ uri: userProofs.avatar.profileImageUrl || undefined }}
          style={{ width: 80, height: 80, borderRadius: 100 }}
        />
        <Typography variant="heading4" style={{ marginTop: 8 }}>
          {userProofs.avatar.nickname}
        </Typography>
        <ContentBox>
          {pendingProofs.length === 0 ? (
            <View style={{ width: '100%', padding: 20, alignItems: 'center' }}>
              <Typography variant="body3" style={{ color: colors.gray[7] }}>
                승인 대기 중인 인증이 없습니다.
              </Typography>
            </View>
          ) : (
            pendingProofs.slice(0, 9).map((proof) => {
              const isSelected = selected.includes(proof.proofId);
              const date = new Date(proof.provenTime);

              return (
                <ContentView
                  key={proof.proofId}
                  onPress={() => selectedToggle(proof.proofId)}
                  style={{ borderColor: isSelected ? colors.primary : colors.gray[2] }}
                >
                  <View style={{ position: 'absolute', right: 0, top: 0, padding: 8 }}>
                    <CircleCheckbox selected={isSelected} />
                  </View>
                  <Typography variant="gnb">{proof.meetingNo}회차</Typography>
                  <Typography variant="caption2" style={{ color: colors.gray[9] }}>
                    {date.toLocaleDateString()}
                  </Typography>
                </ContentView>
              );
            })
          )}
          {pendingProofs.length > 0 && (
            <ButtonBox>
              <Button
                variant="contained"
                style={{ flex: 1 }}
                onPress={handleApprove}
                disabled={isProcessing || selected.length === 0}
              >
                {isProcessing ? <ActivityIndicator size="small" color="#fff" /> : '인증 승인하기'}
              </Button>
              <Button
                variant="outlined"
                style={{ flex: 1 }}
                onPress={handleReject}
                disabled={isProcessing || selected.length === 0}
              >
                인증 반려하기
              </Button>
            </ButtonBox>
          )}
        </ContentBox>
      </ManageBox>
    </ManageView>
  );
};

export default Certify;

const ManageBox = styled(ManageBoxView)`
  align-items: center;
  padding: 28px 20px;
`;
const ContentBox = styled(ManageBoxView)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
`;

const ContentView = styled.Pressable`
  border-width: 2px;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
  height: 92px;
  width: 32%;
  background-color: ${colors.gray[2]};
  border-radius: 12px;
  margin-top: 8px;
`;
const ButtonBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  margin-top: 26px;
`;
