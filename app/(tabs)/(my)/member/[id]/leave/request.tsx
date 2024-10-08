import React, { useState } from 'react';
import { ManageView, ManageBox } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import StyledTextInput from '@/components/atoms/TextField';
import { colors } from '@/theme';
import styled from 'styled-components/native';
import Button from '@/components/atoms/Button';
import { Pressable, View } from 'react-native';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import { Daypicker, TimePicker } from '@/components/atoms/DatePicker';

const AlarmAdd = () => {
  const [value, onChangeText] = React.useState('');
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  return (
    <ManageView>
      <Typography variant="heading3">스터디 탈퇴</Typography>
      <ManageBox>
        <Typography
          variant="subtitle1"
          style={{
            paddingTop: 24,
            paddingBottom: 12,
          }}
        >
          스터디장에게 탈퇴 승인받기
        </Typography>

        <AlarmMessage
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

export default AlarmAdd;

const AlarmMessage = styled(StyledTextInput)`
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

const ButtonWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const ModalContents = styled.View`
  gap: 24px;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;
