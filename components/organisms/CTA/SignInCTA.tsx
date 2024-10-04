import { useRouter } from 'expo-router';
import CTAView from '@/components/atoms/View/CTAView';
import OauthButton from '@/components/molecules/OauthButton';
import { Platform } from 'react-native';
import RowView from '@/components/atoms/View/RowView';
import { IconTypes } from '@/components/atoms/Icon';

function SignInCTA() {
  const router = useRouter();

  const providers: IconTypes[] = ['naver', 'kakao', 'google', 'apple'];
  const signIn = (provider: (typeof providers)[number]) => {
    // router.push(`(auth)/kakao-webview?provider=${provider}`);
    router.push(`(tabs)/(my)`);
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
