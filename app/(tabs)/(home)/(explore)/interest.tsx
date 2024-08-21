import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import { colors } from '@/theme';
import CardList from '@/components/molecules/CardList';

function InterestStudiesScreen() {
  const cardData = new Array(25).fill(0).map(() => ({
    title: '원어민 선생님과 함께 공부하실 스터디원ㅁㅇㄹㅁㅇㄴㄹㅁㄴ',
    leader: '스터디장 닉네임',
    leaderRating: 4.5,
    member: '스터디원',
    memberRating: 3.8,
    views: 100,
    liked: true,
    studyId: 0,
  }));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: colors.white }}>
        <CardList data={cardData} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default InterestStudiesScreen;
