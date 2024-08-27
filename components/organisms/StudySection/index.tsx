import React from 'react';
import { View, Pressable } from 'react-native';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import { useRouter } from 'expo-router';
import CardList from '@/components/molecules/CardList';
import RowView from '@/components/atoms/View/RowView';

const Container = styled(RowView)`
  padding-top: 20px;
  padding-horizontal: 20px;
  justify-content: space-between;
`;

interface StudySectionProps {
  section: {
    page: string;
    title: string;
  };
  data: {
    title: string;
    leader: string;
    leaderRating: number;
    member: string;
    memberRating: number;
    views: number;
    liked: boolean;
    studyId: number;
  }[];
}

const StudySection: React.FC<StudySectionProps> = ({ section, data }) => {
  const router = useRouter();
  const { title, page } = section;

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

      <CardList data={data} />
    </View>
  );
};

export default StudySection;
