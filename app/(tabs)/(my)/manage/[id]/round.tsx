import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import Typography from '@/components/atoms/Typography';
import { ManageView, ManageBox, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import { Radio } from '@/components/atoms/Radio';
import { styled } from 'styled-components/native';
import { Pressable } from 'react-native';
import { colors } from '@/theme';

const Round = () => {
  const { id } = useLocalSearchParams();
  const [auto, setAuto] = React.useState(true);
  return (
    <ManageView>
      <Typography variant="heading3">스터디 회차 설정</Typography>
      <ManageBox>
        <Typography variant="button" style={{ paddingVertical: 12 }}>
          스터디 회차
        </Typography>
        <RadioGroup>
          <RadioBox onPress={() => setAuto(true)}>
            <Radio selected={auto} />
            <Typography variant="body3" style={{ color: auto ? colors.black : colors.gray[7] }}>
              자동생성
            </Typography>
          </RadioBox>
          <RadioBox onPress={() => setAuto(false)}>
            <Radio selected={!auto} />
            <Typography variant="body3" style={{ color: auto ? colors.gray[7] : colors.black }}>
              수동생성
            </Typography>
          </RadioBox>
        </RadioGroup>
      </ManageBox>
      <ManageBox>
        <ListComponent title="스터디 회차 확인" href={`/manage/${id}/round/add`} />
      </ManageBox>
      <ManageBox>
        <ListComponent title="회차 추가 및 제외" href={`/manage/${id}/round/add`} />
      </ManageBox>
    </ManageView>
  );
};

export default Round;

const RadioGroup = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding-bottom: 8px;
`;

const RadioBox = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
