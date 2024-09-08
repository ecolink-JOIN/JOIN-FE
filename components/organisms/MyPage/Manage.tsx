import { View } from 'react-native';
import { colors } from '@/theme';
import Typography from '@/components/atoms/Typography';
import React from 'react';
import styled from 'styled-components/native';
import { Switch } from '@/components/atoms/Switch';
import JoinedStatus from './Main/JoinedStatus';
import { InfoViewBox } from '@/components/molecules/MyMolecules/InfoView';

// 진행 현황
export const Status = ({ value }: { value: boolean }) => {
  const [toggle, setToggle] = React.useState(value);

  return (
    <LineView>
      <Typography variant="button">모집 상태</Typography>
      <LineView>
        <Typography variant="button" style={{ color: colors.gray[7], paddingRight: 12 }}>
          모집 완료
        </Typography>
        <Switch value={toggle} onValueChange={setToggle} />
      </LineView>
    </LineView>
  );
};

// 스터디 출석 및 인증 현황
export const Attendance = () => {
  return (
    <View>
      <InfoViewBox
        InfoList={[
          { title: '출석률', value: '100%' },
          { title: '인증률', value: '97%' },
        ]}
      />
    </View>
  );
};

//스터디 인증 승인
export const Approval = () => {
  return <View></View>;
};

//스터디 카카오톡 링크
export const KakaoLink = () => {
  return <View></View>;
};

const LineView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;
