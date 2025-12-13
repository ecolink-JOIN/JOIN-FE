import React, { useState } from 'react';
import { ManageView, ManageBox } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import StyledTextInput from '@/components/atoms/TextField';
import { colors } from '@/theme';
import styled from 'styled-components/native';
import { router, useLocalSearchParams } from 'expo-router';
import Button from '@/components/atoms/Button';
import { Pressable, View, ActivityIndicator, Alert } from 'react-native';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import { Daypicker, TimePicker } from '@/components/atoms/DatePicker';
import { BatchJobService } from '@/apis';
import { useQueryClient } from '@tanstack/react-query';

export const Days: { label: string; value: string }[] = [
  { label: '월요일', value: 'MON' },
  { label: '화요일', value: 'TUE' },
  { label: '수요일', value: 'WED' },
  { label: '목요일', value: 'THU' },
  { label: '금요일', value: 'FRI' },
  { label: '토요일', value: 'SAT' },
  { label: '일요일', value: 'SUN' },
];

const AlarmEdit = () => {
  const params = useLocalSearchParams<{
    day: string;
    time: string;
    message: string;
    token: string;
    batchJobId?: string;
  }>();
  
  const queryClient = useQueryClient();
  const [value, onChangeText] = React.useState(params.message);
  const [day, setDay] = useState(params.day);
  const [time, setTime] = useState(params.time);
  const [modalValue, setModalValue] = React.useState<{
    day: SharedStudy.PossibleDays;
    time: string;
  }>({
    day: params.day as SharedStudy.PossibleDays,
    time: params.time,
  });
  
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const toggleEditModal = () => {
    if (isEditModalVisible) {
      // 모달 닫을 때 - 변경사항 적용
      setDay(modalValue.day);
      setTime(modalValue.time);
    } else {
      // 모달 열 때 - 현재 값으로 초기화
      setModalValue({
        day: day as SharedStudy.PossibleDays,
        time: time,
      });
    }
    setEditModalVisible(!isEditModalVisible);
  };

  const handleSave = async () => {
    if (!params.batchJobId) {
      Alert.alert('알림', '알림 ID가 없습니다.');
      return;
    }

    // 유효성 검증
    if (!value || value.trim().length < 10) {
      Alert.alert('알림', '메시지는 최소 10자 이상 입력해주세요.');
      return;
    }

    if (value.length > 100) {
      Alert.alert('알림', '메시지는 최대 100자까지 입력 가능합니다.');
      return;
    }

    try {
      setIsSaving(true);
      await BatchJobService().putBatchJob(
        {
          content: value,
          day: day as SharedStudy.PossibleDays,
          time: time,
          studyToken: params.token,
        },
        { batchJobId: parseInt(params.batchJobId) },
      );
      
      // 목록 쿼리 무효화하여 자동 갱신
      await queryClient.invalidateQueries({ queryKey: ['batchJobs', params.token] });
      
      Alert.alert('완료', '알림 메시지가 수정되었습니다.', [
        {
          text: '확인',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('알림 메시지 수정 실패:', error);
      const errorMessage = (error as any)?.response?.data?.message || '알림 메시지 수정에 실패했습니다.\n잠시 후 다시 시도해주세요.';
      Alert.alert('오류', errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!params.batchJobId) {
      Alert.alert('알림', '알림 ID가 없습니다.');
      return;
    }

    try {
      setIsDeleting(true);
      await BatchJobService().deleteBatchJob(parseInt(params.batchJobId));
      
      // 목록 쿼리 무효화하여 자동 갱신
      await queryClient.invalidateQueries({ queryKey: ['batchJobs', params.token] });
      
      Alert.alert('완료', '알림 메시지가 삭제되었습니다.', [
        {
          text: '확인',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('알림 메시지 삭제 실패:', error);
      const errorMessage = (error as any)?.response?.data?.message || '알림 메시지 삭제에 실패했습니다.\n잠시 후 다시 시도해주세요.';
      Alert.alert('오류', errorMessage);
    } finally {
      setIsDeleting(false);
      setDeleteModalVisible(false);
    }
  };

  return (
    <ManageView>
      <Typography variant="heading3">자동 알림 메세지 편집</Typography>
      <ManageBox>
        <Pressable style={{ flexDirection: 'row', gap: 8, marginVertical: 8 }} onPress={toggleEditModal}>
          <Typography variant="button">{Days.find((d) => d.value === day)?.label || day}</Typography>
          <Typography variant="button" style={{ color: colors.gray[7] }}>
            {time}
          </Typography>
        </Pressable>

        <AlarmMessage
          onChangeText={onChangeText}
          value={value}
          maxLength={100}
          placeholder={'알림 메세지를 작성해주세요.\n(최소 10자, 최대 100자 입력)'}
          multiline={true}
        />
        <TextLimit variant="body4">{value?.length || 0} / 100</TextLimit>
      </ManageBox>
      <ButtonWrapper>
        <Button 
          variant="contained" 
          onPress={handleSave} 
          disabled={isSaving || isDeleting || !value || value.length < 10}
        >
          {isSaving ? <ActivityIndicator size="small" color="#fff" /> : '저장하기'}
        </Button>
        <Button variant="outlined" onPress={toggleDeleteModal} disabled={isSaving || isDeleting}>
          삭제하기
        </Button>
      </ButtonWrapper>
      <ModalWrapper isModalVisible={isDeleteModalVisible} toggleModal={toggleDeleteModal}>
        <ModalContents>
          <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
            자동 알림 메세지 삭제
          </Typography>
          <Typography variant="body4" style={{ textAlign: 'center', color: colors.gray[8] }}>
            자동 알림 메세지를 삭제하시겠습니까?{'\n'}
            삭제 후에는 복구할 수 없습니다.
          </Typography>
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
      <ModalWrapper isModalVisible={isEditModalVisible} toggleModal={() => setEditModalVisible(false)}>
        <ModalContents>
          <Daypicker
            value={modalValue.day}
            onChangeValue={(value) => {
              setModalValue((prev) => ({ ...prev, day: (value as SharedStudy.PossibleDays) || 'MON' }));
            }}
          />
          <TimePicker
            title="전송 시간"
            value={modalValue.time}
            onChangeValue={(value) => {
              setModalValue((prev) => ({ ...prev, time: value || '00:00' }));
            }}
          />
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button variant="outlined" onPress={() => setEditModalVisible(false)}>
              취소
            </Button>
            <Button variant="contained" onPress={toggleEditModal}>
              확인
            </Button>
          </View>
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
