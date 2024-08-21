import Svg, { Path, SvgProps } from 'react-native-svg';

function ArrowLeftIcon({ stroke, ...rest }: SvgProps) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...rest}>
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8 12.5C8 13.3284 7.32843 14 6.5 14C5.67157 14 5 13.3284 5 12.5C5 11.6716 5.67157 11 6.5 11C7.32843 11 8 11.6716 8 12.5ZM13.5 12.5C13.5 13.3284 12.8284 14 12 14C11.1716 14 10.5 13.3284 10.5 12.5C10.5 11.6716 11.1716 11 12 11C12.8284 11 13.5 11.6716 13.5 12.5ZM17.5 14C18.3284 14 19 13.3284 19 12.5C19 11.6716 18.3284 11 17.5 11C16.6716 11 16 11.6716 16 12.5C16 13.3284 16.6716 14 17.5 14Z"
        fill={stroke ?? 'white'}
      />
    </Svg>
  );
}

export default ArrowLeftIcon;
