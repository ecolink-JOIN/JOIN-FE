import React, { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import { useRouter } from 'expo-router';
import CardList from '@/components/molecules/CardList';
import RowView from '@/components/atoms/View/RowView';
import studySections from '@/constants/StudySections';
import { BookmarksService, StudyService, ViewsService } from '@/apis';

const Container = styled(RowView)`
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
`;

interface StudySectionProps {
  section: {
    page: string;
    title: string;
  };
  searchParam: StudyRequest.Recommendation;
}

const studyProps: ViewsRequest.GetViewsParams = {
  pageNumber: 0,
  pageSize: 4,
};

const StudySection: React.FC<StudySectionProps> = ({ section, searchParam }) => {
  const [studies, setStudies] = useState<StudyResponse.StudyInfo[]>([]);
  const router = useRouter();
  const { title, page } = section;

  useEffect(() => {
    if (section === studySections.custom) {
      StudyService()
        .recommendation(searchParam)
        .then((res) => {
          setStudies(res);
        });
    } else if (section === studySections.popular) {
      // StudyService()
      //   .popular(searchData)
      //   .then((res) => {
      //     setStudies(res);
      //   });
    }
  }, [searchParam, section]);

  useEffect(() => {
    if (section === studySections.interest) {
      BookmarksService()
        .getBookmarks(studyProps)
        .then((res) => {
          setStudies(res.content);
        });
    } else if (section === studySections.recent) {
      ViewsService()
        .getViews(studyProps)
        .then((res) => {
          setStudies(res.content);
        });
    }
  }, [section]);

  const handleMorePress = () => {
    router.setParams({ title });
    router.push(`/(tabs)/(home)/${page}`);
  };

  return (
    <View>
      <Container>
        <Typography variant="subtitle1">{title}</Typography>
        <Pressable onPress={handleMorePress}>
          <Typography variant="subtitle2" style={{ color: colors.gray[7] }}>
            전체보기
          </Typography>
        </Pressable>
      </Container>

      <CardList data={studies} />
    </View>
  );
};

export default StudySection;
