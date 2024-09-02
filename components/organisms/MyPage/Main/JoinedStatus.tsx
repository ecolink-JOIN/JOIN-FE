import React from 'react';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import Typography from '@/components/atoms/Typography';

interface JoinedStatusProps {
  ongoing: number;
  completed: number;
}

const JoinedStatus = ({ ongoing, completed }: JoinedStatusProps) => {
  const Info = [
    {
      title: '진행중인 스터디',
      text: `${ongoing}개`,
    },
    {
      title: '완료한 스터디',
      text: `${completed}개`,
    },
  ];
  return (
    <Container>
      {Info.map((info, idx) => (
        <Status key={idx}>
          <StatusTitle variant="body3">{info.title}</StatusTitle>
          <StatusText variant="heading4">{info.text}</StatusText>
        </Status>
      ))}
    </Container>
  );
};

export default JoinedStatus;

const Container = styled.View`
  flex-direction: row;
  gap: 36px;
  background-color: white;
  border: 3px solid ${colors.primary + '50'};
  border-radius: 16px;
  padding: 16px;
  justify-content: center;
  align-items: center;
`;

const Status = styled.View`
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const StatusTitle = styled(Typography)`
  color: ${colors.gray[9]};
`;

const StatusText = styled(Typography)`
  color: ${colors.primary};
`;
