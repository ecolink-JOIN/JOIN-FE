import React from 'react';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import { View, Pressable } from 'react-native';
import useOnboardingButtonSize from '@/hooks/useResponsiveOnboardingButtonSize';
import { StudyPreferences, useOnboardingContext } from '@/context/OnboardingContext';

const InterestAreaSelectPane: React.FC = () => {
  const gap = 20;
  const buttonSize = useOnboardingButtonSize({ buttonCountByRow: 3, gap });
  const { studyPreferences, setStudyPreferences } = useOnboardingContext();

  const options: {
    id: StudyPreferences['interestArea'];
    value: string;
  }[] = [
    { id: '입시', value: '입시' },
    { id: '고시', value: '고시' },
    { id: '취업', value: '취업' },
    { id: '자격증', value: '자격증' },
    { id: '사이드프로젝트', value: '사이드\r\n프로젝트' },
    { id: '기타', value: '기타' },
  ];

  return (
    <>
      <Typography variant="heading3">관심 분야를 선택해주세요.</Typography>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap,
        }}
      >
        {options.map((option) => (
          <Pressable
            key={option.id}
            style={{
              width: buttonSize,
              height: buttonSize,
              backgroundColor: studyPreferences.interestArea === option.id ? colors.sub1 : colors.white,
              borderWidth: 1,
              borderColor: colors.sub1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}
            onPress={() => {
              setStudyPreferences({
                ...studyPreferences,
                interestArea: option.id,
              });
            }}
          >
            <Typography variant="button" style={{ textAlign: 'center' }}>
              {option.value}
            </Typography>
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default InterestAreaSelectPane;
