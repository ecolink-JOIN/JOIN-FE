import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { colors } from '@/theme';
import GradientBackground from './GradientBackground';
import CardTitle from './CardTitle';
import CardDescription from './CardDescription';
import { useRouter } from 'expo-router';

const Card: React.FC<StudyResponse.StudyInfo> = (props) => {
  const router = useRouter();

  const handleCardPress = () => {
    router.push(`/(tabs)/(home)/(study)/${props.studyToken}`);
  };

  return (
    <Wrapper onPress={handleCardPress}>
      <View style={{ height: 72 }}>
        <GradientBackground liked={props.isBookmark} study_token={props.studyToken} />
      </View>
      <CardTitle>{props.title}</CardTitle>
      <CardDescription
        leader={props.leader.nickname}
        leaderRating={props.leader.totalRating}
        member={''}
        memberRating={props.memberAverage}
        views={props.viewCount}
      />
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.Pressable`
  width: 48%;
  height: 202px;
  border-radius: 8px;
  border: 1px solid ${colors.gray[4]};
  overflow: hidden;
  position: relative;
`;
