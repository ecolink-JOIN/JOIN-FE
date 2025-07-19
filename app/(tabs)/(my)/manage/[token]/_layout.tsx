import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import Icon from '@/components/atoms/Icon';
import { colors } from '@/theme';

function ManageLayout() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          contentStyle: {
            borderTopColor: '#FF000000',
            borderTopWidth: 3,
            backgroundColor: colors.gray[2],
          },
          headerTitle: '',
          header: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 16,
                backgroundColor: '#fff',
              }}
            >
              <Icon name="arrow-left" onPress={() => router.back()} />
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity onPress={() => router.push('/alarm')}>
                  <Icon name="alarm-unread" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/study/search')}>
                  <Icon name="search" />
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />
    </SafeAreaView>
  );
}

export default ManageLayout;
