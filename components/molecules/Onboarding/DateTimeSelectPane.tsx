import React from 'react';
import Typography from '@/components/atoms/Typography';
import { Pressable, View } from 'react-native';

import useOnboardingButtonSize from '@/hooks/useResponsiveOnboardingButtonSize';
import { colors } from '@/theme';
import { useOnboardingContext } from '@/context/OnboardingContext';

const DateTimeSelectPane: React.FC = () => {
  const daysGap = 7;
  const timeGap = 10;
  const daysButtonSize = useOnboardingButtonSize({ buttonCountByRow: 7, gap: daysGap });
  const timeButtonSize = useOnboardingButtonSize({ buttonCountByRow: 3, gap: timeGap });
  const { studyPreferences, setStudyPreferences } = useOnboardingContext();

  const daysOptions = [
    { id: 'SUNDAY', value: '일' },
    { id: 'MONDAY', value: '월' },
    { id: 'TUESDAY', value: '화' },
    { id: 'WEDNESDAY', value: '수' },
    { id: 'THURSDAY', value: '목' },
    { id: 'FRIDAY', value: '금' },
    { id: 'SATURDAY', value: '토' },
  ];

  const timeOptions = [
    { id: 'MORNING', value: '오전시간대' },
    { id: 'AFTERNOON', value: '낮시간대' },
    { id: 'EVENING', value: '저녁시간대' },
  ];

  const toggleDay = (day: string) => {
    const currentDays = studyPreferences.availableDays || [];
    const newDays = currentDays.includes(day) ? currentDays.filter((d) => d !== day) : [...currentDays, day];
    setStudyPreferences({ ...studyPreferences, availableDays: newDays });
  };

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
                backgroundColor: studyPreferences.availableDays?.includes(option.id) ? colors.primary : colors.sub2,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}
              onPress={() => toggleDay(option.id)}
            >
              <Typography
                variant="button"
                style={{ color: studyPreferences.availableDays?.includes(option.id) ? colors.white : colors.black }}
              >
                {option.value}
              </Typography>
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
                backgroundColor: studyPreferences.availableTime === option.id ? colors.primary : colors.sub2,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}
              onPress={() => setStudyPreferences({ ...studyPreferences, availableTime: option.id })}
            >
              <Typography
                variant="button"
                style={{ color: studyPreferences.availableTime === option.id ? colors.white : colors.black }}
              >
                {option.value}
              </Typography>
            </Pressable>
          ))}
        </View>
      </View>
    </>
  );
};

export default DateTimeSelectPane;
