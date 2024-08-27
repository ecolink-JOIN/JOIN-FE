import { colors } from '@/theme';
import Svg, { Path, SvgProps } from 'react-native-svg';

function ThinCheckIcon({ fill, stroke, ...rest }: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill={fill || 'none'} {...rest}>
      <Path
        d="M20 6L9 17L4 12"
        stroke={stroke || colors.black}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ThinCheckIcon;
