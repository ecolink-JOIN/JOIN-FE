import styled from 'styled-components/native';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';

interface RatingProps {
  value: number;
}

const Rating: React.FC<RatingProps> = ({ value }) => {
  return (
    <RatingContainer>
      <Icon name="star" />
      <RatingText>{value}</RatingText>
    </RatingContainer>
  );
};

export default Rating;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RatingText = styled(Typography).attrs({
  variant: 'caption2',
})<Partial<React.ComponentProps<typeof Typography>>>`
  color: ${colors.gray[8]};
`;
