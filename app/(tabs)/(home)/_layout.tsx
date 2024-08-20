import React from 'react';
import { Stack } from 'expo-router';

function MoreStudiesLayout() {
  return <Stack screenOptions={{ headerShown: false }} initialRouteName="(explore)" />;
}

export default MoreStudiesLayout;
