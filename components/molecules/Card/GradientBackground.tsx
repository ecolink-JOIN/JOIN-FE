import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import styled from 'styled-components/native';
import Icon from '@/components/atoms/Icon';
import { useState } from 'react';
import { GestureResponderEvent } from 'react-native';
import { BookmarksService } from '@/apis';

interface GradientBackgroundProps {
  liked: boolean;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ liked }) => {
  const [likedNew, setLikedNew] = useState(liked);

  const handleLike = (e: GestureResponderEvent) => {
    e.stopPropagation();
    // TODO: 좋아요 추가 기능 구현
    // if (likedNew) {
    // BookmarksService().deleteBookmark()
    // setLikedNew(false);
    setLikedNew(!likedNew);
  };

  return (
    <GradientWrapper>
      <Svg style={{ width: '100%', height: '100%' }}>
        <Defs>
          <RadialGradient
            id="radialGradient"
            cx="10%"
            cy="90%"
            r="70%"
            fx="10%"
            fy="90%"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor="#FF7F5F" />
            <Stop offset="30%" stopColor="#FFAA8C" />
            <Stop offset="70%" stopColor="#FFD2B5" />
            <Stop offset="100%" stopColor="#FFD8C8" />
          </RadialGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#radialGradient)" />
      </Svg>

      <LikeIconWrapper onPress={handleLike}>
        <Icon name={likedNew ? 'like' : 'like-outline'} />
      </LikeIconWrapper>
    </GradientWrapper>
  );
};

export default GradientBackground;

const GradientWrapper = styled.View`
  position: absolute;
  width: 100%;
  height: 72px;
`;

const LikeIconWrapper = styled.Pressable`
  position: absolute;
  top: 12px;
  right: 12px;
  height: 74px;
`;
