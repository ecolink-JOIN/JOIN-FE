import React, { useCallback, useRef, useState, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Typography from '@/components/atoms/Typography';
import { ManageView, ManageBox, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import { Radio } from '@/components/atoms/Radio';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Button from '@/components/atoms/Button';
import { Modal, Text, ActivityIndicator } from 'react-native';
import Icon from '@/components/atoms/Icon';
import { MeetingsService } from '@/apis';
import Toast from 'react-native-toast-message';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Alert } from 'react-native';

const Round = () => {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [auto, setAuto] = useState(true);
  const [duration, setDuration] = useState<DateType[]>([]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [removedDates, setRemovedDates] = useState<string[]>([]); // 제거할 날짜 목록

  // 기존 회차 목록 조회
  const {
    data: meetings,
    isLoading: isMeetingsLoading,
    refetch: refetchMeetings,
  } = useQuery({
    queryKey: ['meetings', token],
    queryFn: () => MeetingsService().getMeetings(token),
    enabled: !!token,
  });

  // 기존 회차 날짜를 DateType[] 형식으로 변환 (모든 기존 회차 표시)
  // 모든 기존 회차 날짜 (원본)
  const allExistingDates = useMemo(() => {
    if (!meetings) return [];
    return meetings.map((meeting) => dayjs(meeting.studyDate).toDate());
  }, [meetings]);

  // 기존 회차 날짜 문자열 목록 (원본)
  const existingDateStrings = useMemo(() => {
    if (!meetings) return [];
    return meetings.map((meeting) => meeting.studyDate);
  }, [meetings]);

  // 달력에 표시할 기존 회차 (제거 예정인 것 제외)
  const displayedExistingDates = useMemo(() => {
    if (!meetings) return [];
    return meetings
      .filter((meeting) => !removedDates.includes(meeting.studyDate))
      .map((meeting) => dayjs(meeting.studyDate).toDate());
  }, [meetings, removedDates]);

  const handlePresentModalPress = useCallback(() => {
    // 바텀시트를 열 때마다 상태 초기화
    setDuration([]);
    setRemovedDates([]);
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
                // TODO: 백엔드 API 미구현 - PATCH /api/v1/study/{studyToken}/meeting-mode
                Alert.alert(
                  '기능 준비 중',
                  '회차 자동/수동 생성 모드 전환 기능은 백엔드 API 개발 대기 중입니다.\n\n현재는 "회차 추가 및 제외" 메뉴에서 회차를 직접 추가/삭제할 수 있습니다.',
                  [{ text: '확인' }],
                );
                // setAuto(false); // API 구현 후 활성화
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
        snapPoints={['90%']}
        onDismiss={() => {
          // 바텀시트를 닫을 때 상태 초기화
          setDuration([]);
          setRemovedDates([]);
        }}
        component={
          <BottomSheetContent>
            {isMeetingsLoading ? (
              <LoadingContainer>
                <ActivityIndicator size="large" color={colors.primary} />
                <Typography variant="body3" style={{ marginTop: 8, color: colors.gray[7] }}>
                  회차 정보를 불러오는 중...
                </Typography>
              </LoadingContainer>
            ) : (
              <>
                <Typography variant="heading4" style={{ marginBottom: 16, textAlign: 'center' }}>
                  회차 추가 및 제외
                </Typography>

                <DateTimePicker
                  mode="multiple"
                  locale="ko"
                  calendarTextStyle={{ fontFamily: 'Pretendard-Medium' }}
                  headerButtonColor={colors.primary}
                  selectedItemColor={colors.primary}
                  dates={[...displayedExistingDates, ...duration]}
                  onChange={(params) => {
                    // 선택된 날짜들
                    const selectedDates = params.dates || [];

                    // 선택된 날짜를 문자열로 변환
                    const selectedDateStrings = selectedDates
                      .map((d) => (d ? dayjs(d.toString()).format('YYYY-MM-DD') : ''))
                      .filter(Boolean);

                    // 제거된 기존 회차 찾기 (원본 meetings와 비교)
                    const newRemovedDates = existingDateStrings.filter(
                      (dateStr) => !selectedDateStrings.includes(dateStr),
                    );
                    setRemovedDates(newRemovedDates);

                    // 새로 추가된 날짜만 필터링 (원본 meetings와 비교)
                    // 중복 제거를 위해 Set 사용
                    const newDatesSet = new Set<string>();
                    selectedDates.forEach((date) => {
                      if (!date) return;
                      const dateStr = dayjs(date.toString()).format('YYYY-MM-DD');
                      // 기존 회차가 아닌 것만 추가
                      if (!existingDateStrings.includes(dateStr)) {
                        newDatesSet.add(dateStr);
                      }
                    });

                    // Set을 다시 Date 배열로 변환
                    const newDates = Array.from(newDatesSet).map((dateStr) => dayjs(dateStr).toDate());
                    setDuration(newDates);
                  }}
                />

                <Button
                  variant="contained"
                  style={{ marginHorizontal: 'auto', marginTop: 24 }}
                  disabled={isAdding || (duration.length === 0 && removedDates.length === 0)}
                  onPress={async () => {
                    setIsAdding(true);
                    try {
                      let addedCount = 0;
                      let removedCount = 0;

                      // 제거할 회차 처리
                      if (removedDates.length > 0 && meetings) {
                        for (const dateStr of removedDates) {
                          const meeting = meetings.find((m) => m.studyDate === dateStr);
                          if (meeting) {
                            await MeetingsService().deleteMeeting(token as string, meeting.id);
                            removedCount++;
                          }
                        }
                      }

                      // 추가할 회차 처리
                      for (const date of duration) {
                        if (!date) continue;
                        // dayjs를 사용하여 로컬 시간 기준으로 날짜 포맷
                        const studyDate = dayjs(date.toString()).format('YYYY-MM-DD');

                        await MeetingsService().postMeeting(token as string, {
                          studyDate,
                          stTime: '09:00',
                          endTime: '10:00',
                        });
                        addedCount++;
                      }

                      // 결과 메시지
                      let message = '';
                      if (addedCount > 0 && removedCount > 0) {
                        message = `${addedCount}개 추가, ${removedCount}개 제외되었습니다.`;
                      } else if (addedCount > 0) {
                        message = `${addedCount}개의 회차가 추가되었습니다.`;
                      } else if (removedCount > 0) {
                        message = `${removedCount}개의 회차가 제외되었습니다.`;
                      }

                      Toast.show({
                        type: 'formNoButton',
                        text1: message,
                        position: 'bottom',
                        visibilityTime: 2000,
                      });

                      // 상태 초기화 및 데이터 다시 불러오기
                      setDuration([]);
                      setRemovedDates([]);

                      // 회차 목록 다시 불러오기
                      await refetchMeetings();

                      // 바텀시트 닫기
                      bottomSheetModalRef.current?.dismiss();
                    } catch (error) {
                      console.error('회차 처리 실패:', error);
                      Toast.show({
                        type: 'form',
                        text1: '회차 처리 중 오류가 발생했습니다.',
                        position: 'bottom',
                        visibilityTime: 2000,
                      });
                    } finally {
                      setIsAdding(false);
                    }
                  }}
                >
                  {isAdding
                    ? '처리 중...'
                    : duration.length > 0 && removedDates.length > 0
                      ? `${duration.length}개 추가, ${removedDates.length}개 제외`
                      : duration.length > 0
                        ? `${duration.length}개 회차 추가하기`
                        : removedDates.length > 0
                          ? `${removedDates.length}개 회차 제외하기`
                          : '날짜를 선택해주세요'}
                </Button>
              </>
            )}
          </BottomSheetContent>
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

const BottomSheetContent = styled.View`
  padding: 20px;
  gap: 8px;
`;

const LoadingContainer = styled.View`
  padding: 40px 0;
  align-items: center;
  justify-content: center;
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
