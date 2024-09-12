import React from 'react';
import { Stack } from 'expo-router';

function ManageLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default ManageLayout;
