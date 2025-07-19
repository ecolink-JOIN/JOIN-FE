import { Pressable, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import CustomCheckbox from '@/components/atoms/Checkbox/SquareCheckbox';
import RowView from '@/components/atoms/View/RowView';

interface StudyRuleProps {
  value: {
    type: StudyRequest.RuleType;
  }[];
  onChange: (value: { type: StudyRequest.RuleType }[]) => void;
}

const rules: { type: StudyRequest.RuleType; title: string }[] = [
  { type: 'FINE', title: '벌금 있음' },
  { type: 'EXPULSION', title: '강퇴 조건 있음' },
  { type: 'PHOTO_PROOF', title: '사진 인증' },
  { type: 'TIMER_PROOF', title: '타이머 인증' },
];

export default function StudyRule({ value, onChange }: StudyRuleProps) {
  const handleSelect = (type: StudyRequest.RuleType) => {
    if (value.some((v) => v.type === type)) {
      onChange(value.filter((v) => v.type !== type));
    } else {
      onChange([...value, { type }]);
    }
  };

  return (
    <View>
      <RowView style={{ gap: 8, alignItems: 'center' }}>
        <Typography variant="button">스터디 규칙</Typography>
        <Typography variant="body4" style={{ color: colors.primary }}>
          (중복 선택 가능)
        </Typography>
      </RowView>
      <CheckBoxContainer>
        {rules.map((rule) => {
          const isSelected = value.some((v) => v.type === rule.type);
          return (
            <Pressable
              key={rule.type}
              style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
              onPress={() => handleSelect(rule.type)}
            >
              <CustomCheckbox selected={isSelected} />
              <Typography variant={'body3'} style={{ color: isSelected ? colors.black : colors.gray[7] }}>
                {rule.title}
              </Typography>
            </Pressable>
          );
        })}
      </CheckBoxContainer>
    </View>
  );
}

const CheckBoxContainer = styled(RowView)`
  row-gap: 12px;
  column-gap: 32px;
  flex-wrap: wrap;
  margin: 16px 0px;
  align-items: center;
`;
