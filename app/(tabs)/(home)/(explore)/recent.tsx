import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import { colors } from '@/theme';
import Typography from '@/components/atoms/Typography';
import CardList from '@/components/molecules/CardList';

function RecentlyStudiesScreen() {
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
        <Typography variant="body2" style={{ paddingHorizontal: 20 }}>
          최근 30일 동안 조회한 스터디를{'\n'}
          최대 50개까지 보여드려요.
        </Typography>

        <CardList data={cardData} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default RecentlyStudiesScreen;
