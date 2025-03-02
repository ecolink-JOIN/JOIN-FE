import React from 'react';
import { View } from 'react-native';
import Badge from '@/components/atoms/Badge';
import InfoWithRating from '@/components/molecules/Card/InfoWithRating';
import StudyInfoSection from '@/components/molecules/StudyInfoSection';
import { colors } from '@/theme';
import RowView from '@/components/atoms/View/RowView';

const WEEK_OF_DAY_MAP: Record<SharedStudy.PossibleDays, string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};

const StudyOverviewSection = ({ props }: { props: StudyResponse.Detail['data'] | null }) => {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <RowView
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingTop: 28,
          paddingBottom: 28,
          paddingRight: 8,
        }}
      >
        <RowView style={{ gap: 8 }}>
          {props?.form === 'ONLINE' && <Badge variant="outlined" value="온라인" />}
          {props?.form === 'OFFLINE' && <Badge variant="outlined" value="오프라인" />}
          {props?.recruitEndDate && new Date(props?.recruitEndDate) > new Date() && (
            <Badge variant="contained" value="모집 중" />
          )}
          {props?.recruitEndDate && new Date(props?.recruitEndDate) < new Date() && (
            <Badge variant="simple" value="마감" />
          )}
        </RowView>
        <View style={{ gap: 4 }}>
          {/* TODO: 스터디장 평점 추가 */}
          <InfoWithRating name="스터디장" rating={0} />
          {/* TODO: 스터디원 평점 추가 */}
          <InfoWithRating name="스터디원" rating={0} />
        </View>
      </RowView>

      <View
        style={{
          backgroundColor: colors.sub2,
          borderRadius: 12,
          padding: 20,
          gap: 10,
        }}
      >
        <StudyInfoSection title="스터디 소개" content={props?.introduction ?? ''} />
      </View>

      <View style={{ gap: 4, paddingTop: 24, paddingHorizontal: 8 }}>
        <StudyInfoSection row title="모집인원" content={props?.capacity.toString() ?? '0'} />
        <StudyInfoSection row title="활동기간" content={`${props?.stDate.toString()} - ${props?.endDate.toString()}`} />
        <StudyInfoSection
          row
          title="일시"
          content={
            props?.schedules
              .map(
                (schedule) =>
                  `${WEEK_OF_DAY_MAP[schedule.weekOfDay]} ${schedule.stTime.slice(0, 5)} - ${schedule.endTime.slice(0, 5)}`,
              )
              .join('\n') ?? ''
          }
        />
      </View>
    </View>
  );
};

export default StudyOverviewSection;
