import { ManageView, shadowStyles } from '@/components/molecules/MyMolecules/ManageView';
import React, { useState } from 'react';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import StyledTextInput from '@/components/atoms/TextField';
import Button from '@/components/atoms/Button';
import Toast from 'react-native-toast-message';
import { StudyService } from '@/apis';
import { useLocalSearchParams } from 'expo-router';

const RuleEdit = () => {
  const { token, ruleExp } = useLocalSearchParams();
  const [newRuleExp, setNewRuleExp] = useState(ruleExp as string);
  const showToastNobutton = ({ text1 }: { text1: string }) => {
    Toast.show({
      type: 'formNoButton',
      text1,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  return (
    <ManageView>
      <Typography variant="heading3">규칙 안내 메세지 수정</Typography>
      <ReasonInput
        placeholder="운영규칙을 입력해주세요."
        value={newRuleExp}
        onChangeText={setNewRuleExp}
        style={(shadowStyles.shadow, { height: 200 })}
      />
      <Button
        onPress={() => {
          StudyService().patchRules(token as string, {
            ruleExp: newRuleExp,
          });
          showToastNobutton({ text1: '규칙 안내 수정을 완료했습니다.' });
        }}
        variant="contained"
        style={{ marginHorizontal: 'auto' }}
      >
        수정하기
      </Button>
    </ManageView>
  );
};

export default RuleEdit;

const ReasonInput = styled(StyledTextInput)`
  text-align-vertical: top;

  font-size: 16px;
  font-family: 'Pretendard-Medium';
  margin-top: 10px;
  padding: 24px 20px;
  border-radius: 12px;
`;
