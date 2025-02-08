export type ColorValue = `#${string}`;
export type ColorSteps = Record<'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11', ColorValue>;

interface ColorStepTypes {
  gray: ColorSteps;
  red: ColorSteps;
  orange: ColorSteps;
  yellow: ColorSteps;
  green: ColorSteps;
  blue: ColorSteps;
  purple: ColorSteps;
  pink: ColorSteps;
}

interface ColorValueTypes {
  primary: ColorValue;
  sub1: ColorValue;
  sub2: ColorValue;
  black: ColorValue;
  white: ColorValue;
}

export type ColorTypes = ColorStepTypes & ColorValueTypes;
