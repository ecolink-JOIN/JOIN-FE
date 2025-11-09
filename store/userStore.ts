import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserState {
  // 사용자 정보
  avatarToken: string | null;
  nickname: string | null;
  profileUrl: string | null;

  // Actions
  setAvatarToken: (token: string) => void;
  setUserInfo: (info: { avatarToken: string; nickname?: string; profileUrl?: string }) => void;
  clearUser: () => void;

  // Getters
  isAuthenticated: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Initial state
      avatarToken: null,
      nickname: null,
      profileUrl: null,

      // Actions
      setAvatarToken: (token: string) => set({ avatarToken: token }),

      setUserInfo: (info) =>
        set({
          avatarToken: info.avatarToken,
          nickname: info.nickname ?? get().nickname,
          profileUrl: info.profileUrl ?? get().profileUrl,
        }),

      clearUser: () =>
        set({
          avatarToken: null,
          nickname: null,
          profileUrl: null,
        }),

      // Getters
      isAuthenticated: () => {
        const state = get();
        return state.avatarToken !== null && state.avatarToken !== '';
      },
    }),
    {
      name: 'user-storage', // AsyncStorage key
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
