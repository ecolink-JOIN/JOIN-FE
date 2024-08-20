import { useRouter } from 'expo-router';
import CTAView from '@/components/atoms/View/CTAView';
import OauthButton from '@/components/atoms/Button/OauthButton';
import { Platform } from 'react-native';

function SignInCTA() {
  const router = useRouter();

  const handleStartPress = () => {
    router.replace('/(auth)/nickname');
  };

  return (
    <CTAView>
      <OauthButton size="small" oauth="naver" fullWidth onPress={handleStartPress}>
        네이버로 로그인
      </OauthButton>
      <OauthButton size="small" oauth="kakao" fullWidth onPress={handleStartPress}>
        카카오톡 계정으로 로그인
      </OauthButton>
      <OauthButton size="small" oauth="google" fullWidth onPress={handleStartPress}>
        Google 계정으로 로그인
      </OauthButton>
      {Platform.select({
        ios: (
          <OauthButton size="small" oauth="apple" fullWidth onPress={handleStartPress}>
            Apple 계정으로 로그인
          </OauthButton>
        ),
      })}
    </CTAView>
  );
}

export default SignInCTA;
