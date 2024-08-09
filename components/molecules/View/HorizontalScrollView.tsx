import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

interface HorizontalScrollViewProps {
  height: string | number;
}
const HorizontalScrollView = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})<HorizontalScrollViewProps>`
  flex-direction: row;
  max-height: ${({ height }) => height ?? height};
`;

export default HorizontalScrollView;
