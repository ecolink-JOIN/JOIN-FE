import React from 'react';
import { View, Pressable } from 'react-native';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import Card from '@/components/molecules/Card';
import { colors } from '@/theme';

const Container = styled.View`
  padding-top: 20px;
  padding-horizontal: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const CardsContainer = styled.View`
  padding: 20px;
  gap: 12px;
  flex-direction: row;
  flex-wrap: wrap;
`;

interface StudySectionProps {
  title: string;
  data: {
    title: string;
    leader: string;
    leaderRating: number;
    member: string;
    memberRating: number;
    views: number;
    liked: boolean;
  }[];
}

const StudySection: React.FC<StudySectionProps> = ({ title, data }) => (
  <View>
    <Container>
      <Typography variant="subtitle1">{title}</Typography>
      <Pressable>
        <Typography variant="subtitle2" style={{ color: colors.gray[7] }}>
          전체보기
        </Typography>
      </Pressable>
    </Container>

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
        />
      ))}
    </CardsContainer>
  </View>
);

export default StudySection;
