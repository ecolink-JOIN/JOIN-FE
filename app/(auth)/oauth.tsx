import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import WebView from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
// import CookieManager from '@react-native-cookies/cookies';
import Typography from '@/components/atoms/Typography';
import { TokenStorage } from '@/apis/axios';

const WebViewOauthScreen = () => {
  const { provider } = useLocalSearchParams();
  const router = useRouter();

  // NOTE: https 여야 정상 동작합니다.
  const url = `http://3.38.27.246/api/v1/oauth2/authorization/${provider}`;

  const handleWebViewMessage = async (event: any) => {
    try {
      const data = event.nativeEvent.data;
      if (!data.toString().includes('session_id')) {
        return;
      }
      // 데이터가 JSON 형식인지 확인
      let parsedData;
      try {
        parsedData = JSON.parse(data);
        console.log('Data is in JSON format:', parsedData);
      } catch (jsonError) {
        console.log('Data is not in JSON format:', jsonError);
        return;
      }

      const sessionId = parsedData.data.session_id;

      if (sessionId) {
        await TokenStorage.setToken(sessionId);
        console.log('Session ID saved:', sessionId);
        if (parsedData.data.new_user) {
          router.replace('/(auth)/terms');
        } else {
          router.replace('/(tabs)');
        }
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
      {Platform.select({
        ios: (
          <WebView
            source={{
              uri: url,
            }}
            javaScriptEnabled={true}
            onMessage={handleWebViewMessage}
            // mixedContentMode="compatibility"
            injectedJavaScript={`
          console.log('WebView loaded');  
          const bodyText = document.body.innerText || '';
          window.ReactNativeWebView.postMessage(bodyText);
          true;
        `}
            // startInLoadingState={true}
            renderLoading={() => (
              <View>
                <Typography variant="button">Loading...</Typography>
              </View>
            )}
          />
        ),
        android: (
          <WebView
            source={{
              uri: url,
            }}
            javaScriptEnabled={true}
            onMessage={handleWebViewMessage}
            mixedContentMode="compatibility"
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
        ),
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewOauthScreen;
