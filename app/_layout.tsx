import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    black: require('@/assets/fonts/Pretendard-Black.ttf'),
    bold: require('@/assets/fonts/Pretendard-Bold.ttf'),
    extraBold: require('@/assets/fonts/Pretendard-ExtraBold.ttf'),
    extraLight: require('@/assets/fonts/Pretendard-ExtraLight.ttf'),
    light: require('@/assets/fonts/Pretendard-Light.ttf'),
    medium: require('@/assets/fonts/Pretendard-Medium.ttf'),
    regular: require('@/assets/fonts/Pretendard-Regular.ttf'),
    semiBold: require('@/assets/fonts/Pretendard-SemiBold.ttf'),
    thin: require('@/assets/fonts/Pretendard-Thin.ttf'),
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RecoilRoot>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </RecoilRoot>
    </ThemeProvider>
  );
}
