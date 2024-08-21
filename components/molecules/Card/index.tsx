import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { colors } from '@/theme';
import GradientBackground from './GradientBackground';
import CardTitle from './CardTitle';
import CardDescription from './CardDescription';

interface CardProps {
  title: string;
  leader: string;
  leaderRating: number;
  member: string;
  memberRating: number;
  views: number;
  liked: boolean;
  studyId: number;
}

function Card({ title, leader, leaderRating, member, memberRating, views, liked, studyId }: CardProps) {
  return (
    <Wrapper>
      <View
        style={{
          height: 72,
        }}
      >
        <GradientBackground liked={liked} />
      </View>

      <CardTitle>{title}</CardTitle>

      <CardDescription
        leader={leader}
        leaderRating={leaderRating}
        member={member}
        memberRating={memberRating}
        views={views}
      />
    </Wrapper>
  );
}

export default Card;

const Wrapper = styled.View`
  width: 48%;
  height: 202px;
  border-radius: 8px;
  border: 1px solid ${colors.gray[4]};
  overflow: hidden;
  position: relative;
`;
