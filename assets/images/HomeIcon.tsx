import Svg, { Path, SvgProps } from 'react-native-svg';

function HomeIcon({ fill, stroke, ...rest }: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...rest}>
      <Path
        d="M3.66666 9.7423V20.5C3.66666 20.7761 3.89051 21 4.16666 21H9.55555C9.83169 21 10.0555 20.7761 10.0555 20.5V15.5C10.0555 15.2239 10.2794 15 10.5555 15H14.7778C15.0539 15 15.2778 15.2239 15.2778 15.5V20.5C15.2778 20.7761 15.5016 21 15.7778 21H21.1667C21.4428 21 21.6667 20.7761 21.6667 20.5V9.72563C21.6667 9.58218 21.605 9.44563 21.4975 9.35072L13.4797 2.27618C13.2984 2.11626 13.0287 2.10888 12.839 2.25866L3.85683 9.34986C3.73673 9.44468 3.66666 9.58928 3.66666 9.7423Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HomeIcon;
