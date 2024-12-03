import { colors } from '@/theme';
import HomeIcon from '@/assets/images/HomeIcon';
import VerifyIcon from '@/assets/images/verify.svg';
import MyIcon from '@/assets/images/my.svg';
import MyOutlineIcon from '@/assets/images/my-outline.svg';
import VerifyOutlineIcon from '@/assets/images/verify-outline.svg';
import { SvgProps } from 'react-native-svg';
import ChevronDownIcon from '@/assets/images/ChevronDownIcon';
import CloseIcon from '@/assets/images/CloseIcon';
import CheckIcon from '@/assets/images/CheckIcon';
import NaverIcon from '@/assets/images/naver.svg';
import KakaoIcon from '@/assets/images/kakao.svg';
import GoogleIcon from '@/assets/images/google.svg';
import AppleIcon from '@/assets/images/apple-white.svg';
import WriteIcon from '@/assets/images/write.svg';
import AlarmIcon from '@/assets/images/alarm.svg';
import AlarmUnreadIcon from '@/assets/images/alarm_unread.svg';
import SearchIcon from '@/assets/images/SearchIcon';
import ControllerIcon from '@/assets/images/controller.svg';
import LikeIcon from '@/assets/images/like.svg';
import LikeOutlineIcon from '@/assets/images/like-outline.svg';
import StarIcon from '@/assets/images/star.svg';
import ArrowLeftIcon from '@/assets/images/ArrowLeftIcon';
import EllipsisIcon from '@/assets/images/EllipsisIcon';
import ThinCheckIcon from '@/assets/images/ThinCheckIcon';
import Pencil from '@/assets/images/pencil.svg';
import ClockIcon from '@/assets/images/clock.svg';
import DoubleDownIcon from '@/assets/images/double-down.svg';
import ResetOutlineIcon from '@/assets/images/reset-outline.svg';
import PlusCircleOutlined from '@/assets/images/plus-circle-style-outline.svg';
import LibraryOutlined from '@/assets/images/picture/library.svg';
import CameraOutlined from '@/assets/images/picture/camera.svg';
import DeleteOutlined from '@/assets/images/picture/delete.svg';
import SwapOutlined from '@/assets/images/picture/swap.svg';
import FlashOutlined from '@/assets/images/picture/flash.svg';

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
  | 'close-outline'
  | 'check'
  | 'check-outline'
  | 'thin-check'
  | 'kakao'
  | 'google'
  | 'apple'
  | 'naver'
  | 'apple'
  | 'alarm'
  | 'alarm-unread'
  | 'write'
  | 'search'
  | 'controller'
  | 'like'
  | 'like-outline'
  | 'star'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-right-outline'
  | 'ellipsis'
  | 'pencil'
  | 'clock'
  | 'double-down'
  | 'reset-outline'
  | 'plus-circle-outline'
  | 'library-outline'
  | 'camera-outline'
  | 'delete-outline'
  | 'swap-outline'
  | 'flash-outline';
interface IconProps extends SvgProps {
  name?: IconTypes;
  unread?: boolean;
}
function Icon({ name, unread, ...rest }: IconProps) {
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
    case 'check':
      return <CheckIcon fill={colors.primary} {...rest} />;
    case 'check-outline':
      return <CheckIcon fill={colors.white} {...rest} />;
    case 'thin-check':
      return <ThinCheckIcon {...rest} />;
    case 'naver':
      return <NaverIcon {...rest} />;
    case 'kakao':
      return <KakaoIcon {...rest} />;
    case 'google':
      return <GoogleIcon {...rest} />;
    case 'apple':
      return <AppleIcon {...rest} />;
    case 'alarm':
      return <AlarmIcon {...rest} />;
    case 'alarm-unread':
      return <AlarmUnreadIcon {...rest} />;
    case 'write':
      return <WriteIcon {...rest} />;
    case 'search':
      return <SearchIcon {...rest} />;
    case 'controller':
      return <ControllerIcon {...rest} />;
    case 'like':
      return <LikeIcon {...rest} />;
    case 'like-outline':
      return <LikeOutlineIcon {...rest} />;
    case 'star':
      return <StarIcon {...rest} />;
    case 'arrow-left':
      return <ArrowLeftIcon {...rest} />;
    case 'arrow-right':
      return <ArrowLeftIcon {...rest} stroke={colors.primary} style={{ transform: [{ rotateY: '180deg' }] }} />;
    case 'arrow-right-outline':
      return <ArrowLeftIcon {...rest} style={[rest.style, { transform: [{ rotateY: '180deg' }] }]} />;
    case 'ellipsis':
      return <EllipsisIcon {...rest} />;
    case 'pencil':
      return <Pencil {...rest} />;
    case 'clock':
      return <ClockIcon {...rest} />;
    case 'double-down':
      return <DoubleDownIcon {...rest} />;
    case 'reset-outline':
      return <ResetOutlineIcon {...rest} />;
    case 'plus-circle-outline':
      return <PlusCircleOutlined {...rest} />;
    case 'library-outline':
      return <LibraryOutlined {...rest} />;
    case 'camera-outline':
      return <CameraOutlined {...rest} />;
    case 'delete-outline':
      return <DeleteOutlined {...rest} />;
    case 'swap-outline':
      return <SwapOutlined {...rest} />;
    case 'flash-outline':
      return <FlashOutlined {...rest} />;
    default:
      return null;
  }
}

export default Icon;
