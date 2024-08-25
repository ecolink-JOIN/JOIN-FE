import React from 'react';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';
import IconButton from '@/components/molecules/IconButton';
import { colors } from '@/theme';
import Typography from '@/components/atoms/Typography';
import RowView from '@/components/atoms/View/RowView';

interface MoreStudiesHeaderProps {
  title: string;
}

const HeaderContainer = styled(RowView)`
  align-items: center;
  height: 60px;
  background-color: ${colors.white};
  padding-vertical: 8px;
  padding-horizontal: 20px;
`;

const IconContainer = styled.View`
  margin-right: 8px;
`;

const Title = styled(Typography).attrs({
  variant: 'subtitle1',
})<Partial<React.ComponentProps<typeof Typography>>>``;

const MoreStudiesHeader: React.FC<MoreStudiesHeaderProps> = ({ title }) => {
  const router = useRouter();

  return (
    <HeaderContainer>
      <IconContainer>
        <IconButton name="arrow-left" onPress={() => router.back()} />
      </IconContainer>
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

export default MoreStudiesHeader;
