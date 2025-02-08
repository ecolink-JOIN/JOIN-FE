import React from 'react';
import styled from 'styled-components/native';
import Card from '@/components/molecules/Card';
import RowView from '@/components/atoms/View/RowView';

const CardsContainer = styled(RowView)`
  padding: 20px;
  gap: 12px;
  flex-wrap: wrap;
`;

const CardList = ({ data }: { data: StudyResponse.StudyInfo[] }) => {
  return (
    <CardsContainer>
      {data.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </CardsContainer>
  );
};

export default CardList;
