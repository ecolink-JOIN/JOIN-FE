import React, { useState } from 'react';
import { ManageView, ManageBox } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import StyledTextInput from '@/components/atoms/TextField';
import { colors } from '@/theme';
import styled from 'styled-components/native';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/components/atoms/Button';
import { Pressable, View, ActivityIndicator } from 'react-native';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import { Daypicker, TimePicker } from '@/components/atoms/DatePicker';
import { BatchJobService } from '@/apis';
import Toast from 'react-native-toast-message';

const AlarmEdit = () => {
  const params = useLocalSearchParams<{
    day: string;
    time: string;
    message: string;
    token: string;
    batchJobId?: string;
  }>();
  const [value, onChangeText] = React.useState(params.message);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const toggleEditModal = () => {
    setEditModalVisible(!isEditModalVisible);
  };

  const handleSave = async () => {
    if (!params.batchJobId) {
      Toast.show({
        type: 'error',
        text1: '알림 ID가 없습니다.',
      });
      return;
    }

    try {
      setIsSaving(true);
      await BatchJobService().putBatchJob(
        {
          content: value,
          studyToken: params.token,
        },
        { batchJobId: parseInt(params.batchJobId) },
      );
      Toast.show({
        type: 'success',
        text1: '알림 메시지가 수정되었습니다.',
      });
      router.back();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '알림 메시지 수정에 실패했습니다.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!params.batchJobId) {
      Toast.show({
        type: 'error',
        text1: '알림 ID가 없습니다.',
      });
      return;
    }

    try {
      setIsDeleting(true);
      await BatchJobService().deleteBatchJob(parseInt(params.batchJobId));
      Toast.show({
        type: 'success',
        text1: '알림 메시지가 삭제되었습니다.',
      });
      router.back();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: '알림 메시지 삭제에 실패했습니다.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ManageView>
      <Typography variant="heading3">자동 알림 메세지 편집</Typography>
      <ManageBox>
        <Pressable style={{ flexDirection: 'row', gap: 8, marginVertical: 8 }} onPress={toggleEditModal}>
          <Typography variant="button">{params.day}</Typography>
          <Typography variant="button" style={{ color: colors.gray[7] }}>
            {params.time}
          </Typography>
        </Pressable>

        <AlarmMessage
          onChangeText={onChangeText}
          value={value}
          maxLength={100}
          placeholder={'알림 메세지를 작성해주세요.'}
          multiline={true}
        />
        <TextLimit variant="body4">{value?.length || 0} / 100</TextLimit>
      </ManageBox>
      <ButtonWrapper>
        <Button variant="contained" onPress={handleSave} disabled={isSaving}>
          {isSaving ? <ActivityIndicator size="small" color="#fff" /> : '저장하기'}
        </Button>
        <Button variant="outlined" onPress={toggleDeleteModal} disabled={isSaving || isDeleting}>
          삭제하기
        </Button>
      </ButtonWrapper>
      <ModalWrapper isModalVisible={isDeleteModalVisible} toggleModal={toggleDeleteModal}>
        <ModalContents>
          <Typography variant="subtitle1">자동 알림 메세지 삭제</Typography>
          <Typography variant="body4">자동 알림 메세지를 삭제하시겠습니까?</Typography>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button variant="outlined" onPress={toggleDeleteModal} disabled={isDeleting}>
              취소
            </Button>
            <Button variant="contained" onPress={handleDelete} disabled={isDeleting}>
              {isDeleting ? <ActivityIndicator size="small" color="#fff" /> : '삭제하기'}
            </Button>
          </View>
        </ModalContents>
      </ModalWrapper>
      <ModalWrapper isModalVisible={isEditModalVisible} toggleModal={toggleEditModal}>
        <ModalContents>
          {/* <Daypicker />
          <TimePicker title="전송 시간" />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button variant="outlined" onPress={toggleEditModal}>
              취소
            </Button>
            <Button variant="contained">확인</Button>
          </View> */}
        </ModalContents>
      </ModalWrapper>
    </ManageView>
  );
};

export default AlarmEdit;

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
