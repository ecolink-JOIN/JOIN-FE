import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ManageView, ManageBox } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import Button from '@/components/atoms/Button';
import { View } from 'react-native';
import { WithdrawService } from '@/apis';
import Toast from 'react-native-toast-message';

const LeaveImmediate = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWithdraw = async () => {
    try {
      setIsSubmitting(true);
      await WithdrawService().postWithdraw(id, {
        withdraw_type: 'SELF_WITHDRAW',
        reason: '임의 탈퇴',
      });

      Toast.show({
        type: 'success',
        text1: '스터디에서 탈퇴되었습니다.',
        text2: '출석률과 인증률의 50%만 반영됩니다.',
      });

      // 이전 페이지로 이동
      router.back();
      router.back(); // 두 번 back (leave 페이지 거쳐서 member 페이지로)
    } catch (error) {
      console.error('Failed to withdraw:', error);
      Toast.show({
        type: 'error',
        text1: '탈퇴 실패',
        text2: '잠시 후 다시 시도해주세요.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ManageView>
      <Typography variant="heading3">스터디 탈퇴</Typography>
      <ManageBox>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Typography
            variant="subtitle1"
            style={{
              paddingTop: 16,
              paddingBottom: 8,
            }}
          >
            임의 탈퇴하기
          </Typography>
        </View>

        <View>
          <Typography variant="body2">
            스터디장의 승인 없이 임의로 스터디를 탈퇴하는 경우에는 현재까지 진행된 스터디의 출석 및 인증의
          </Typography>
          <Typography variant="body2" style={{ color: colors.primary }}>
            50%만 인정되어 나의 평균 출석률 및 인증률에 반영됩니다.
          </Typography>

          <Typography variant="body2">{`\n계속 진행하시겠습니까?`}</Typography>
        </View>

        <View
          style={{
            marginTop: 36,
            marginBottom: 24,
          }}
        >
          <Button
            variant="contained"
            onPress={handleWithdraw}
            disabled={isSubmitting}
            size="small"
            style={{ marginHorizontal: 'auto' }}
          >
            {isSubmitting ? '탈퇴 중...' : '탈퇴하기'}
          </Button>
        </View>
      </ManageBox>
    </ManageView>
  );
};

export default LeaveImmediate;
