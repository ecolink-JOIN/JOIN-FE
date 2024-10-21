import Typography from '@/components/atoms/Typography';
import ContentView from '@/components/atoms/View/ContentView';

function OnboardingStartGuide() {
  return (
    <ContentView style={{ gap: 40 }}>
      <Typography variant="body3" style={{ marginTop: 80, paddingVertical: 12 }}>
        맞춤 스터디 설정
      </Typography>
      <Typography variant="heading3">단 1분 만에 undefined님께{'\n'}필요한 스터디를 찾아드릴게요!</Typography>
      <Typography variant="body1">undefined 님에게 필요한 조건을 갖춘{'\n'}믿을 만한 스터디를 추천해드려요.</Typography>
    </ContentView>
  );
}

export default OnboardingStartGuide;
