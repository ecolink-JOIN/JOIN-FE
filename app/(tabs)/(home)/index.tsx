import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import AdsCarousel from '@/components/organisms/AdsCarousel';
import StudySection from '@/components/organisms/StudySection';
import { colors } from '@/theme';
import BottomSheet from '@/components/molecules/BottomSheet';
import studySections from '@/constants/StudySections';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

function HomeScreen() {
  const cardData = new Array(4).fill(0).map(() => ({
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
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: colors.white }}>
        <AdsCarousel />

        <Container style={{ paddingVertical: 16, paddingHorizontal: 20 }}>
          <Typography variant="subtitle1">(닉네임)님의 스터디 설정</Typography>
          <BottomSheet />
        </Container>

        <StudySection section={studySections.custom} data={cardData} />
        <StudySection section={studySections.popular} data={cardData} />
        <StudySection section={studySections.interest} data={cardData} />
        <StudySection section={studySections.recent} data={cardData} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
