import React from 'react';
import { StyleSheet } from 'react-native';
import { colors } from '@/theme';
import Typography from '../Typography';
import { ButtonProps, StyledButton } from './StyledButton';
import styled from 'styled-components/native';

const styles = StyleSheet.create({
  contained: {
    color: colors.white,
  },
  outlined: {
    color: colors.primary,
  },
  disabled: {
    color: colors.gray[7],
  },
});

interface PrimaryButtonProps extends ButtonProps {
  variant: 'contained' | 'outlined';
  children: React.ReactNode;
}

const PrimaryButton = styled(StyledButton)<PrimaryButtonProps>`
  background-color: ${({ variant, disabled }) =>
    disabled ? colors.gray[2] : variant === 'contained' ? colors.primary : 'transparent'};
  border-width: ${({ variant }) => (variant === 'outlined' ? '1px' : 0)};
  border-color: ${({ variant }) => (variant === 'outlined' ? colors.primary : 'transparent')};
`;

const Button: React.FC<PrimaryButtonProps> = ({ variant, children, fullWidth, size = 'medium', ...props }) => {
  return (
    <PrimaryButton variant={variant} fullWidth={fullWidth} size={size} {...props}>
      <Typography
        variant="button"
        style={props.disabled ? styles.disabled : styles[variant]}
        disabled={!!props.disabled}
      >
        {children}
      </Typography>
    </PrimaryButton>
  );
};

export default Button;
