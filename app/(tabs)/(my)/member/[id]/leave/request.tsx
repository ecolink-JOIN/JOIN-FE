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
            스터디장에게 탈퇴 승인받기
          </Typography>
        </View>

        <LeaveMessage
          onChangeText={onChangeText}
          value={value}
          placeholder={'탈퇴 사유를 알려주세요.\n(최소 10자, 최대 150자 입력)'}
          multiline={true}
        />
        <TextLimit variant="body4">{value?.length || 0} / 100</TextLimit>
      </ManageBox>
      <Button
        variant="contained"
        disabled={!value?.length}
        onPress={toggleDeleteModal}
        size="small"
        style={{ marginHorizontal: 'auto' }}
      >
        제출하기
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
