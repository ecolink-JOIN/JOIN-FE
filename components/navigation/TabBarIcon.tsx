import { type ComponentProps } from 'react';
import { colors } from '@/theme';
import HomeIcon from '@/assets/images/HomeIcon';
import AuthIcon from '@/assets/images/auth.svg';
import MyIcon from '@/assets/images/my.svg';
import MyOutlineIcon from '@/assets/images/my-outline.svg';
import AuthOutlineIcon from '@/assets/images/auth-outline.svg';

interface Icons {
  name: 'home' | 'home-outline' | 'auth' | 'auth-outline' | 'mypage' | 'mypage-outline';
}
function TabBarIcon({ name, ...rest }: ComponentProps<typeof HomeIcon> & Icons) {
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
  return null;
}

export default TabBarIcon;
