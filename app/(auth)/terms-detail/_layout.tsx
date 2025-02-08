import React from 'react';
import { Stack } from 'expo-router';
import { Pressable } from 'react-native';
import Icon from '@/components/atoms/Icon';

function FormLayout() {
  return (
    <Stack
      initialRouteName="index"
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerShadowVisible: false,
        headerTitleAlign: 'left',
        headerTitle: '서비스 이용 약관',
        headerLeft: () => (
          <Pressable onPress={navigation.goBack}>
            <Icon name="arrow-left" />
          </Pressable>
        ),
      })}
    />
  );
}

export default FormLayout;
