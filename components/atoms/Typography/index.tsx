// Typography.tsx
import React from 'react';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Subtitle1,
  Subtitle2,
  Button1,
  Body1,
  Body2,
  Body3,
  Body4,
  Caption1,
  Caption2,
  Caption3,
} from './TypographyStyles';
import { TextProps } from 'react-native';

type TypographyVariant =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'subtitle1'
  | 'subtitle2'
  | 'button'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'caption1'
  | 'caption2'
  | 'caption3';

interface TypographyTextProps extends TextProps {
  variant: TypographyVariant;
}

type TypographyProps = TypographyTextProps;

const variantMap: Record<TypographyVariant, React.ElementType> = {
  heading1: Heading1,
  heading2: Heading2,
  heading3: Heading3,
  heading4: Heading4,
  subtitle1: Subtitle1,
  subtitle2: Subtitle2,
  button: Button1,
  body1: Body1,
  body2: Body2,
  body3: Body3,
  body4: Body4,
  caption1: Caption1,
  caption2: Caption2,
  caption3: Caption3,
};

function Typography({ variant, children, ...props }: TypographyProps) {
  const TextComponent = variantMap[variant];
  return <TextComponent {...props}>{children}</TextComponent>;
}

export default Typography;
