import StaticView from '@/components/atoms/View/StaticView';
import OnboardingCTA from '@/components/organisms/CTA/OnboardingCTA';
import OnboardingSelectGuide from '@/components/organisms/Guide/OnboardingSelectGuide';
import { useOnboardingContext } from '@/context/OnboardingContext';
import { useRouter } from 'expo-router';

function OnboardingSelectPage() {
  const router = useRouter();
  const context = useOnboardingContext();
  const { studyPreferences, setStudyPreferences } = context;
  const { step } = studyPreferences;
  const maxStep = 5;

  return (
    <StaticView>
      <OnboardingSelectGuide step={step || 0} maxStep={maxStep} />
      <OnboardingCTA
        buttons={[
          {
            content: '다음',
            onPress: () => {
              if (step !== undefined && step < 4) {
                setStudyPreferences({ ...studyPreferences, step: step + 1 });
              } else if (step === 4) {
                console.log(step);
                router.replace('/(onboarding)/select/complete');
              }
            },
            disabled: false,
          },
        ]}
      />
    </StaticView>
  );
}

export default OnboardingSelectPage;
