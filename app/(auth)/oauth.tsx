import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import CookieManager from '@react-native-cookies/cookies';
import Typography from '@/components/atoms/Typography';

const WebViewOauthScreen = () => {
  const { provider } = useLocalSearchParams();
  const router = useRouter();

  // NOTE: https 여야 정상 동작합니다.
  const url = `http://3.38.27.246/api/v1/oauth2/authorization/${provider}`;

  const handleWebViewMessage = async (event: any) => {
    try {
      const data = event.nativeEvent.data;
      console.log('Message from WebView:', data);

      // 데이터가 JSON 형식인지 확인
      let parsedData;
      try {
        parsedData = JSON.parse(data);
        console.log('Data is in JSON format:', parsedData);
      } catch (jsonError) {
        return;
      }

      const sessionId = parsedData.data.session_id;

      if (sessionId) {
        await AsyncStorage.setItem('sessionId', sessionId);
        console.log('Session ID saved:', sessionId);

        router.replace('/(auth)/terms');
      } else {
        console.log('Session ID not found in the message');
      }
    } catch (error) {
      console.error('Failed to handle WebView message', error);
    }
  };

  if (!provider) return <View />;

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: url,
        }}
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        javaScriptEnabled={true}
        onMessage={handleWebViewMessage}
        injectedJavaScript={`
          (function() {
            window.onload = function() {
              const bodyText = document.body.innerText || '';
              window.ReactNativeWebView.postMessage(bodyText);
            };
          })();
          true;
        `}
        startInLoadingState={true}
        renderLoading={() => (
          <View>
            <Typography variant="button">Loading...</Typography>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewOauthScreen;
