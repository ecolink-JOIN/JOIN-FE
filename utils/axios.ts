import axios from 'axios';

export const API = axios.create({
  baseURL: process.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const storageAccessKey = 'JWT_ACCESS_TOKEN';

//Auth
export const storeAccess = (token: string) => {
  localStorage.setItem(storageAccessKey, token);
};

export const setAccess = (token: string) => {
  API.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const resetAccess = () => {
  delete API.defaults.headers['Authorization'];
  localStorage.removeItem(storageAccessKey);
};

export const getAccess = (): string | null => {
  return localStorage.getItem(storageAccessKey);
};

API.interceptors.response.use((response) => {
  console.log(response);
  if (response.status === 401) {
    resetAccess();
  }
  return response;
});
