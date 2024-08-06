import Svg, { Path, SvgProps } from 'react-native-svg';

function CheckIcon({ fill, ...rest }: SvgProps) {
  return (
    <Svg width="11" height="8" viewBox="0 0 11 8" fill="none" {...rest}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2071 0.292893C10.5976 0.683417 10.5976 1.31658 10.2071 1.70711L4.63832 7.27584C3.97456 7.9396 2.87315 7.83661 2.34281 7.06674L0.189325 4.08556C-0.134073 3.63787 -0.0333096 3.01277 0.414387 2.68937C0.862083 2.36598 1.48718 2.46674 1.81058 2.91444L3.63947 5.44627L8.79284 0.292893C9.18337 -0.0976311 9.81653 -0.0976311 10.2071 0.292893Z"
        fill={fill}
      />
    </Svg>
  );
}

export default CheckIcon;
