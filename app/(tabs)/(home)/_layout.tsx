import React from 'react';
import { Stack } from 'expo-router';
import HomeHeader from '@/components/organisms/Headers/HomeHeader';
import { View } from 'react-native';
import MoreStudiesHeader from '@/components/organisms/Headers/MoreStudiesHeader';
import studySections from '@/constants/StudySections';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

function MoreStudiesLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={{ flex: 1 }}>
          <HomeHeader />
          <Stack
            screenOptions={({ route }) => {
              const routeName = route.name as keyof typeof studySections;
              const title = studySections[routeName]?.title || 'Default Title';

              return {
                header: () => <MoreStudiesHeader title={title} />,
                headerShown: true,
              };
            }}
          >
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default MoreStudiesLayout;
