import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import Icon from '@/components/atoms/Icon';
import AdsCarousel from '@/components/organisms/AdsCarousel';
import StudySection from '@/components/organisms/StudySection';
import { colors } from '@/theme';
import BottomSheet from '@/components/molecules/BottomSheet';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView>
          <ScrollView style={{ backgroundColor: colors.white }}>
            <Container style={{ paddingVertical: 16, paddingHorizontal: 20 }}>
              <Typography variant="heading3">로고</Typography>
              <Container style={{ gap: 12 }}>
                <Icon name="write" />
                <Icon name="alarm" />
                <Icon name="search" />
              </Container>
            </Container>

            <AdsCarousel />

            <Container style={{ paddingVertical: 16, paddingHorizontal: 20 }}>
              <Typography variant="subtitle1">(닉네임)님의 스터디 설정</Typography>
              <BottomSheet />
            </Container>

            <StudySection title="🎯 나의 맞춤 스터디" data={cardData} />
            <StudySection title="🔥 인기 스터디" data={cardData} />
            <StudySection title="⭐️ 00님의 관심 스터디" data={cardData} />
            <StudySection title="👀 최근 본 스터디" data={cardData} />
          </ScrollView>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default HomeScreen;
