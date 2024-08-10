import { colors } from '@/theme';
import HomeIcon from '@/assets/images/HomeIcon';
import VerifyIcon from '@/assets/images/verify.svg';
import MyIcon from '@/assets/images/my.svg';
import MyOutlineIcon from '@/assets/images/my-outline.svg';
import VerifyOutlineIcon from '@/assets/images/verify-outline.svg';
import { SvgProps } from 'react-native-svg';
import ChevronDownIcon from '@/assets/images/ChevronDown';
import CloseIcon from '@/assets/images/CloseIcon';

export type IconTypes =
  | 'home'
  | 'home-outline'
  | 'verify'
  | 'verify-outline'
  | 'mypage'
  | 'mypage-outline'
  | 'chevron-down'
  | 'chevron-down-outline'
  | 'close'
  | 'close-outline';
interface IconProps extends SvgProps {
  name?: IconTypes;
}
function Icon({ name, ...rest }: IconProps) {
  switch (name) {
    case 'home':
      return <HomeIcon fill={colors.primary} stroke={colors.primary} {...rest} />;
    case 'home-outline':
      return <HomeIcon fill={colors.white} stroke={colors.gray[7]} {...rest} />;
    case 'verify':
      return <VerifyIcon {...rest} />;
    case 'verify-outline':
      return <VerifyOutlineIcon {...rest} />;
    case 'mypage':
      return <MyIcon {...rest} />;
    case 'mypage-outline':
      return <MyOutlineIcon {...rest} />;
    case 'chevron-down':
      return <ChevronDownIcon stroke={colors.primary} {...rest} />;
    case 'chevron-down-outline':
      return <ChevronDownIcon stroke={colors.gray[9]} {...rest} />;
    case 'close':
      return <CloseIcon stroke={colors.primary} {...rest} />;
    case 'close-outline':
      return <CloseIcon stroke={colors.gray[7]} {...rest} />;
    default:
      return null;
  }
}

export default Icon;
