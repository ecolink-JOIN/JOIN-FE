import AsyncStorage from '@react-native-async-storage/async-storage';

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
