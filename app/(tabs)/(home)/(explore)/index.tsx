import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import AdsCarousel from '@/components/organisms/AdsCarousel';
import StudySection from '@/components/organisms/StudySection';
import { colors } from '@/theme';
import studySections from '@/constants/StudySections';
import RowView from '@/components/atoms/View/RowView';
import FilterBottomSheet from '@/components/organisms/FilterBottomSheet';
import { useEffect, useState } from 'react';

const Container = styled(RowView)`
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

function HomeScreen() {
  const [searchData, setSearchData] = useState<StudyRequest.Recommendation>({});

  useEffect(() => {
    console.log('searchData', searchData);
  }, [searchData]);

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: colors.white }}>
        <AdsCarousel />

        <Container style={{ paddingVertical: 16, paddingHorizontal: 20 }}>
          <Typography variant="subtitle1">(닉네임)님의 스터디 설정</Typography>
          <FilterBottomSheet {...{ searchData, setSearchData }} />
        </Container>

        <StudySection section={studySections.custom} searchParam={searchData} />
        <StudySection section={studySections.popular} searchParam={searchData} />
        <StudySection section={studySections.interest} searchParam={searchData} />
        <StudySection section={studySections.recent} searchParam={searchData} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
