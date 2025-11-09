import React from 'react';
import Icon from '@/components/atoms/Icon';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import RowView from '@/components/atoms/View/RowView';
import IconButton from '@/components/molecules/IconButton';
import SafeAreaView from '@/components/atoms/View/SafeAreaView';
import { useRouter } from 'expo-router';
import Logo from '@/assets/icons/appbar_logo.svg';

const HeaderContainer = styled(RowView)`
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${colors.white};
`;

const IconContainer = styled(RowView)`
  gap: 12px;
`;

const HomeHeader: React.FC = () => {
  const router = useRouter();

  const handleWrite = () => {
    router.push('/(form)/recruit-base');
  };

  const handleAlarm = () => {
    router.push('/(tabs)/(home)/alarm');
  };

  const handleSearch = () => {
    router.push('/study/search');
  };

  return (
    <SafeAreaView>
      <HeaderContainer>
        <Logo />
        <IconContainer>
          <Icon name="write" onPress={handleWrite} />
          <IconButton name="alarm" onPress={handleAlarm} />
          <IconButton name="search" onPress={handleSearch} />
        </IconContainer>
      </HeaderContainer>
    </SafeAreaView>
  );
};

export default HomeHeader;
