import { useRouter } from 'expo-router';
import Button from '@/components/atoms/Button';
import CTAView from '@/components/atoms/View/CTAView';

function NickNameCTA() {
  const router = useRouter();

  const moveToHome = () => {
    router.replace('/(tabs)');
  };

  return (
    <CTAView>
      <Button variant="contained" size="large" fullWidth onPress={moveToHome}>
        스터디 둘러보기
      </Button>
    </CTAView>
  );
}

export default NickNameCTA;
