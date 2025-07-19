import React from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import { View } from 'react-native';
import InfoWithRating from './InfoWithRating';
import { colors } from '@/theme';

interface CardDescriptionProps {
  leader: string;
  leaderRating: number;
  member: string;
  memberRating: number;
  views: number;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ leader, leaderRating, member, memberRating, views }) => {
  return (
    <DescriptionWrapper>
      <InfoWithRating name={'스터디장: ' + leader} rating={leaderRating} />
      <InfoWithRating name={'스터디원 평균' + member} rating={memberRating} />

      <View style={{ alignItems: 'flex-end' }}>
        <ViewsTypography>조회수 {views}회</ViewsTypography>
      </View>
    </DescriptionWrapper>
  );
};

export default CardDescription;

const DescriptionWrapper = styled.View`
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  gap: 4px;
`;

const ViewsTypography = styled(Typography).attrs({
  variant: 'caption3',
})<Partial<React.ComponentProps<typeof Typography>>>`
  color: ${colors.gray[7]};
`;
