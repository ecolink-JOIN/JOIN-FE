// import { View, Text } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';

const MyHeader = () => {
  return (
    <Container>
      <Typography variant="heading4">마이</Typography>
      <IconContainer>
        <Icon name="alarm-unread" />
        <Icon name="search" />
      </IconContainer>
    </Container>
  );
};

export default MyHeader;

const Container = styled.View`
  flex-direction: row;
  width: 96%;
  align-items: center;
  justify-content: space-between;
`;

const IconContainer = styled.View`
  align-items: center;
  flex-direction: row;
  gap: 12px;
`;
