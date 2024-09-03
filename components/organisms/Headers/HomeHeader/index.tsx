import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import RowView from '@/components/atoms/View/RowView';
import IconButton from '@/components/molecules/IconButton';
import SearchModal from '../../SearchModal';

const HeaderContainer = styled(RowView)`
  justify-content: space-between;
  align-items: center;
  padding-vertical: 16px;
  padding-horizontal: 20px;
  background-color: ${colors.white};
`;

const IconContainer = styled(RowView)`
  gap: 12px;
`;

const HomeHeader: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
      <HeaderContainer>
        <Typography variant="heading3">로고</Typography>
        <IconContainer>
          <Icon name="write" />
          <Icon name="alarm" />
          <IconButton name="search" onPress={openModal} />
        </IconContainer>
      </HeaderContainer>

      <SearchModal visible={isModalVisible} onClose={closeModal} />
    </SafeAreaView>
  );
};

export default HomeHeader;
