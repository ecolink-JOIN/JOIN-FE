import styled from 'styled-components/native';
import { Pressable, PressableProps } from 'react-native';

const sizeStyles = {
  small: {
    height: '40px',
    paddingHorizontal: '27.5px',
  },
  medium: {
    height: '44px',
    paddingHorizontal: '20px',
  },
  large: {
    height: '52px',
    paddingHorizontal: '30px',
  },
};

export interface ButtonProps extends PressableProps {
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const StyledButton = styled(Pressable)<ButtonProps>`
  align-self: ${({ fullWidth }) => (fullWidth ? 'auto' : 'flex-start')};
  height: ${({ size = 'medium' }) => sizeStyles[size].height};
  border-radius: 8px;
  padding: 0 ${({ size = 'medium' }) => sizeStyles[size].paddingHorizontal};
  justify-content: center;
  align-items: center;
`;
