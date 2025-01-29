import axios, { AxiosResponse } from 'axios';
import { insertTokenInRequest, handleResponseError, handleRequestError } from './agent.interceptor';
import { HttpRequestConfig } from './agent';

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(insertTokenInRequest, handleRequestError);

export function setupInterceptors(logoutCallback: () => void) {
  API.interceptors.response.use(
    (response) => response,
    (error) => handleResponseError(error, logoutCallback),
  );
}

const requests = {
  get: (url: string, config?: HttpRequestConfig.Get): ReturnAxios<any> => API.get(url, config),
  post: (url: string, body?: any, config?: HttpRequestConfig.Post): ReturnAxios<any> =>
    API.post(url, body, { headers: config?.headers }),
  put: (url: string, body?: any, config?: HttpRequestConfig.Put): ReturnAxios<any> =>
    API.put(url, body, { headers: config?.headers }),
  delete: (url: string, config?: HttpRequestConfig.Delete): ReturnAxios<any> =>
    API.delete(url, { headers: config?.headers }),
  patch: (url: string, body?: any, config?: HttpRequestConfig.Put): ReturnAxios<any> =>
    API.patch(url, body, { headers: config?.headers }),
};

export type ReturnAxios<T> = Promise<AxiosResponse<T>>;
export default requests;
