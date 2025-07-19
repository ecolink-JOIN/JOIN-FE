import { Href, useRouter } from 'expo-router';
import CTAView from '@/components/atoms/View/CTAView';
import OauthButton from '@/components/molecules/OauthButton';
import { Platform } from 'react-native';
import RowView from '@/components/atoms/View/RowView';
import { IconTypes } from '@/components/atoms/Icon';
function SignInCTA() {
  const router = useRouter();

  const providers: IconTypes[] = ['naver', 'kakao', 'google', 'apple'];
  const signIn = async (provider: (typeof providers)[number]) => {
    // TODO: 안드로이드 로그인 처리
    router.replace('/(tabs)');
    // const path: Href = `/(auth)/oauth?provider=${provider}`;
    // router.push(path);
  };

  return (
    <CTAView>
      <RowView style={{ gap: 24, alignSelf: 'center' }}>
        {providers.map((provider) => {
          if (provider === 'apple') {
            return Platform.select({
              ios: <OauthButton key={provider} provider={provider} onPress={() => signIn(provider)} />,
            });
          }
          return <OauthButton key={provider} provider={provider} onPress={() => signIn(provider)} />;
        })}
      </RowView>
    </CTAView>
  );
}

export default SignInCTA;
