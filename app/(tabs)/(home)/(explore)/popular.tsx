import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import BottomSheet from '@/components/molecules/BottomSheet';
import { colors } from '@/theme';
import Typography from '@/components/atoms/Typography';
import CardList from '@/components/molecules/CardList';
import RowView from '@/components/atoms/View/RowView';

const Container = styled(RowView)`
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

function PopularStudiesScreen() {
  const cardData = new Array(25).fill(0).map(() => ({
    title: '원어민 선생님과 함께 공부하실 스터디원ㅁㅇㄹㅁㅇㄴㄹㅁㄴ',
    leader: '스터디장 닉네임',
    leaderRating: 4.5,
    member: '스터디원',
    memberRating: 3.8,
    views: 100,
    liked: false,
    studyId: 0,
  }));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: colors.white }}>
        <Container style={{ paddingVertical: 16, paddingHorizontal: 20 }}>
          <Typography variant="subtitle2">(닉네임)님의 스터디 설정</Typography>
          <BottomSheet />
        </Container>

        <Typography variant="body2" style={{ paddingHorizontal: 20 }}>
          설정하신 조건에서{'\n'}
          인기있는 스터디를 추천드려요.
        </Typography>

        <CardList data={cardData} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default PopularStudiesScreen;
