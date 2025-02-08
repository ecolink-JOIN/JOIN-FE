import React, { createContext, useState, useContext, ReactNode } from 'react';

type NickNameContextType = {
  profileImage: File | null;
  setProfileImage: React.Dispatch<React.SetStateAction<File | null>>;
  isNickNameValid: boolean | null;
  setIsNickNameValid: React.Dispatch<React.SetStateAction<boolean | null>>;
  nickname: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
};

const NickNameContext = createContext<NickNameContextType | undefined>(undefined);

export function NickNameProvider({ children }: { children: ReactNode }) {
  const [isNickNameValid, setIsNickNameValid] = useState<boolean | null>(null);
  const [nickname, setNickname] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);

  return (
    <NickNameContext.Provider
      value={{ profileImage, setProfileImage, isNickNameValid, setIsNickNameValid, nickname, setNickname }}
    >
      {children}
    </NickNameContext.Provider>
  );
}

export function useNickNameContext() {
  const context = useContext(NickNameContext);
  if (context === undefined) {
    throw new Error('useNickNameContext must be used within a NickNameProvider');
  }
  return context;
}
