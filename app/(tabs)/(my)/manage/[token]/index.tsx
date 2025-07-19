import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const Index = () => {
  const { token } = useLocalSearchParams();
  console.log('token', token);

  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default Index;
