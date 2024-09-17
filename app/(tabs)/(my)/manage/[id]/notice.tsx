import React from 'react';
import { ManageView, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import StyledTextInput from '@/components/atoms/TextField';
import styled from 'styled-components/native';
import colors from '@/theme/colors';
import Button from '@/components/atoms/Button';
const Notice = () => {
  const [value, onChangeText] = React.useState('');

  return (
    <ManageView>
      <Typography variant="heading3">스터디 공지</Typography>
      <BoxView>
        <ReasonInput
          onChangeText={onChangeText}
          value={value}
          placeholder={'스터디 공지를 작성해주세요.'}
          style={{ height: 200 }}
          multiline={true}
        />
        <TextLimit variant="body4">{value.length || 0} / 100</TextLimit>
      </BoxView>
      <Button variant="contained" style={{ marginHorizontal: 'auto' }}>
        공지하기
      </Button>
    </ManageView>
  );
};

export default Notice;

const BoxView = styled(ManageBoxView)`
  padding: 20px;
  position: relative;
`;

const ReasonInput = styled(StyledTextInput)`
  padding: 0;
  text-align-vertical: top;
  font-size: 16px;
  border-radius: 12px;
  border: none;
`;

const TextLimit = styled(Typography)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  text-align: right;
  font-size: 12px;
  color: ${colors.gray[8]};
`;
