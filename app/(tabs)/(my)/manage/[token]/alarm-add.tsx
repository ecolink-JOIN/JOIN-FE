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
import { router, useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { BatchJobService } from '@/apis/service/batch-job';
import Toast from 'react-native-toast-message';

export const Days: { label: string; value: string }[] = [
  { label: '월요일', value: 'MON' },
  { label: '화요일', value: 'TUE' },
  { label: '수요일', value: 'WED' },
  { label: '목요일', value: 'THU' },
  { label: '금요일', value: 'FRI' },
  { label: '토요일', value: 'SAT' },
  { label: '일요일', value: 'SUN' },
];

const AlarmAdd = () => {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [modalValue, setModalValue] = React.useState<{
    day: SharedStudy.PossibleDays;
    time: string;
  }>({
    day: 'MON',
    time: '00:00',
  });
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const { handleSubmit, watch, setValue } = useForm<BatchJobRequest.PostBatchJobBody>({
    defaultValues: {
      day: 'MON',
      time: '00:00',
      studyToken: token,
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    BatchJobService()
      .postBatchJob(data)
      .then(() => {
        Toast.show({
          position: 'bottom',
          type: 'form',
          text1: '자동 알림 메시지가 정상적으로 추가되었습니다.',
        });
        router.back();
      });
    // toggleEditModal();
  });

  const toggleEditModal = () => {
    if (isEditModalVisible) {
      setValue('day', modalValue.day);
      setValue('time', modalValue.time);
    } else {
      setModalValue({
        day: watch('day') || 'MON',
        time: watch('time') || '00:00',
      });
    }
    setEditModalVisible(!isEditModalVisible);
  };

  return (
    <ManageView>
      <Typography variant="heading3">자동 알림 메세지 추가</Typography>
      <ManageBox>
        <Pressable style={{ flexDirection: 'row', gap: 8, marginVertical: 8 }} onPress={toggleEditModal}>
          <Typography variant="button">{Days.find((day) => day.value === watch('day'))?.label}</Typography>
          <Typography variant="button" style={{ color: colors.gray[7] }}>
            {watch('time') || '00:00'}
          </Typography>
        </Pressable>

        <AlarmMessage
          onChangeText={(value) => setValue('content', value)}
          value={watch('content')}
          maxLength={100}
          placeholder={'자동 알림 메시지 내용을 입력해주세요.\n(최소 10자, 최대 100자 입력)'}
          multiline={true}
        />
        <TextLimit variant="body4">{watch('content')?.length || 0} / 100</TextLimit>
      </ManageBox>
      <Button variant="contained" onPress={onSubmit} style={{ marginHorizontal: 'auto' }}>
        알림 메시지 예약하기
      </Button>
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
            value={watch('time')}
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
