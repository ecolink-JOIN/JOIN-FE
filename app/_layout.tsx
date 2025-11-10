import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/components/atoms/Toast/CustomToast';
import '../reanimatedConfig';
import { GlobalProvider } from '@/context/GlobalContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { TokenStorage } from '@/apis/axios';
import { UserService } from '@/apis';
import { useUserStore } from '@/store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();
export const unstable_settings = {
  initialRouteName: '(tabs)/',
};
export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  const { setUserInfo, avatarToken } = useUserStore();

  const [loaded] = useFonts({
    'Pretendard-Black': require('@/assets/fonts/Pretendard-Black.ttf'),
    'Pretendard-Bold': require('@/assets/fonts/Pretendard-Bold.ttf'),
    'Pretendard-ExtraBold': require('@/assets/fonts/Pretendard-ExtraBold.ttf'),
    'Pretendard-ExtraLight': require('@/assets/fonts/Pretendard-ExtraLight.ttf'),
    'Pretendard-Light': require('@/assets/fonts/Pretendard-Light.ttf'),
    'Pretendard-Medium': require('@/assets/fonts/Pretendard-Medium.ttf'),
    'Pretendard-Regular': require('@/assets/fonts/Pretendard-Regular.ttf'),
    'Pretendard-SemiBold': require('@/assets/fonts/Pretendard-SemiBold.ttf'),
    'Pretendard-Thin': require('@/assets/fonts/Pretendard-Thin.ttf'),
  });

  // 앱 시작 시 로그인 상태 확인 및 사용자 정보 로드
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const token = await TokenStorage.getToken();
        if (token && !avatarToken) {
          // 토큰은 있지만 avatarToken이 없는 경우 사용자 정보 불러오기
          const userInfo = await UserService().avatars();
          setUserInfo({
            avatarToken: userInfo.avatarToken,
            nickname: userInfo.nickname,
            profileUrl: userInfo.image.url,
          });
          console.log('User info loaded on app start:', userInfo.avatarToken);
        }
      } catch (error) {
        console.error('Failed to initialize user info:', error);
      }
    };

    initializeUser();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    // <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <NotificationProvider>
            <BottomSheetModalProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
                <Stack.Screen name="(form)" options={{ headerShown: false }} />
                <Stack.Screen name="(report)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
              <Toast config={toastConfig} />
            </BottomSheetModalProvider>
          </NotificationProvider>
        </GlobalProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
    // </ThemeProvider>
  );
}
