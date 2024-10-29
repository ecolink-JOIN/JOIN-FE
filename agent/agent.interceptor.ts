import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @description AsyncStorage에서 토큰을 가져와 요청 헤더에 토큰 삽입
 * @param {InternalAxiosRequestConfig} request
 * @return {Promise<InternalAxiosRequestConfig>}
 */
export async function insertTokenInRequest(request: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
  const sessionId = await AsyncStorage.getItem('sessionId');
  if (sessionId) {
    request.headers['Authorization'] = `${sessionId}`;
  }
  return request;
}

/**
 * @description 요청 실패 시 에러 처리
 * @param {AxiosError} err
 * @param {Function} logoutCallback - 로그아웃 후 리다이렉트 처리 함수
 * @return {Promise<never>}
 */
export function handleResponseError(err: AxiosError, logoutCallback: () => void): Promise<never> {
  if (err.response?.status === 401) {
    handleLogout().then(() => {
      logoutCallback();
    });
  }
  return Promise.reject(err);
}

/**
 * @description AsyncStorage에서 sessionId 삭제
 * @return {Promise<void>}
 */
async function handleLogout(): Promise<void> {
  await AsyncStorage.removeItem('sessionId');
}

/**
 * @description 요청 실패 시 에러 처리
 * @param {AxiosError} err
 * @return {Promise<never>}
 */
export function handleRequestError(err: AxiosError): Promise<never> {
  // 요청 실패 시의 처리 로직을 여기에 작성
  console.error('Request Error: ', err);
  return Promise.reject(err);
}
