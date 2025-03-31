import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import Icon from '@/components/atoms/Icon';

function ManageLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: {
          borderTopColor: '#FF000000',
          borderTopWidth: 3,
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
  );
}

export default ManageLayout;
