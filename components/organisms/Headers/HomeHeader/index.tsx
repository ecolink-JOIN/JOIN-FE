import { SafeAreaView, View } from 'react-native';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';
import styled from 'styled-components/native';
import { colors } from '@/theme';

const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 16px;
  padding-horizontal: 20px;
  background-color: ${colors.white};
`;

const IconContainer = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const HomeHeader = () => {
  return (
    <SafeAreaView>
      <HeaderContainer>
        <Typography variant="heading3">로고</Typography>
        <IconContainer>
          <Icon name="write" />
          <Icon name="alarm" />
          <Icon name="search" />
        </IconContainer>
      </HeaderContainer>
    </SafeAreaView>
  );
};

export default HomeHeader;