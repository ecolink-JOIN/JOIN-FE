import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { useColorScheme } from '@/hooks/useColorScheme';
import { toastConfig } from '@/components/atoms/Toast/CustomToast';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import '../reanimatedConfig';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: '(tabs)/',
};
export default function RootLayout() {
  const colorScheme = useColorScheme();

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
    <RecoilRoot>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack initialRouteName="(tabs)">
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
            <Stack.Screen name="(form)" options={{ headerShown: false }} />
            <Stack.Screen name="(report)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </RecoilRoot>
    // </ThemeProvider>
  );
}
