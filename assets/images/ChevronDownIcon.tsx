import Svg, { Path, SvgProps } from 'react-native-svg';

function ChevronDownIcon({ stroke, ...rest }: SvgProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...rest}>
      <Path d="M4 6L8 10L12 6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default ChevronDownIcon;
