import React from 'react';
import styled from 'styled-components/native';
import Card from '@/components/molecules/Card';
import RowView from '@/components/atoms/View/RowView';

interface CardData {
  title: string;
  leader: string;
  leaderRating: number;
  member: string;
  memberRating: number;
  views: number;
  liked: boolean;
  studyId: number;
}

interface CardListProps {
  data: CardData[];
}

const CardsContainer = styled(RowView)`
  padding: 20px;
  gap: 12px;
  flex-wrap: wrap;
`;

const CardList: React.FC<CardListProps> = ({ data }) => {
  return (
    <CardsContainer>
      {data.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          leader={item.leader}
          leaderRating={item.leaderRating}
          member={item.member}
          memberRating={item.memberRating}
          views={item.views}
          liked={item.liked}
          studyId={item.studyId}
        />
      ))}
    </CardsContainer>
  );
};

export default CardList;
