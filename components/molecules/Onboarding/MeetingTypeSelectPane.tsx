import React from 'react';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import { View, Pressable } from 'react-native';
import useOnboardingButtonSize from '@/hooks/useResponsiveOnboardingButtonSize';
import { StudyPreferences, useOnboardingContext } from '@/context/OnboardingContext';

const MeetingTypeSelectPane: React.FC = () => {
  const gap = 20;
  const buttonSize = useOnboardingButtonSize({ buttonCountByRow: 2, gap });
  const { studyPreferences, setStudyPreferences } = useOnboardingContext();

  const options: {
    id: StudyPreferences['meetingType'];
    value: string;
  }[] = [
    { id: 'online', value: '온라인 스터디' },
    { id: 'offline', value: '오프라인 스터디' },
  ];

  return (
    <>
      <Typography variant="heading3">모임 형태를 선택해주세요.</Typography>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: gap,
        }}
      >
        {options.map((option) => (
          <Pressable
            key={option.id}
            style={{
              width: buttonSize,
              height: buttonSize,
              backgroundColor: studyPreferences.meetingType === option.id ? colors.sub1 : colors.white,
              borderWidth: 1,
              borderColor: colors.sub1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}
            onPress={() => {
              setStudyPreferences({
                ...studyPreferences,
                meetingType: option.id,
              });
            }}
          >
            <Typography variant="button">{option.value}</Typography>
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default MeetingTypeSelectPane;
