import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import Typography from '@/components/atoms/Typography';
import CardList from '@/components/molecules/CardList';
import RowView from '@/components/atoms/View/RowView';
import FilterBottomSheet from '@/components/organisms/FilterBottomSheet';
import { StudyService } from '@/apis';
import { useRecommendationContext } from '@/context/Recommendation';

const Container = styled(RowView)`
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

function CustomStudiesScreen() {
  const { searchData, setSearchData } = useRecommendationContext();
  const [studies, setStudies] = useState<StudyResponse.StudyInfo[]>([]);

  useEffect(() => {
    StudyService()
      .recommendation(searchData)
      .then((res) => {
        setStudies(res);
      });
  }, [searchData]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: colors.white }}>
        <Container style={{ paddingVertical: 16, paddingHorizontal: 20 }}>
          <Typography variant="subtitle2">(닉네임)님의 스터디 설정</Typography>
          <FilterBottomSheet {...{ searchData, setSearchData }} />
        </Container>

        <Typography variant="body2" style={{ paddingHorizontal: 20 }}>
          설정하신 조건으로{'\n'}
          00님에게 맞는 스터디를 골라봤어요
        </Typography>

        <CardList data={studies} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default CustomStudiesScreen;
