import Svg, { Path, SvgProps } from 'react-native-svg';

function CloseIcon({ stroke, ...rest }: SvgProps) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M12 4L4 12M4 4L12 12"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default CloseIcon;
