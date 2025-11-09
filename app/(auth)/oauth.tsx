import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import WebView from 'react-native-webview';
import { useLocalSearchParams, useRouter } from 'expo-router';
// import CookieManager from '@react-native-cookies/cookies';
import Typography from '@/components/atoms/Typography';
import { TokenStorage } from '@/apis/axios';
import { UserService } from '@/apis';
import { useUserStore } from '@/store';

const WebViewOauthScreen = () => {
  const { provider } = useLocalSearchParams();
  const router = useRouter();
  const { setUserInfo } = useUserStore();

  // NOTE: https 여야 정상 동작합니다.

  const url = `http://43.200.168.20/api/v1/oauth2/authorization/${provider}`;

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
        // console.log('Data is in JSON format:', parsedData);
      } catch {
        // console.log('Data is not in JSON format:', jsonError);
        return;
      }

      const sessionId = parsedData.data.session_id;

      if (sessionId) {
        await TokenStorage.setToken(sessionId);
        // console.log('Session ID saved:', sessionId);

        // 사용자 정보 가져오기
        try {
          const userInfo = await UserService().avatars();
          setUserInfo({
            avatarToken: userInfo.avatarToken,
            nickname: userInfo.nickname,
            profileUrl: userInfo.image.url,
          });
          console.log('User info saved to store:', userInfo.avatarToken);
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }

        // TODO: 로그인 성공 시 처리
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
