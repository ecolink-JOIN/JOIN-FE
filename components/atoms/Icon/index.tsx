import { colors } from '@/theme';
import HomeIcon from '@/assets/images/HomeIcon';
import AuthIcon from '@/assets/images/auth.svg';
import MyIcon from '@/assets/images/my.svg';
import MyOutlineIcon from '@/assets/images/my-outline.svg';
import AuthOutlineIcon from '@/assets/images/auth-outline.svg';
import { SvgProps } from 'react-native-svg';

export type IconTypes = 'home' | 'home-outline' | 'auth' | 'auth-outline' | 'mypage' | 'mypage-outline';
interface IconProps extends SvgProps {
  name: IconTypes;
}
function Icon({ name, ...rest }: IconProps) {
  switch (name) {
    case 'home':
      return <HomeIcon fill={colors.primary} stroke={colors.primary} {...rest} />;
    case 'home-outline':
      return <HomeIcon fill={colors.white} stroke={colors.gray[7]} {...rest} />;
    case 'auth':
      return <AuthIcon {...rest} />;
    case 'auth-outline':
      return <AuthOutlineIcon {...rest} />;
    case 'mypage':
      return <MyIcon {...rest} />;
    case 'mypage-outline':
      return <MyOutlineIcon {...rest} />;
  }
}

export default Icon;
