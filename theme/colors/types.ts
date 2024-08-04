export type ColorHex = `#${string}`;
export type ColorSteps = Record<'1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11', ColorHex>;
export interface ColorTypes {
  [key: string]: ColorHex | ColorSteps;
}
