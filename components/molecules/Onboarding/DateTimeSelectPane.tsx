import React from 'react';
import Typography from '@/components/atoms/Typography';
import { Pressable, View } from 'react-native';

import useOnboardingButtonSize from '@/hooks/useResponsiveOnboardingButtonSize';
import { colors } from '@/theme';
import { StudyPreferences, useOnboardingContext } from '@/context/OnboardingContext';

const DateTimeSelectPane: React.FC = () => {
  const daysGap = 7;
  const timeGap = 10;
  const daysButtonSize = useOnboardingButtonSize({ buttonCountByRow: 7, gap: daysGap });
  const timeButtonSize = useOnboardingButtonSize({ buttonCountByRow: 3, gap: timeGap });
  const { studyPreferences, setStudyPreferences } = useOnboardingContext();

  const daysOptions: {
    id: ElementType<StudyPreferences['availableDays']>;
    value: string;
  }[] = [
    { id: 'sun', value: '일' },
    { id: 'mon', value: '월' },
    { id: 'tue', value: '화' },
    { id: 'wed', value: '수' },
    { id: 'thu', value: '목' },
    { id: 'fri', value: '금' },
    { id: 'sat', value: '토' },
  ];

  const timeOptions: {
    id: StudyPreferences['availableTime'];
    value: string;
  }[] = [
    { id: '11', value: '오전시간대' },
    { id: '22', value: '낮시간대' },
    { id: '333', value: '저녁시간대' },
  ];

  return (
    <>
      <Typography variant="heading3" style={{ textAlign: 'center' }}>
        참가 가능한 요일과 시간을{'\n'}선택해주세요.
      </Typography>

      <View style={{ gap: 12 }}>
        <Typography variant="body3">요일</Typography>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: daysGap,
          }}
        >
          {daysOptions.map((option) => (
            <Pressable
              key={option.id}
              style={{
                width: daysButtonSize,
                height: daysButtonSize,
                backgroundColor: studyPreferences.availableDays?.includes(option.id) ? colors.sub1 : colors.white,
                borderWidth: 1,
                borderColor: colors.sub1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}
              onPress={() => {
                const newAvailableDays = studyPreferences.availableDays?.includes(option.id)
                  ? studyPreferences.availableDays.filter((id) => id !== option.id)
                  : [...(studyPreferences.availableDays || []), option.id];

                setStudyPreferences((prev) => ({
                  ...prev,
                  availableDays: newAvailableDays,
                }));

                console.log(`Pressed: ${option.value}`);
              }}
            >
              <Typography variant="button">{option.value}</Typography>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <Typography variant="body3">시간</Typography>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: timeGap,
          }}
        >
          {timeOptions.map((option) => (
            <Pressable
              key={option.id}
              style={{
                width: timeButtonSize,
                height: 40,
                backgroundColor: studyPreferences.availableTime === option.id ? colors.sub1 : colors.white,
                borderWidth: 1,
                borderColor: colors.sub1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}
              onPress={() => {
                setStudyPreferences({
                  ...studyPreferences,
                  availableTime: option.id,
                });
              }}
            >
              <Typography variant="button">{option.value}</Typography>
            </Pressable>
          ))}
        </View>
      </View>
    </>
  );
};

export default DateTimeSelectPane;
