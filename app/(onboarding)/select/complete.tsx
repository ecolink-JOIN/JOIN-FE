import { useState, useEffect } from 'react';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import ContentView from '@/components/atoms/View/ContentView';
import CTAView from '@/components/atoms/View/CTAView';
import StaticView from '@/components/atoms/View/StaticView';
import { Href, useRouter } from 'expo-router';
import { useOnboardingContext } from '@/context/OnboardingContext';
import { AvatarsService } from '@/apis';
import { Alert } from 'react-native';

function OnboardingCompletePage() {
  const router = useRouter();
  const { studyPreferences } = useOnboardingContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 온보딩 완료 시 자동으로 API 호출
    const submitPreferences = async () => {
      if (isSubmitting) return;

      try {
        setIsSubmitting(true);

        // API 요청 형식에 맞게 변환
        const requestBody: Avatars.PreferenceRequest = {
          category: studyPreferences.interestArea || '기타',
          form: studyPreferences.meetingType || 'ONLINE',
          possibleDays: (studyPreferences.availableDays || []) as SharedStudy.PossibleDays[],
          timeZone: (studyPreferences.availableTime || 'MORNING') as SharedStudy.TimeZone,
          minParticipationCount: studyPreferences.weeklyParticipationCount || 1,
          maxParticipationCount: studyPreferences.weeklyParticipationCount || 1,
          province: studyPreferences.province || '',
          city: studyPreferences.city || '',
        };

        await AvatarsService().updatePreference(requestBody);
      } catch (error) {
        console.error('선호 설정 저장 실패:', error);
        Alert.alert('오류', '선호 설정 저장에 실패했습니다.');
      } finally {
        setIsSubmitting(false);
      }
    };

    submitPreferences();
  }, []);

  return (
    <StaticView>
      <ContentView style={{ gap: 40, justifyContent: 'center' }}>
        <Typography variant="heading3">맞춤 스터디 모임을 찾았어요!</Typography>
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
            disabled={isSubmitting}
          >
            나의 맞춤 스터디 둘러보기
          </Button>
        </CTAView>
      </ContentView>
    </StaticView>
  );
}

export default OnboardingCompletePage;
