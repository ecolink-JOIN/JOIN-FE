import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ManageView, ManageBoxView, shadowStyles } from '@/components/molecules/MyMolecules/ManageView';
import { FlatList, View, TouchableOpacity, ScrollView } from 'react-native';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import { router, useLocalSearchParams, RelativePathString } from 'expo-router';
import Button from '@/components/atoms/Button';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
// Dayjs import 제거
import Toast from 'react-native-toast-message';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import { StudyService } from '@/apis';

const WeekofDay = {
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  FRI: '금요일',
  SAT: '토요일',
  SUN: '일요일',
};

// 요일 선택을 위한 옵션
const dayOptions = Object.entries(WeekofDay).map(([key, value]) => ({
  label: value,
  value: key as SharedStudy.PossibleDays,
}));

// 요일 선택용 SelectBox 컴포넌트
const SelectBox = ({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <View style={{ position: 'relative', width: '100%' }}>
      <TouchableOpacity
        style={{
          backgroundColor: colors.gray[2],
          padding: 10,
          borderRadius: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 40,
        }}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Typography variant="body2">{selectedOption?.label || '요일 선택'}</Typography>
        <Icon name="chevron-down" />
      </TouchableOpacity>

      {isOpen && (
        <View
          style={{
            position: 'absolute',
            top: 45,
            left: 0,
            right: 0,
            backgroundColor: colors.white,
            borderRadius: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            zIndex: 100,
          }}
        >
          <ScrollView style={{ maxHeight: 200 }}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={{ padding: 12 }}
                onPress={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                <Typography
                  variant="body2"
                  style={{
                    color: option.value === value ? colors.primary : colors.black,
                  }}
                >
                  {option.label}
                </Typography>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const StudySchedule = ({
  id,
  bottomSheetModalRef,
}: {
  id: string | string[] | undefined;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
}) => {
  const { schedules, stDate, endDate, token } = useLocalSearchParams();
  // 안전하게 스케줄 초기화 - JSON.parse가 실패할 경우 빈 배열 사용
  const getSchedules = () => {
    try {
      return schedules ? (JSON.parse(schedules as string) as StudyRequest.Schedule[]) : [];
    } catch (e) {
      console.error('스케줄 데이터 파싱 오류:', e);
      return [];
    }
  };

  const [schedulesData, setSchedulesData] = useState<StudyRequest.Schedule[]>(getSchedules());
  // 기본 날짜 설정 함수
  const getInitialDate = (dateStr: string | string[] | undefined): DateType => {
    if (!dateStr) return new Date();
    try {
      const date = new Date(dateStr as string);
      return !isNaN(date.getTime()) ? date : new Date();
    } catch (e) {
      console.error('날짜 초기화 오류:', e);
      return new Date();
    }
  };

  const [duration, setDuration] = useState<{ startDate: DateType; endDate: DateType }>({
    startDate: getInitialDate(stDate),
    endDate: getInitialDate(endDate),
  });
  const [is30day, setIs30day] = useState<boolean>(false);
  const [isSelectingEndDate, setIsSelectingEndDate] = useState<boolean>(false);

  // 현재 선택된 스케줄을 관리 (편집 또는 새로 추가)
  const [selectedSchedule, setSelectedSchedule] = useState<StudyRequest.Schedule>({
    weekOfDay: 'MON',
    stTime: '09:00',
    endTime: '10:00',
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // 스터디 스케줄과 기간 정보를 안전하게 초기화
  useEffect(() => {
    // 1. 스케줄 데이터 초기화
    if (schedules) {
      try {
        const parsedSchedules = JSON.parse(schedules as string) as StudyRequest.Schedule[];
        if (Array.isArray(parsedSchedules) && parsedSchedules.length > 0) {
          setSchedulesData(parsedSchedules);
        }
      } catch (e) {
        console.error('스케줄 데이터 파싱 오류:', e);
        // 빈 배열로 초기화
        setSchedulesData([]);
      }
    }

    // 2. 스터디 기간 초기화
    if (stDate && endDate) {
      try {
        const start = new Date(stDate as string);
        const end = new Date(endDate as string);

        // 날짜가 유효한지 확인
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
          // 상태 업데이트
          setDuration({ startDate: start, endDate: end });

          // 30일 이상 여부 체크
          const diff = end.getTime() - start.getTime();
          const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

          if (diff >= thirtyDaysInMs) {
            setIs30day(true);
          } else {
            setIs30day(false);
          }
        } else {
          console.error('유효하지 않은 날짜 데이터:', { stDate, endDate });
        }
      } catch (dateError) {
        console.error('날짜 데이터 초기화 오류:', dateError);
      }
    }
  }, [schedules, stDate, endDate]);

  const handlePresentModalPress = useCallback(() => {
    setIsSelectingEndDate(false); // 모달 열 때 시작일 선택부터 시작
    bottomSheetModalRef.current?.present();
  }, [bottomSheetModalRef]);

  const showToast = ({ text1 }: { text1: string }) => {
    Toast.show({
      type: 'form',
      text1,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };
  const showToastNobutton = ({ text1 }: { text1: string }) => {
    Toast.show({
      type: 'formNoButton',
      text1,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };
  const formattedDate = (date: string | undefined) => {
    return new Date(date || new Date())
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '.');
  };
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  // 새 스케줄 추가 또는 기존 스케줄 수정
  const toggleModal = (index: number = -1) => {
    if (index >= 0) {
      // 편집 모드
      setIsEditing(true);
      setSelectedIndex(index);
      setSelectedSchedule({ ...schedulesData[index] });
    } else {
      // 추가 모드
      setIsEditing(false);
      setSelectedIndex(-1);
      setSelectedSchedule({
        weekOfDay: 'MON',
        stTime: '09:00',
        endTime: '10:00',
      });
    }
    setIsModalVisible(!isModalVisible);
  };

  // 스케줄 저장 (추가 또는 편집)
  const saveSchedule = () => {
    if (isEditing && selectedIndex >= 0) {
      // 기존 스케줄 수정
      const updatedSchedules = [...schedulesData];
      updatedSchedules[selectedIndex] = selectedSchedule;
      setSchedulesData(updatedSchedules);
    } else {
      // 새 스케줄 추가
      setSchedulesData([...schedulesData, selectedSchedule]);
    }
    setIsModalVisible(false);
    showToastNobutton({ text1: '스케줄이 저장되었습니다.' });
  };

  // 스케줄 삭제
  const deleteSchedule = React.useCallback(
    (index: number) => {
      const updatedSchedules = schedulesData.filter((_, i) => i !== index);
      setSchedulesData(updatedSchedules);
      showToastNobutton({ text1: '스케줄이 삭제되었습니다.' });
      setIsModalVisible(false);
    },
    [schedulesData],
  );

  // 시간 형식 변환 (시:분)
  const formatTime = (hour: string, minute: string) => {
    // 둘 다 비어있으면 빈 문자열 반환
    if (hour === '' && minute === '') {
      return '';
    }

    // 시간 처리 (초 제거, 2자리 강제 변환 제거)
    const h = hour.trim();
    const hourNum = parseInt(h);
    const validHour = h === '' ? '00' : !isNaN(hourNum) && hourNum >= 0 && hourNum < 24 ? h : '00';

    // 분 처리 (초 제거, 2자리 강제 변환 제거)
    const m = minute.trim();
    const minuteNum = parseInt(m);
    const validMinute = m === '' ? '00' : !isNaN(minuteNum) && minuteNum >= 0 && minuteNum < 60 ? m : '00';

    return `${validHour}:${validMinute}:00`;
  };

  // 시간 문자열에서 시간과 분 추출
  const extractTime = (timeStr: string) => {
    // 기본값 설정
    const defaultTime = { hour: '00', minute: '00' };

    // 유효성 검사
    if (!timeStr || typeof timeStr !== 'string' || timeStr.indexOf(':') === -1) {
      return defaultTime;
    }

    try {
      const [hour, minute] = timeStr.split(':');
      return {
        hour: hour && /^\d{1,2}$/.test(hour) ? hour : '00',
        minute: minute && /^\d{1,2}$/.test(minute) ? minute : '00',
      };
    } catch (error) {
      console.error('시간 형식 추출 오류:', error);
      return defaultTime;
    }
  };

  // 요일 업데이트
  const updateDay = (day: string) => {
    setSelectedSchedule({
      ...selectedSchedule,
      weekOfDay: day as SharedStudy.PossibleDays,
    });
  };

  // 시작 시간 업데이트
  const updateStartTime = (hour: string, minute: string) => {
    // 임시 시간 상태를 유지하여 사용자가 지우는 동안에도 입력을 유지
    setSelectedSchedule({
      ...selectedSchedule,
      stTime: hour === '' && minute === '' ? '' : formatTime(hour, minute),
    });
  };

  // 종료 시간 업데이트
  const updateEndTime = (hour: string, minute: string) => {
    setSelectedSchedule({
      ...selectedSchedule,
      endTime: hour === '' && minute === '' ? '' : formatTime(hour, minute),
    });
  };

  return (
    <ManageView>
      <Typography variant="heading3">스터디 스케쥴</Typography>
      <ManageBoxView style={shadowStyles.shadow}>
        <BoxTitle onPress={handlePresentModalPress}>
          <Typography variant="body3" style={{ color: colors.gray[9] }}>
            스터디 기간
          </Typography>
          <Icon name="arrow-right" />
        </BoxTitle>
        <BoxTitle>
          <Typography variant="button">
            {formattedDate(duration.startDate?.toString())} - {formattedDate(duration.endDate?.toString())}
          </Typography>
        </BoxTitle>
      </ManageBoxView>
      <ManageBoxView style={shadowStyles.shadow}>
        <BoxTitle>
          <Typography variant="body3" style={{ color: colors.gray[9] }}>
            진행 요일 및 시간
          </Typography>
        </BoxTitle>
        {schedulesData.map((item, index) => (
          <View key={index}>
            <BoxTitle onPress={() => toggleModal(index)}>
              <Typography variant="button" style={{ color: colors.black }}>
                {WeekofDay[item.weekOfDay]}
              </Typography>
              <Typography variant="button" style={{ color: colors.gray[9], marginLeft: 'auto', marginRight: 8 }}>
                {item.stTime.replace(/:\d{2}$/, '')} - {item.endTime.replace(/:\d{2}$/, '')}
              </Typography>
              <Icon name="arrow-right" />
            </BoxTitle>
          </View>
        ))}
        <AddAlarm onPress={() => toggleModal()}>
          <Icon name="plus-circle-outline" />
          <Typography variant="body2" style={{ color: colors.gray[7] }}>
            추가하기
          </Typography>
        </AddAlarm>
      </ManageBoxView>
      <Button
        variant="contained"
        onPress={() => {
          // 날짜 형식 변환 (yyyy-MM-dd)
          const formatDateForApi = (date: DateType): string => {
            // 빈 값 처리
            if (!date) return '';

            try {
              // Date 인스턴스인 경우 직접 변환
              if (date instanceof Date) {
                return date.toISOString().split('T')[0];
              }

              // 문자열인 경우 처리
              if (typeof date === 'string') {
                const parsed = new Date(date);
                if (!isNaN(parsed.getTime())) {
                  return parsed.toISOString().split('T')[0];
                }
              }

              // 다른 객체 타입인 경우(Dayjs 등)
              if (typeof date === 'object') {
                // format 메서드가 있는 객체인 경우(Dayjs 같은 라이브러리)
                if (date && 'format' in date && typeof date.format === 'function') {
                  return date.format('YYYY-MM-DD');
                }

                // 일반 객체를 Date로 변환 시도
                const dateStr = date.toString();
                const parsed = new Date(dateStr);
                if (!isNaN(parsed.getTime())) {
                  return parsed.toISOString().split('T')[0];
                }
              }

              // 형식 변환 실패 시 현재 날짜 반환
              console.warn('날짜 형식 변환 실패:', date);
              return new Date().toISOString().split('T')[0];
            } catch (error) {
              console.error('날짜 변환 중 오류 발생:', error);
              return new Date().toISOString().split('T')[0];
            }
          };

          // 데이터 유효성 검사
          if (schedulesData.length === 0) {
            showToast({ text1: '최소 하나 이상의 스케줄을 추가해주세요.' });
            return;
          }

          // 날짜 유효성 검사
          const startDate = formatDateForApi(duration.startDate);
          const endDate = formatDateForApi(duration.endDate);

          if (!startDate || !endDate) {
            showToast({ text1: '유효한 스터디 기간을 설정해주세요.' });
            return;
          }

          // 스터디 기간 최소 30일 검사
          const start = new Date(startDate);
          const end = new Date(endDate);
          const diff = end.getTime() - start.getTime();
          if (diff < 30 * 24 * 60 * 60 * 1000) {
            showToast({ text1: '스터디 기간은 최소 30일 이상으로 설정해주세요.' });
            return;
          }

          // API 요청 데이터 준비
          // StudyRequest.PatchRules 인터페이스에서는 Date 타입이지만
          // 실제 API는 문자열 날짜를 받으므로 타입 캐스팅
          const requestData = {
            schedules: schedulesData,
            startDate: startDate,
            endDate: endDate,
          } as unknown as StudyRequest.PatchRules;

          // API를 통해 서버에 저장
          StudyService()
            .patchRules(token as string, requestData)
            .then(() => {
              showToastNobutton({ text1: '스터디 스케줄이 성공적으로 저장되었습니다.' });
              router.push({
                pathname: `manage/${token}/rule` as RelativePathString,
              });
            })
            .catch((error: any) => {
              console.error('스케줄 저장 오류:', error);
              showToast({ text1: '스케줄 저장 중 오류가 발생했습니다. 다시 시도해주세요.' });
            });
        }}
        style={{ marginHorizontal: 'auto' }}
      >
        저장하기
      </Button>
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={['80%']}
        enableContentPanningGesture={false}
        component={
          <DateView>
            <View style={{ marginBottom: 16 }}>
              <Typography variant="body2" style={{ textAlign: 'center', color: colors.gray[7] }}>
                {!isSelectingEndDate ? '시작일을 선택해주세요' : '종료일을 선택해주세요'}
              </Typography>
              {duration.startDate && (
                <Typography variant="body3" style={{ textAlign: 'center', color: colors.primary, marginTop: 4 }}>
                  시작일: {formattedDate(duration.startDate.toString())}
                  {duration.endDate && ` ~ 종료일: ${formattedDate(duration.endDate.toString())}`}
                </Typography>
              )}
              {duration.startDate && !duration.endDate && (
                <TouchableOpacity
                  onPress={() => setIsSelectingEndDate(false)}
                  style={{ marginTop: 8, alignSelf: 'center' }}
                >
                  <Typography variant="body3" style={{ color: colors.gray[6] }}>
                    시작일 다시 선택
                  </Typography>
                </TouchableOpacity>
              )}
            </View>
            <View style={{ width: '100%', flex: 1 }} pointerEvents="box-none">
              <View style={{ flex: 1 }} pointerEvents="auto">
                <DateTimePicker
                  mode="single"
                  locale="ko"
                  calendarTextStyle={{ fontFamily: 'Pretendard-Medium' }}
                  headerButtonColor={colors.primary}
                  selectedItemColor={colors.primary}
                  date={isSelectingEndDate ? duration.endDate : duration.startDate}
                  timePicker={false}
                  displayFullDays={true}
                  firstDayOfWeek={1}
                  minDate={
                    isSelectingEndDate && duration.startDate ? new Date(duration.startDate.toString()) : new Date()
                  }
                  onChange={(params: any) => {
                    console.log('DateTimePicker onChange called:', params);
                    
                    if (!params || !params.date) {
                      console.log('Invalid params received');
                      return;
                    }

                    const selectedDate = new Date(params.date);
                    console.log('Selected date:', selectedDate);

                    if (!isSelectingEndDate) {
                      // 시작일 선택
                      setDuration({
                        startDate: selectedDate,
                        endDate: undefined,
                      });
                      setIsSelectingEndDate(true);
                      setIs30day(false);
                      console.log('Start date selected, now selecting end date');
                    } else {
                      // 종료일 선택
                      if (duration.startDate) {
                        const startDate = new Date(duration.startDate.toString());
                        const endDate = selectedDate;

                        // 종료일이 시작일보다 이른 경우 처리
                        if (endDate < startDate) {
                          showToast({ text1: '종료일은 시작일 이후로 선택해주세요.' });
                          return;
                        }

                        setDuration({
                          startDate: startDate,
                          endDate: endDate,
                        });

                        // 30일 검증
                        const diffInMs = endDate.getTime() - startDate.getTime();
                        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
                        
                        if (diffInMs >= thirtyDaysInMs) {
                          setIs30day(true);
                          console.log('Valid range selected:', {
                            startDate,
                            endDate,
                            diffInDays: diffInMs / (24 * 60 * 60 * 1000),
                          });
                        } else {
                          setIs30day(false);
                          const diffInDays = Math.ceil(diffInMs / (24 * 60 * 60 * 1000));
                          showToast({
                            text1: `선택한 기간이 ${diffInDays}일입니다. 최소 30일 이상 선택해주세요.`,
                          });
                        }
                        
                        // 종료일 선택 완료 후 다시 시작일 선택 모드로
                        setIsSelectingEndDate(false);
                      }
                    }
                  }}
                />
              </View>
            </View>
            <ButtonWrapper>
              <Button
                variant="outlined"
                style={{ marginHorizontal: 'auto', width: 85 }}
                onPress={() => bottomSheetModalRef.current?.dismiss()}
              >
                취소
              </Button>
              <Button
                variant="contained"
                disabled={!is30day}
                style={{ marginHorizontal: 'auto' }}
                onPress={() => {
                  if (!is30day) {
                    showToast({ text1: '스터디 기간은 최소 30일 이상으로 설정해주세요.' });
                    return;
                  }
                  bottomSheetModalRef.current?.dismiss();
                  showToastNobutton({ text1: '기간 수정이 성공적으로 반영되었습니다.' });
                }}
              >
                수정하기
              </Button>
            </ButtonWrapper>
          </DateView>
        }
      />
      <ModalWrapper isModalVisible={isModalVisible} toggleModal={() => toggleModal()}>
        <ModalContents>
          <View style={{ paddingHorizontal: 60, width: '100%', alignItems: 'center' }}>
            <Typography variant="subtitle2" style={{ color: colors.gray[9] }}>
              요일
            </Typography>
            <View style={{ width: '100%', marginTop: 8 }}>
              <SelectBox
                options={dayOptions}
                value={selectedSchedule.weekOfDay}
                onChange={(value) => updateDay(value)}
              />
            </View>
            <Typography variant="subtitle2" style={{ color: colors.gray[9], marginTop: 20 }}>
              시작 시간
            </Typography>
            <TimeWrapper>
              <TimeBox
                placeholder="09"
                value={extractTime(selectedSchedule.stTime).hour}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={(text) => {
                  // 숫자만 입력 가능하도록 설정
                  const numericText = text.replace(/[^0-9]/g, '');
                  // 빈 값이거나 24 미만의 값 허용
                  if (numericText === '' || (parseInt(numericText) >= 0 && parseInt(numericText) < 24)) {
                    updateStartTime(numericText, extractTime(selectedSchedule.stTime).minute);
                  }
                }}
              />
              <Typography variant="heading1" style={{ margin: 0 }}>
                :
              </Typography>
              <TimeBox
                placeholder="00"
                value={extractTime(selectedSchedule.stTime).minute}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={(text) => {
                  // 숫자만 입력 가능하도록 설정
                  const numericText = text.replace(/[^0-9]/g, '');
                  // 빈 값이거나 60 미만의 값 허용
                  if (numericText === '' || (parseInt(numericText) >= 0 && parseInt(numericText) < 60)) {
                    updateStartTime(extractTime(selectedSchedule.stTime).hour, numericText);
                  }
                }}
              />
            </TimeWrapper>
            <Typography variant="subtitle2" style={{ color: colors.gray[9], marginTop: 20 }}>
              종료 시간
            </Typography>
            <TimeWrapper>
              <TimeBox
                placeholder="10"
                value={extractTime(selectedSchedule.endTime).hour}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={(text) => {
                  // 숫자만 입력 가능하도록 설정
                  const numericText = text.replace(/[^0-9]/g, '');
                  // 빈 값이거나 24 미만의 값 허용
                  if (numericText === '' || (parseInt(numericText) >= 0 && parseInt(numericText) < 24)) {
                    updateEndTime(numericText, extractTime(selectedSchedule.endTime).minute);
                  }
                }}
              />
              <Typography variant="heading1" style={{ margin: 0 }}>
                :
              </Typography>
              <TimeBox
                placeholder="00"
                value={extractTime(selectedSchedule.endTime).minute}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={(text) => {
                  // 숫자만 입력 가능하도록 설정
                  const numericText = text.replace(/[^0-9]/g, '');
                  // 빈 값이거나 60 미만의 값 허용
                  if (numericText === '' || (parseInt(numericText) >= 0 && parseInt(numericText) < 60)) {
                    updateEndTime(extractTime(selectedSchedule.endTime).hour, numericText);
                  }
                }}
              />
            </TimeWrapper>
          </View>
          <ButtonWrapper>
            {isEditing && (
              <Button
                variant="outlined"
                onPress={() => deleteSchedule(selectedIndex)}
                style={{ marginHorizontal: 'auto', borderColor: '#E53935' }}
              >
                <Typography variant="body2" style={{ color: '#E53935' }}>
                  삭제
                </Typography>
              </Button>
            )}
            <Button variant="outlined" onPress={() => toggleModal()} style={{ marginHorizontal: 'auto' }}>
              취소
            </Button>
            <Button variant="contained" onPress={saveSchedule} style={{ marginHorizontal: 'auto' }}>
              {isEditing ? '수정하기' : '추가하기'}
            </Button>
          </ButtonWrapper>
        </ModalContents>
      </ModalWrapper>
    </ManageView>
  );
};

const RuleWrapper = () => {
  const { id } = useLocalSearchParams();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  return <FlatList data={[null]} renderItem={() => <StudySchedule {...{ id, bottomSheetModalRef }} />} />;
};
export default RuleWrapper;

const BoxTitle = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
`;

const AddAlarm = styled.Pressable`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
`;

const DateView = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: space-between;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const ModalContents = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const TimeWrapper = styled.View`
  flex-direction: row;
  gap: 5px;
  margin-top: 8px;
`;

const TimeBox = styled.TextInput`
  flex: 1;
  background: ${colors.gray[2]};
  height: 40px;
  border-radius: 4px;
  text-align: center;
  font-family: 'Pretendard-Medium';
  font-size: 15px;
  color: ${colors.black};
  padding: 0 5px;
`;
