import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { logger, consoleTransport } from 'react-native-logs';

var log = logger.createLogger({
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: 'debug',
  transport: consoleTransport,
  transportOptions: {
    colors: {
      devNotice: 'blue',
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
      debug: 'white',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  fixedExtLvlLength: false,
  enabled: true,
});
export const AuthStorage = {
  async setToken(token: string) {
    await AsyncStorage.setItem('sessionId', token);
  },
  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem('sessionId');
  },
  async clear() {
    await AsyncStorage.removeItem('sessionId');
  },
};

export const TokenStorage = {
  async setToken(token: string) {
    await AsyncStorage.setItem('accessToken', token);
  },
  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem('accessToken');
  },
  async clear() {
    await AsyncStorage.removeItem('accessToken');
  },
};

export const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const OauthAPI = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await TokenStorage.getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    log.debug({
      headers: config.headers,
      method: config.method,
      url: config.url,
      baseUrl: config.baseURL,
      data: config.data,
      params: config.params,
    });
    return config;
  },
  (error: AxiosError) => {
    log.error('API request error', error.config);
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response: AxiosResponse) => {
    log.info({
      status: response.status,
      statusText: response.statusText,
      // headers: response.headers,
      data: response.data,
    });
    return response.data;
  },
  (error: AxiosError) => {
    log.error({
      response_data: error.response?.data,
      status: error.response?.status,
      request_info: {
        method: error.config?.method,
        url: error.config?.url,
        baseUrl: error.config?.baseURL,
        headers: error.config?.headers,
        data: error.config?.data,
        params: error.config?.params,
      },
    });
    return Promise.reject(error);
  },
);
