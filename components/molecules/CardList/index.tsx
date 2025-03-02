import React from 'react';
import styled from 'styled-components/native';
import Card from '@/components/molecules/Card';
import RowView from '@/components/atoms/View/RowView';
import Typography from '@/components/atoms/Typography';

const CardsContainer = styled(RowView)`
  padding: 20px;
  gap: 12px;
  flex-wrap: wrap;
`;

const CardList = ({ data }: { data: StudyResponse.StudyInfo[] }) => {
  return (
    <CardsContainer>
      {data.length < 1 ? (
        <Typography variant="body1">조건에 맞는 스터디가 없습니다.</Typography>
      ) : (
        data.map((item) => <Card key={item.studyToken} {...item} />)
      )}
    </CardsContainer>
  );
};

export default CardList;
