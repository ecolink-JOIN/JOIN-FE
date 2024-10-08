import React from 'react';
import Typography from '@/components/atoms/Typography';
import { FlatList, Image, View } from 'react-native';
import { ManageView, ManageBoxView, shadowStyles } from '@/components/molecules/MyMolecules/ManageView';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import { useLocalSearchParams } from 'expo-router';
import { InfoViewBox } from '@/components/molecules/MyMolecules/InfoView';

const RoundData = [
  {
    id: 1,
    date: '2021.09.01',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 2,
    date: '2021.09.08',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 3,
    date: '2021.09.15',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 4,
    date: '2021.09.22',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 5,
    date: '2021.09.29',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 6,
    date: '2021.10.06',
    attendance: '지각',
    certification: '인증',
  },
  {
    id: 7,
    date: '2021.10.13',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 8,
    date: '2021.10.20',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 9,
    date: '2021.10.27',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 10,
    date: '2021.11.03',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 11,
    date: '2021.11.10',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 12,
    date: '2021.11.17',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 13,
    date: '2021.11.24',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 14,
    date: '2021.12.01',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 15,
    date: '2021.12.08',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 16,
    date: '2021.12.15',
    attendance: '지각',
    certification: '인증',
  },
  {
    id: 17,
    date: '2021.12.22',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 18,
    date: '2021.12.29',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 19,
    date: '2022.01.05',
    attendance: '출석',
    certification: '인증',
  },
  {
    id: 20,
    date: '2022.01.12',
    attendance: '출석',
    certification: '인증',
  },
];

const RoundCheck = (id: string | string[] | undefined) => {
  return (
    <ManageView>
      <Typography variant="heading3">나의 출석 및 인증 현황</Typography>
      <ListView style={shadowStyles.shadow}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            marginBottom: 10,
          }}
        >
          <Image
            source={require('@/assets/images/profile.png')}
            style={{
              width: 80,
              height: 80,
            }}
          />
          <Typography variant="heading4">닉네임</Typography>

          <InfoViewBox
            center
            InfoList={[
              { title: '출석률', value: '95%' },
              { title: '인증률', value: '100%' },
            ]}
          />
        </View>
        {RoundData.map((item) => (
          <RoundBox key={item.id}>
            <RoundNumber variant="body3">{item.id}회차</RoundNumber>
            <RoundStatus variant="body3" status={item.attendance} date>
              {item.date}
            </RoundStatus>
            <RoundStatus variant="body3" status={item.attendance}>
              {item.attendance}
            </RoundStatus>
            <RoundStatus variant="body3" status={item.attendance}>
              {item.certification}
            </RoundStatus>
          </RoundBox>
        ))}
      </ListView>
    </ManageView>
  );
};
const RoundCheckWrapper = () => {
  const { id } = useLocalSearchParams();
  return <FlatList data={[null]} renderItem={() => RoundCheck(id)} />;
};

export default RoundCheckWrapper;

const ListView = styled(ManageBoxView)`
  gap: 14px;
  padding: 24px 20px;
`;

const RoundBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const RoundNumber = styled(Typography)`
  flex: 1;
  color: ${colors.primary};
`;

const RoundStatus = styled(Typography)<{ status: string; date?: boolean }>`
  flex: 1;
  text-align: ${(props) => (props.date ? 'center' : 'right')};
  color: ${(props) => (props.status === '지각' ? '#D32625' : props.status === '추가 회차' ? '#2E90FA' : colors.black)};
`;
