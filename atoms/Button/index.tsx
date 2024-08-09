import React from 'react';
import styled from 'styled-components/native';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { colors } from '@/theme';
import Typography from '../Typography';

interface ButtonProps extends PressableProps {
  variant: 'contained' | 'outlined';
  children: React.ReactNode;
}

const StyledButton = styled(Pressable)<ButtonProps>`
  width: 100%;
  height: 52px;
  border-radius: 8px;
  padding: 16px 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({ variant, disabled }) =>
    disabled ? colors.gray[2] : variant === 'contained' ? colors.primary : 'transparent'};
  border-width: ${({ variant }) => (variant === 'outlined' ? '1px' : 0)};
  border-color: ${({ variant }) => (variant === 'outlined' ? colors.primary : 'transparent')};
`;

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

const Button: React.FC<ButtonProps> = ({ variant, children, ...props }) => {
  return (
    <StyledButton variant={variant} {...props}>
      <Typography
        variant="button"
        style={props.disabled ? styles.disabled : styles[variant]}
        disabled={!!props.disabled}
      >
        {children}
      </Typography>
    </StyledButton>
  );
};

export default Button;
