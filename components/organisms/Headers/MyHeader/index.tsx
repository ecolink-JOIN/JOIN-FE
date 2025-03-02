import React from 'react';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import RowView from '@/components/atoms/View/RowView';
import IconButton from '@/components/molecules/IconButton';
import SafeAreaView from '@/components/atoms/View/SafeAreaView';
import { useRouter } from 'expo-router';
import Typography from '@/components/atoms/Typography';

const HeaderContainer = styled(RowView)`
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${colors.white};
  border-bottom-width: 2px;
  border-bottom-color: ${colors.gray[3]};
`;

const IconContainer = styled(RowView)`
  gap: 12px;
`;

const MyHeader: React.FC = () => {
  const router = useRouter();

  const handleAlarm = () => {
    router.push('/(tabs)/(home)/alarm');
  };

  const handleSearch = async () => {
    router.push('/(tabs)/(home)/search');
  };

  return (
    <SafeAreaView>
      <HeaderContainer>
        <Typography variant="heading4">마이</Typography>
        <IconContainer>
          <IconButton name="alarm" onPress={handleAlarm} />
          <IconButton name="search" onPress={handleSearch} />
        </IconContainer>
      </HeaderContainer>
    </SafeAreaView>
  );
};

export default MyHeader;
