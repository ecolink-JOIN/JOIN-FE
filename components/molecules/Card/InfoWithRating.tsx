import React from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import Rating from '../Rating';

interface InfoWithRatingProps {
  name: string;
  rating: number;
}

const InfoWithRating: React.FC<InfoWithRatingProps> = ({ name, rating }) => {
  return (
    <Container>
      <DescriptionTypography>{name}</DescriptionTypography>
      <Rating value={rating} />
    </Container>
  );
};

export default InfoWithRating;

const Container = styled.View`
  flex-direction: row;
  gap: 4px;
`;

const DescriptionTypography = styled(Typography).attrs({
  variant: 'caption2',
})<Partial<React.ComponentProps<typeof Typography>>>`
  color: ${colors.gray[8]};
`;
