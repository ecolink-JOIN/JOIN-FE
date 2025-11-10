import React, { useRef, useState, useMemo } from 'react';
import { Href, router, useLocalSearchParams } from 'expo-router';
import { ManageView, ManageBox, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import {
  Attendance,
  KakaoLink,
  StudyAnnouncement,
  MyAttendance,
  StudySchedule,
} from '@/components/organisms/MyPage/Manage';
import { FlatList, View } from 'react-native';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { StudyService } from '@/apis';

// 한국어 설정
LocaleConfig.locales['ko'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'ko';

const StudyStatus = ({ id }: { id: string | string[] | undefined }) => {
  const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
  const [studyDates, setStudyDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const studyToken = typeof id === 'string' ? id : '';

  // 스터디 규칙 가져오기
  React.useEffect(() => {
    const fetchStudyDates = async () => {
      try {
        setLoading(true);
        const ruleData = await StudyService().getRules(studyToken);

        // 시작일, 종료일, 요일 정보를 바탕으로 스터디 날짜 계산
        const dates = calculateStudyDates(
          ruleData.startDate,
          ruleData.endDate,
          ruleData.schedules.map((s: any) => s.weekOfDay),
        );
        setStudyDates(dates);
      } catch (error) {
        console.error('Failed to fetch study dates:', error);
      } finally {
        setLoading(false);
      }
    };

    if (studyToken) {
      fetchStudyDates();
    }
  }, [studyToken]);

  // 시작일부터 종료일까지 해당 요일에 해당하는 모든 날짜 계산
  const calculateStudyDates = (startDate: string, endDate: string, weekDays: string[]): string[] => {
    const dates: string[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 요일을 숫자로 변환 (MON=1, TUE=2, ..., SUN=0)
    const weekDayMap: Record<string, number> = {
      SUN: 0,
      MON: 1,
      TUE: 2,
      WED: 3,
      THU: 4,
      FRI: 5,
      SAT: 6,
    };

    const targetDays = weekDays.map((day) => weekDayMap[day]);

    const current = new Date(start);
    while (current <= end) {
      if (targetDays.includes(current.getDay())) {
        const year = current.getFullYear();
        const month = String(current.getMonth() + 1).padStart(2, '0');
        const day = String(current.getDate()).padStart(2, '0');
        dates.push(`${year}-${month}-${day}`);
      }
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  // 스터디 날짜를 markedDates 형식으로 변환
  const markedDates = useMemo(() => {
    const marked: { [key: string]: any } = {};
    studyDates.forEach((date) => {
      marked[date] = {
        selected: true,
        selectedColor: colors.primary,
        marked: true,
        dotColor: colors.white,
      };
    });
    return marked;
  }, [studyDates]);

  const handlePresentM = () => {
    bottomSheetModalRef.current?.present();
  };

  return (
    <>
      <ManageView>
        <Typography variant="heading3">스터디 현황</Typography>
        <ManageBox
          title="스터디 공지"
          icon="arrow-right"
          onPress={() => router.push(`member/${studyToken}/notice` as Href)}
        >
          <StudyAnnouncement />
        </ManageBox>
        <ManageBox title="나의 출석 및 인증 현황">
          <MyAttendance id={studyToken} />
        </ManageBox>
        <ManageBox title="스터디 출석 및 인증 현황">
          <Attendance studyToken={studyToken} />
        </ManageBox>
        <ManageBox title="스터디 스케쥴" icon="arrow-right" onPress={handlePresentM}>
          <StudySchedule studyToken={studyToken} />
        </ManageBox>

        <ManageBox title="스터디 카카오톡 링크">
          <KakaoLink studyToken={studyToken} />
        </ManageBox>
        <ManageBox>
          <ListComponent title="스터디 탈퇴" onPress={() => router.push(`member/${studyToken}/leave` as Href)} />
        </ManageBox>
      </ManageView>

      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={['80%']}
        enableDynamicSizing={false}
        component={
          <CalendarView>
            <Typography variant="heading4" style={{ marginBottom: 24 }}>
              스터디 일정
            </Typography>
            {loading ? (
              <Typography variant="body3" style={{ color: colors.gray[7], textAlign: 'center' }}>
                로딩 중...
              </Typography>
            ) : (
              <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 8 }}>
                <Calendar
                  markedDates={markedDates}
                  theme={{
                    backgroundColor: 'transparent',
                    calendarBackground: 'transparent',
                    textSectionTitleColor: colors.gray[6],
                    selectedDayBackgroundColor: colors.primary,
                    selectedDayTextColor: colors.white,
                    todayTextColor: colors.primary,
                    todayBackgroundColor: colors.primary + '10',
                    dayTextColor: colors.black,
                    textDisabledColor: colors.gray[4],
                    dotColor: colors.primary,
                    selectedDotColor: colors.white,
                    arrowColor: colors.primary,
                    monthTextColor: colors.black,
                    textDayFontWeight: '400',
                    textMonthFontWeight: '600',
                    textDayHeaderFontWeight: '500',
                    textDayFontSize: 14,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 12,
                  }}
                />
              </View>
            )}
          </CalendarView>
        }
      />
    </>
  );
};

const StudyStatusWrapper = () => {
  const { id } = useLocalSearchParams();

  return <FlatList data={[null]} renderItem={() => <StudyStatus id={id} />} />;
};

export default StudyStatusWrapper;

const CalendarView = styled.View`
  padding: 16px;
`;
