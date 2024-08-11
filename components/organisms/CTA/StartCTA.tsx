import { useRouter } from 'expo-router';
import Button from '@/components/atoms/Button';
import CTAView from '@/components/atoms/View/CTAView';

function StartCTA() {
  const router = useRouter();

  const moveToSignIn = () => {
    router.replace('/(auth)/sign-in');
  };

  return (
    <CTAView>
      <Button variant="contained" size="large" fullWidth onPress={moveToSignIn}>
        시작하기
      </Button>
      <Button variant="outlined" size="large" fullWidth onPress={moveToSignIn}>
        계정이 이미 있어요
      </Button>
    </CTAView>
  );
}

export default StartCTA;
