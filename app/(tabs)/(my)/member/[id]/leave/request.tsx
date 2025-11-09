import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ManageView, ManageBox } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import StyledTextInput from '@/components/atoms/TextField';
import { colors } from '@/theme';
import styled from 'styled-components/native';
import Button from '@/components/atoms/Button';
import { View } from 'react-native';
import { WithdrawService } from '@/apis';
import Toast from 'react-native-toast-message';

const LeaveRequest = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [value, onChangeText] = React.useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!value || value.length < 10) {
      Toast.show({
        type: 'error',
        text1: '최소 10자 이상 입력해주세요.',
      });
      return;
    }

    if (value.length > 150) {
      Toast.show({
        type: 'error',
        text1: '최대 150자까지 입력 가능합니다.',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await WithdrawService().postWithdraw(id, {
        withdraw_type: 'APPROVAL_REQUIRED',
        reason: value,
      });

      Toast.show({
        type: 'success',
        text1: '탈퇴 요청이 제출되었습니다.',
        text2: '스터디장의 승인을 기다려주세요.',
      });

      // 이전 페이지로 이동
      router.back();
    } catch (error) {
      console.error('Failed to submit withdrawal request:', error);
      Toast.show({
        type: 'error',
        text1: '탈퇴 요청 실패',
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
            스터디장에게 탈퇴 승인받기
          </Typography>
        </View>

        <LeaveMessage
          onChangeText={onChangeText}
          value={value}
          placeholder={'탈퇴 사유를 알려주세요.\n(최소 10자, 최대 150자 입력)'}
          multiline={true}
        />
        <TextLimit variant="body4">{value?.length || 0} / 150</TextLimit>
      </ManageBox>
      <Button
        variant="contained"
        disabled={!value?.length || value.length < 10 || isSubmitting}
        onPress={handleSubmit}
        size="small"
        style={{ marginHorizontal: 'auto' }}
      >
        {isSubmitting ? '제출 중...' : '제출하기'}
      </Button>
    </ManageView>
  );
};

export default LeaveRequest;

const LeaveMessage = styled(StyledTextInput)`
  padding: 16px;
  margin: 8px 0;
  text-align-vertical: top;
  border-width: 1px;
  border-color: ${colors.gray[3]};
  background-color: ${colors.gray[2]};
  height: 160px;
  font-size: 16px;
  line-height: 24px;
  border-radius: 12px;
`;

const TextLimit = styled(Typography)`
  margin: 0 0 8px 0;
  text-align: right;
  color: ${colors.gray[8]};
`;
