import React, { PropsWithChildren } from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import { ButtonProps, StyledButton } from './StyledButton';
import Icon from '@/components/atoms/Icon';
import { colors } from '@/theme';
import { ColorValue } from '@/theme/colors/types';

interface OauthButtonProps extends PropsWithChildren<ButtonProps> {
  oauth: 'kakao' | 'google' | 'apple' | 'naver';
}

const backgroundColors: Record<OauthButtonProps['oauth'], ColorValue> = {
  kakao: '#FEE500',
  naver: '#05B918',
  google: '#000',
  apple: '#000',
};

const OauthButton = styled(StyledButton).attrs({
  size: 'medium',
})<OauthButtonProps>`
  flex-direction: row;
  align-items: center;
  padding: 4px 20px;
  background-color: ${({ oauth }) => backgroundColors[oauth]};
`;

const IconContainer = styled.View`
  position: absolute;
  left: 20px;
`;

const OauthButtonText = styled(Typography)<Pick<OauthButtonProps, 'oauth'>>`
  position: absolute;
  color: ${({ oauth }) => (oauth === 'kakao' ? '#000' : colors.white)};
  text-align: center;
  flex: 1;
`;

const Button: React.FC<OauthButtonProps> = ({ children, fullWidth, oauth, ...props }) => {
  return (
    <OauthButton fullWidth={fullWidth} oauth={oauth} {...props}>
      <IconContainer>
        <Icon name={oauth} />
      </IconContainer>
      <OauthButtonText oauth={oauth} variant="button">
        {children}
      </OauthButtonText>
    </OauthButton>
  );
};

export default Button;
