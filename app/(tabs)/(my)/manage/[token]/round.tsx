import React, { useCallback, useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Typography from '@/components/atoms/Typography';
import { ManageView, ManageBox, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import { Radio } from '@/components/atoms/Radio';
import { styled } from 'styled-components/native';
import dayjs from 'dayjs';
import { colors } from '@/theme';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Button from '@/components/atoms/Button';
import { Modal, Text } from 'react-native';
import Icon from '@/components/atoms/Icon';
import { MeetingsService } from '@/apis';
import Toast from 'react-native-toast-message';

interface DurationProps {
  start: dayjs.Dayjs | null;
  end: dayjs.Dayjs | null;
}

const Round = () => {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [auto, setAuto] = useState(true);
  const [duration, setDuration] = useState<DateType[]>([]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <>
      <ManageView>
        <Typography variant="heading3">스터디 회차 설정</Typography>
        <ManageBox>
          <Typography variant="button" style={{ paddingVertical: 12 }}>
            스터디 회차
          </Typography>
          <RadioGroup>
            <RadioBox onPress={() => setAuto(true)}>
              <Radio selected={auto} />
              <Typography variant="body3" style={{ color: auto ? colors.black : colors.gray[7] }}>
                자동생성
              </Typography>
            </RadioBox>
            <RadioBox
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Radio selected={!auto} />
              <Typography variant="body3" style={{ color: auto ? colors.gray[7] : colors.black }}>
                수동생성
              </Typography>
            </RadioBox>
          </RadioGroup>
        </ManageBox>
        <ManageBox>
          <ListComponent title="스터디 회차 확인" href={`/manage/${token}/round-check`} />
        </ManageBox>
        <ManageBox>
          <ListComponent title="회차 추가 및 제외" onPress={handlePresentModalPress} />
        </ManageBox>
      </ManageView>
      <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={toggleModal}>
        <ModalContainer>
          <ModalBox>
            <Icon
              name="close"
              stroke={colors.black}
              style={{ marginLeft: 'auto' }}
              width={24}
              height={24}
              onPress={toggleModal}
            />
            <WaringText variant="body4">
              스터디 회차 생성 조건을 ‘수동 생성’으로 변경하면{'\n'}
              <Text style={{ color: '#D32625' }}>다시 자동 생성으로 돌아갈 수 없습니다.{'\n'}</Text>‘수동 생성'으로
              변경하시겠습니까?
            </WaringText>
            <Button
              variant="contained"
              onPress={() => {
                toggleModal();
                setAuto(false);
              }}
              style={{ marginHorizontal: 'auto' }}
            >
              변경하기
            </Button>
          </ModalBox>
        </ModalContainer>
      </Modal>
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef}
        component={
          <DateView>
            <DateTimePicker
              mode="multiple"
              locale="ko"
              calendarTextStyle={{ fontFamily: 'Pretendard-Medium' }}
              headerButtonColor={colors.primary}
              selectedItemColor={colors.primary}
              dates={duration}
              onChange={(dates) => setDuration(dates.dates)}
            />
            <Button
              variant="contained"
              style={{ marginHorizontal: 'auto' }}
              disabled={isAdding}
              onPress={async () => {
                if (!duration || duration.length === 0) {
                  Toast.show({
                    type: 'form',
                    text1: '추가할 회차 날짜를 선택해주세요.',
                    position: 'bottom',
                    visibilityTime: 2000,
                  });
                  return;
                }

                setIsAdding(true);
                try {
                  // 선택된 날짜들을 순회하며 회차 추가
                  for (const date of duration) {
                    if (!date) continue; // null/undefined 체크
                    const dateObj = new Date(date.toString());
                    const studyDate = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD

                    // 기본 시간 설정 (09:00 - 10:00)
                    await MeetingsService().postMeeting(token as string, {
                      studyDate,
                      stTime: '09:00',
                      endTime: '10:00',
                    });
                  }

                  Toast.show({
                    type: 'formNoButton',
                    text1: `${duration.length}개의 회차가 추가되었습니다.`,
                    position: 'bottom',
                    visibilityTime: 2000,
                  });
                  setDuration([]);
                  bottomSheetModalRef.current?.dismiss();
                } catch (error) {
                  console.error('회차 추가 실패:', error);
                  Toast.show({
                    type: 'form',
                    text1: '회차 추가 중 오류가 발생했습니다.',
                    position: 'bottom',
                    visibilityTime: 2000,
                  });
                } finally {
                  setIsAdding(false);
                }
              }}
            >
              {isAdding ? '추가 중...' : '회차 추가하기'}
            </Button>
          </DateView>
        }
      />
    </>
  );
};

export default Round;

const RadioGroup = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding-bottom: 8px;
`;

const RadioBox = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const DateView = styled.View`
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 0 20px;
`;

const ModalBox = styled.View`
  gap: 16px;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 16px 16px 32px 16px;
  border-radius: 16px;
`;

const WaringText = styled(Typography)`
  text-align: center;
  padding: 0 16px;
`;
