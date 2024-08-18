import { ScrollView } from 'react-native';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import Icon from '@/components/atoms/Icon';
import StudySection from './StudySection';
import AdsCarousel from './AdsCarousel';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

function HomeSection() {
  const cardData = new Array(4).fill(0).map(() => ({
    title: '원어민 선생님과 함께 공부하실 스터디원ㅁㅇㄹㅁㅇㄴㄹㅁㄴ',
    leader: '스터디장 닉네임',
    leaderRating: 4.5,
    member: '스터디원',
    memberRating: 3.8,
    views: 100,
    liked: true,
  }));

  return (
    <ScrollView>
      <Container style={{ paddingVertical: 16, paddingHorizontal: 20 }}>
        <Typography variant="heading3">로고</Typography>
        <Container style={{ gap: 12 }}>
          <Icon name="write" />
          <Icon name="alarm" />
          <Icon name="search" />
        </Container>
      </Container>

      <AdsCarousel />

      <StudySection title="🎯 나의 맞춤 스터디" data={cardData} />
      <StudySection title="🔥 인기 스터디" data={cardData} />
      <StudySection title="⭐️ 00님의 관심 스터디" data={cardData} />
      <StudySection title="👀 최근 본 스터디" data={cardData} />
    </ScrollView>
  );
}

export default HomeSection;
