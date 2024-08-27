import React from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';

const KakaoWebViewScreen = () => {
  const { provider } = useLocalSearchParams();
  const router = useRouter();

  if (!provider) return <View />;

  const url = `http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/api/v1/oauth2/state/${provider}`;

  return (
    <View style={styles.container}>
      <Typography variant="heading1">Swagger에 이후 API가 나오면 작업</Typography>
      <Button
        variant="contained"
        onPress={() => {
          router.replace('(auth)/terms');
        }}
      >
        로그인 했다고 가정하고 넘어가기
      </Button>
      <WebView source={{ uri: url }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KakaoWebViewScreen;
