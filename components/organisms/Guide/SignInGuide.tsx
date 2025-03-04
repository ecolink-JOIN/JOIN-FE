import Typography from '@/components/atoms/Typography';
import ContentView from '@/components/atoms/View/ContentView';
import { Image } from 'react-native';

function SignInGuide() {
  return (
    <ContentView style={{ gap: 32, flex: 1, justifyContent: 'flex-start', paddingVertical: 100 }}>
      <Image source={require('@/assets/images/logo.png')} style={{ alignSelf: 'center', marginBottom: 16 }} />
      <Typography variant="heading3">JOIN에서 믿을 수 있는{'\n'}스터디 메이트를 찾아볼까요?</Typography>
      <Typography variant="body1">매번 기운빠지게 하는 빌런 스터디원 때문에{'\n'}힘들었다면 JOIN 하세요!</Typography>
    </ContentView>
  );
}

export default SignInGuide;
