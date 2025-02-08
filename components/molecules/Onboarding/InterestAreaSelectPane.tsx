import React from 'react';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import { View, Pressable } from 'react-native';
import useOnboardingButtonSize from '@/hooks/useResponsiveOnboardingButtonSize';

const InterestAreaSelectPane: React.FC = () => {
  const gap = 20;
  const buttonSize = useOnboardingButtonSize({ buttonCountByRow: 3, gap });

  const options = [
    { id: '1', value: '입시' },
    { id: '2', value: '고시' },
    { id: '3', value: '취업' },
    { id: '4', value: '자격증' },
    { id: '5', value: '사이드 프로젝트' },
    { id: '6', value: '기타' },
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
              backgroundColor: colors.sub2,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}
            onPress={() => {
              console.log(`Pressed: ${option.value}`);
            }}
          >
            <Typography variant="button">{option.value}</Typography>
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default InterestAreaSelectPane;
