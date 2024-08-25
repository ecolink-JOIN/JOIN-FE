import { useRouter } from 'expo-router';
import CTAView from '@/components/atoms/View/CTAView';
import { Platform } from 'react-native';
import Button from '@/components/atoms/Button';

function SignInCTA() {
  const router = useRouter();

  const handleStartPress = () => {
    router.replace('/(auth)/nickname');
  };

  return (
    <CTAView>
      <Button size="small" fullWidth onPress={handleStartPress} variant={'contained'}>
        네이버로 로그인
      </Button>
      <Button size="small" fullWidth onPress={handleStartPress} variant={'contained'}>
        카카오톡 계정으로 로그인
      </Button>
      <Button size="small" fullWidth onPress={handleStartPress} variant={'contained'}>
        Google 계정으로 로그인
      </Button>
      {Platform.select({
        ios: (
          <Button size="small" fullWidth onPress={handleStartPress} variant={'contained'}>
            Apple 계정으로 로그인
          </Button>
        ),
      })}
    </CTAView>
  );
}

export default SignInCTA;
