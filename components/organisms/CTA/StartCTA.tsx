import { useRouter } from 'expo-router';
import CTAView from '@/components/atoms/View/CTAView';
import IconButton from '@/components/molecules/IconButton';

function StartCTA() {
  const router = useRouter();

  const moveToSignIn = () => {
    router.replace('/(auth)/sign-in');
  };

  return (
    <CTAView>
      <IconButton name="naver" onPress={moveToSignIn} />
      <IconButton name="kakao" onPress={moveToSignIn} />
      <IconButton name="google" onPress={moveToSignIn} />
    </CTAView>
  );
}

export default StartCTA;
