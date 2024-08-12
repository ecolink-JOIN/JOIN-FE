import Typography from '@/components/atoms/Typography';
import ContentView from '@/components/atoms/View/ContentView';

function SignInGuide() {
  return (
    <ContentView>
      <Typography variant="body4">회원 가입하기</Typography>
      <Typography variant="heading3">JOIN에서 믿을 수 있는{'\n'}스터디 메이트를 찾아볼까요?</Typography>
      <Typography variant="body1">JOIN이 맞춤 스터디를 추천하려면{'\n'}회원가입이 필요해요!</Typography>
    </ContentView>
  );
}

export default SignInGuide;
