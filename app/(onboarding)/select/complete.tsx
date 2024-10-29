import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import ContentView from '@/components/atoms/View/ContentView';
import CTAView from '@/components/atoms/View/CTAView';
import StaticView from '@/components/atoms/View/StaticView';
import { Href, useRouter } from 'expo-router';

function OnboardingCompletePage() {
  const router = useRouter();

  return (
    <StaticView>
      <ContentView style={{ gap: 40, justifyContent: 'center' }}>
        <Typography variant="heading3">undefined 님의{'\n'}맞춤 스터디 모임을 찾았어요!</Typography>
        <Typography variant="body1" style={{ marginBottom: 28 }}>
          믿을 수 있는 스터디원과{'\n'}모임을 시작해보세요.
        </Typography>

        <CTAView>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onPress={() => {
              router.replace('(tabs)/' as Href);
            }}
          >
            나의 맞춤 스터디 둘러보기
          </Button>
        </CTAView>
      </ContentView>
    </StaticView>
  );
}

export default OnboardingCompletePage;
