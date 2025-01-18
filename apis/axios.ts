import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

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

API.interceptors.request.use(async (config) => {
  await TokenStorage.getToken().then(
    (token) => {
      console.log('Token:', token);
      config.headers['Authorization'] = `${token}`;
    },
    (error) => {
      console.error('Failed to get token:', error);
      return null;
    },
  );
  console.log({ config: config.headers });
  return config;
});

API.interceptors.response.use(
  (response) => {
    console.log({ response });
    return response;
  },
  (error) => {
    console.log({ error: error.response });
    return Promise.reject(error);
  },
);
