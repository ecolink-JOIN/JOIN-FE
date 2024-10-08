import React, { useState } from 'react';
import { ManageView, ManageBox } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import StyledTextInput from '@/components/atoms/TextField';
import { colors } from '@/theme';
import styled from 'styled-components/native';
import Button from '@/components/atoms/Button';
import { View } from 'react-native';

const LeaveRequest = () => {
  const [value, onChangeText] = React.useState('');
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
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
          <Button variant="contained" onPress={toggleDeleteModal} size="small" style={{ marginHorizontal: 'auto' }}>
            탈퇴하기
          </Button>
        </View>
      </ManageBox>
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
