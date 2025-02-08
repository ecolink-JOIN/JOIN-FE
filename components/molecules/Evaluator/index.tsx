import React from 'react';
import styled from 'styled-components/native';
import Badge from '@/components/atoms/Badge';
import { Radio } from '@/components/atoms/Radio';
import Typography from '@/components/atoms/Typography';

interface EvaluatorProps {
  badgeValue: string;
  question: string;
  selectedValue: number | null;
  onValueChange: (value: number) => void;
}

const Evaluator: React.FC<EvaluatorProps> = ({ badgeValue, question, selectedValue, onValueChange }) => {
  return (
    <Container>
      <Badge variant="outlined" value={badgeValue} size="medium" />

      <Typography variant="body3" style={{ marginTop: 14 }}>
        {question}
      </Typography>

      <RadioGroup>
        {[1, 2, 3, 4, 5].map((value) => (
          <RadioBox key={value} onPress={() => onValueChange(value)}>
            <Radio selected={selectedValue === value} onSelect={() => onValueChange(value)} />
            <Typography variant="body3">{value}</Typography>
          </RadioBox>
        ))}
      </RadioGroup>
    </Container>
  );
};

const Container = styled.View`
  align-items: flex-start;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const RadioGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
`;

const RadioBox = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export default Evaluator;
