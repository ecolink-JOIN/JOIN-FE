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

  // 각 단계별 완료 여부 확인
  const isStepComplete = () => {
    switch (step) {
      case 0:
        return !!studyPreferences.meetingType;
      case 1:
        return !!studyPreferences.province && !!studyPreferences.city;
      case 2:
        return !!studyPreferences.interestArea;
      case 3:
        return (studyPreferences.availableDays?.length ?? 0) > 0 && !!studyPreferences.availableTime;
      case 4:
        return !!studyPreferences.weeklyParticipationCount;
      default:
        return false;
    }
  };

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
                router.replace('/(onboarding)/select/complete');
              }
            },
            disabled: !isStepComplete(),
          },
        ]}
      />
    </StaticView>
  );
}

export default OnboardingSelectPage;
