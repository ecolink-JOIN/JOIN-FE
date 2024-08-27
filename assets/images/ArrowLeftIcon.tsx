import Svg, { Path, SvgProps } from 'react-native-svg';

function ArrowLeftIcon({ stroke, ...rest }: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...rest}>
      <Path
        d="M15 18L9 12L15 6"
        stroke={stroke || '#222222'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ArrowLeftIcon;
