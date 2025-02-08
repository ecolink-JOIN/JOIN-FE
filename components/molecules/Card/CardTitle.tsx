import React, { PropsWithChildren } from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';

const CardTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <TitleWrapper>
      <Typography variant="body3" numberOfLines={2} ellipsizeMode="tail">
        {children}
      </Typography>
    </TitleWrapper>
  );
};

export default CardTitle;

const TitleWrapper = styled.View`
  padding-top: 10px;
  padding-horizontal: 12px;
`;
