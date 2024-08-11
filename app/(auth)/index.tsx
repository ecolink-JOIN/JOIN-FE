import React from 'react';
import { useRouter } from 'expo-router';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import CTAView from '@/components/atoms/View/CTAView';
import StaticView from '@/components/atoms/View/StaticView';
import ContentView from '@/components/atoms/View/ContentView';

function SignIn() {
  const router = useRouter();

  const handleStartPress = () => {
    router.replace('/(tabs)');
  };

  return (
    <StaticView>
      <ContentView>
        <Typography variant="body4">시작하기</Typography>
        <Typography variant="heading3">JOIN에서 믿을 수 있는{'\n'}스터디 메이트를 찾아볼까요?</Typography>
        <Typography variant="body1">매번 기운빠지게 하는 빌런 스터디원 때문에{'\n'}힘들었다면 JOIN 하세요!</Typography>
      </ContentView>

      <CTAView>
        <Button variant="contained" fullWidth onPress={handleStartPress}>
          시작하기
        </Button>
        <Button variant="contained" disabled fullWidth>
          계정이 이미 있어요
        </Button>
      </CTAView>
    </StaticView>
  );
}

export default SignIn;
