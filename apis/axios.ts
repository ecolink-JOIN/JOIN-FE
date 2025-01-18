import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const storageAccessKey = 'access_token';

export const storeAccess = async (token: string) => {
  try {
    await AsyncStorage.setItem(storageAccessKey, token);
  } catch (e) {
    console.error(e);
  }
};

export const setAccess = (token: string) => {
  API.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const resetAccess = async () => {
  delete API.defaults.headers['Authorization'];
  await AsyncStorage.removeItem(storageAccessKey);
};

export const getAccess = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(storageAccessKey);
  } catch (e) {
    console.error(e);
    return null;
  }
};

API.interceptors.request.use(async (config) => {
  const token = await getAccess();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use((response) => {
  console.log(response);
  if (response.status === 401) {
    resetAccess();
    router.push('/login');
  }
  return response;
});
