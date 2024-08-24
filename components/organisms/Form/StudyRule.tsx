import { Pressable, View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import CustomCheckbox from '@/components/atoms/Checkbox/SquareCheckbox';

interface StudyRuleProps {
  value: number[];
  onChange: (value: number[]) => void;
}

const rules = [
  { id: 1, title: '벌금 있음' },
  { id: 2, title: '강퇴 조건 있음' },
  { id: 3, title: '사진 인증' },
  { id: 4, title: '타이머 인증' },
];

export default function StudyRule({ value, onChange }: StudyRuleProps) {
  const handleSelect = (id: number) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Typography variant="button">스터디 규칙</Typography>
        <Typography variant="body4" style={{ color: colors.primary }}>
          (중복 선택 가능)
        </Typography>
      </View>
      <CheckBoxContainer>
        {rules.map((rule) => (
          <Pressable
            key={rule.id}
            style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
            onPress={() => handleSelect(rule.id)}
          >
            <CustomCheckbox selected={value.includes(rule.id)} />
            <Typography variant="body4">{rule.title}</Typography>
          </Pressable>
        ))}
      </CheckBoxContainer>
    </View>
  );
}

const CheckBoxContainer = styled(View)`
  flex-direction: row;
  row-gap: 12;
  column-gap: 32;
  flex-wrap: wrap;
  margin-vertical: 16;
  align-items: center;
`;
