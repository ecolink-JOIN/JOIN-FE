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
  default: {
    color: colors.gray[7],
  },
  disabled: {
    color: colors.gray[7],
  },
});

export interface PrimaryButtonProps extends ButtonProps {
  variant: 'contained' | 'outlined' | 'default';
  children: React.ReactNode;
}

const PrimaryButton = styled(StyledButton)<PrimaryButtonProps>`
  background-color: ${({ variant, disabled }) =>
    disabled
      ? colors.gray[2]
      : variant === 'contained'
        ? colors.primary
        : variant === 'default'
          ? colors.gray[2]
          : 'transparent'};
  border-width: ${({ variant }) => (variant === 'outlined' ? '1px' : 0)};
  border-color: ${({ variant }) => (variant === 'outlined' ? colors.primary : 'transparent')};
`;

const Button: React.FC<PrimaryButtonProps> = ({
  variant = 'default',
  children,
  fullWidth,
  size = 'medium',
  ...props
}) => {
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
