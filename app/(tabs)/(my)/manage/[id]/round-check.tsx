import React from 'react';
import Typography from '@/components/atoms/Typography';
import { FlatList, View } from 'react-native';
import { ManageView, ManageBoxView, shadowStyles } from '@/components/molecules/MyMolecules/ManageView';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import { useLocalSearchParams } from 'expo-router';

const RoundData = [
  {
    id: 1,
    date: '2021.09.01',
    status: '완료',
  },
  {
    id: 2,
    date: '2021.09.08',
    status: '완료',
  },
  {
    id: 3,
    date: '2021.09.15',
    status: '완료',
  },
  {
    id: 4,
    date: '2021.09.22',
    status: '완료',
  },
  {
    id: 5,
    date: '2021.09.29',
    status: '완료',
  },
  {
    id: 6,
    date: '2021.10.06',
    status: '제외',
  },
  {
    id: 7,
    date: '2021.10.13',
    status: '완료',
  },
  {
    id: 8,
    date: '2021.10.20',
    status: '완료',
  },
  {
    id: 9,
    date: '2021.10.27',
    status: '완료',
  },
  {
    id: 10,
    date: '2021.11.03',
    status: '완료',
  },
  {
    id: 11,
    date: '2021.11.10',
    status: '완료',
  },
  {
    id: 12,
    date: '2021.11.17',
    status: '완료',
  },
  {
    id: 13,
    date: '2021.11.24',
    status: '완료',
  },
  {
    id: 14,
    date: '2021.12.01',
    status: '완료',
  },
  {
    id: 15,
    date: '2021.12.08',
    status: '진행 예정',
  },
  {
    id: 16,
    date: '2021.12.15',
    status: '추가 회차',
  },
  {
    id: 17,
    date: '2021.12.22',
    status: '진행 예정',
  },
  {
    id: 18,
    date: '2021.12.29',
    status: '진행 예정',
  },
  {
    id: 19,
    date: '2022.01.05',
    status: '진행 예정',
  },
  {
    id: 20,
    date: '2022.01.12',
    status: '진행 예정',
  },
];

const RoundCheck = (id: string | string[] | undefined) => {
  return (
    <ManageView>
      <Typography variant="heading3">스터디 회차 확인</Typography>
      <ListView style={shadowStyles.shadow}>
        {RoundData.map((item) => (
          <RoundBox key={item.id}>
            <RoundNumber variant="body3">{item.id}회차</RoundNumber>
            <RoundStatus variant="body3" status={item.status} date>
              {item.date}
            </RoundStatus>
            <RoundStatus variant="body3" status={item.status}>
              {item.status}
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
  gap: 10px;
`;

const RoundNumber = styled(Typography)`
  flex: 1;
  color: ${colors.primary};
`;

const RoundStatus = styled(Typography)<{ status: string; date?: boolean }>`
  flex: 1;
  text-align: ${(props) => (props.date ? 'center' : 'right')};
  color: ${(props) => (props.status === '제외' ? '#D32625' : props.status === '추가 회차' ? '#2E90FA' : colors.black)};
`;
