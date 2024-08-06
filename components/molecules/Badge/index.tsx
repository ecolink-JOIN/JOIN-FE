import { colors } from '@/theme';
import React, { CSSProperties } from 'react';
import { View, Pressable, PressableProps } from 'react-native';
import styled from 'styled-components/native';
import Typography, { TypographyVariant } from '../../atoms/Typography';
import Icon, { IconTypes } from '@/components/atoms/Icon';

interface ChipVariant {
  variant: 'outlined' | 'contained' | 'default' | 'mixed' | 'simple';
  size: 'large' | 'medium' | 'small';
}

interface ChipTextProps {
  color: ChipVariant['variant'];
  size: ChipVariant['size'];
}

interface ChipProps extends Partial<ChipVariant>, PressableProps {
  value: string;
  icon?: IconTypes;
}

interface SizeOptions extends Pick<CSSProperties, 'height' | 'top' | 'padding'> {
  typography: TypographyVariant;
  iconSize: CSSProperties['width'];
}
type SizeMap = Record<ChipVariant['size'], SizeOptions>;
type VariantMap = Record<ChipVariant['variant'], Partial<CSSProperties>>;

const ChipContainer = styled(View)`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const sizeMap: SizeMap = {
  small: {
    padding: '4px 10.5px',
    typography: 'caption3',
    height: '22px',
    iconSize: 10,
  },
  medium: {
    padding: '4px 12px',
    typography: 'body4',
    height: '28px',
    iconSize: 14,
  },
  large: {
    padding: '4px 12px',
    typography: 'body3',
    height: '32px',
    iconSize: 16,
  },
};

const variantMap: VariantMap = {
  contained: {
    background: colors.sub2,
    borderColor: 'transparent',
    color: colors.primary,
  },
  outlined: {
    background: colors.white,
    borderColor: colors.primary,
    color: colors.primary,
  },
  default: {
    background: colors.white,
    borderColor: colors.gray[4],
    color: colors.gray[7],
  },
  mixed: {
    background: colors.white,
    borderColor: colors.sub2,
    color: colors.gray[9],
  },
  simple: {
    background: colors.gray[3],
    borderColor: 'transparent',
    color: colors.gray[9],
  },
};
const ChipPressable = styled(Pressable)<ChipVariant>`
  height: ${({ size }) => sizeMap[size].height};
  padding: ${({ size }) => sizeMap[size].padding};
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 4px;
  background-color: ${({ variant }) => variantMap[variant].background};
  border-width: 1px;
  border-color: ${({ variant }) => variantMap[variant].borderColor};
`;

const ChipText = styled(Typography)<ChipTextProps>`
  color: ${({ color }) => variantMap[color].color};
  top: ${({ size }) => sizeMap[size].top};
`;

function Chip({ value, icon, size = 'medium', variant = 'default', ...rest }: ChipProps) {
  return (
    <ChipContainer>
      <ChipPressable variant={variant} size={size} {...rest}>
        <ChipText variant={sizeMap[size].typography} size={size} color={variant}>
          {value}
        </ChipText>
        <Icon name={icon} width={sizeMap[size].iconSize} height={sizeMap[size].iconSize} />
      </ChipPressable>
    </ChipContainer>
  );
}

export default Chip;
