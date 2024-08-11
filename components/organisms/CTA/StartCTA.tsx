import { useRouter } from 'expo-router';
import Button from '@/components/atoms/Button';
import CTAView from '@/components/atoms/View/CTAView';

function StartCTA() {
  const router = useRouter();

  const handleStartPress = () => {
    router.replace('/(tabs)');
  };

  return (
    <CTAView>
      <Button variant="contained" fullWidth onPress={handleStartPress}>
        시작하기
      </Button>
      <Button variant="contained" disabled fullWidth>
        계정이 이미 있어요
      </Button>
    </CTAView>
  );
}

export default StartCTA;
