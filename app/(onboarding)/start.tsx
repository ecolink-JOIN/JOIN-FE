import StaticView from '@/components/atoms/View/StaticView';
import OnboardingCTA from '@/components/organisms/CTA/OnboardingCTA';
import OnboardingStartGuide from '@/components/organisms/Guide/OnboardingStartGuide';
import { useRouter } from 'expo-router';

function StartGuidePage() {
  const router = useRouter();

  return (
    <StaticView>
      <OnboardingStartGuide />
      <OnboardingCTA
        buttons={[
          {
            content: '맞춤 스터디 설정하기',
            onPress: () => {
              router.push('/select');
            },
            disabled: false,
          },
          {
            content: '나중에 할래요',
            variant: 'default',
            onPress: () => {
              router.back();
            },
            disabled: false,
          },
        ]}
      />
    </StaticView>
  );
}

export default StartGuidePage;
