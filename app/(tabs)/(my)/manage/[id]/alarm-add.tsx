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
      <Typography variant="heading3">자동 알림 메세지 편집</Typography>
      <ManageBox>
        <Pressable style={{ flexDirection: 'row', gap: 8, marginVertical: 8 }} onPress={toggleEditModal}>
          <Typography variant="button">월요일</Typography>
          <Typography variant="button" style={{ color: colors.gray[7] }}>
            00:00
          </Typography>
        </Pressable>

        <AlarmMessage
          onChangeText={onChangeText}
          value={value}
          placeholder={'자동 알림 메시지 내용을 입력해주세요.\n(최소 10자, 최대 100자 입력)'}
          multiline={true}
        />
        <TextLimit variant="body4">{value?.length || 0} / 100</TextLimit>
      </ManageBox>
      <Button variant="contained" onPress={toggleDeleteModal} style={{ marginHorizontal: 'auto' }}>
        알림 메시지 예약하기
      </Button>
      <ModalWrapper isModalVisible={isDeleteModalVisible} toggleModal={toggleDeleteModal}>
        <ModalContents>
          <Typography variant="subtitle1">자동 알림 메세지 삭제</Typography>
          <Typography variant="body4">자동 알림 메세지를 삭제하시겠습니까?</Typography>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button variant="outlined" onPress={toggleDeleteModal}>
              취소
            </Button>
            <Button variant="contained">삭제하기</Button>
          </View>
        </ModalContents>
      </ModalWrapper>
      <ModalWrapper isModalVisible={isEditModalVisible} toggleModal={toggleEditModal}>
        <ModalContents>
          <Daypicker />
          <TimePicker title="전송 시간" />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button variant="outlined" onPress={toggleEditModal}>
              취소
            </Button>
            <Button variant="contained">확인</Button>
          </View>
        </ModalContents>
      </ModalWrapper>
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
  height: 100px;
  font-size: 16px;
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
