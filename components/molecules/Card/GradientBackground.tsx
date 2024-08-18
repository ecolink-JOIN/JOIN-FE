import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import styled from 'styled-components/native';
import Icon from '@/components/atoms/Icon';

interface GradientBackgroundProps {
  liked: boolean;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({ liked }) => {
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

      <LikeIconWrapper>
        <Icon name={liked ? 'like' : 'like-outline'} />
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

const LikeIconWrapper = styled.View`
  position: absolute;
  top: 12px;
  right: 12px;
  height: 74px;
`;
