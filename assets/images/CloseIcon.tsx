import Svg, { Path, SvgProps } from 'react-native-svg';

function CloseIcon({ stroke, ...rest }: SvgProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...rest}>
      <Path d="M12 4L4 12M4 4L12 12" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default CloseIcon;
