import React, { createContext, useState, useContext, ReactNode } from 'react';

type NickNameContextType = {
  isNickNameValid: boolean | null;
  setIsNickNameValid: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const NickNameContext = createContext<NickNameContextType | undefined>(undefined);

export function NickNameProvider({ children }: { children: ReactNode }) {
  const [isNickNameValid, setIsNickNameValid] = useState<boolean | null>(null);

  return (
    <NickNameContext.Provider value={{ isNickNameValid, setIsNickNameValid }}>{children}</NickNameContext.Provider>
  );
}

export function useNickNameContext() {
  const context = useContext(NickNameContext);
  if (context === undefined) {
    throw new Error('useNickNameContext must be used within a NickNameProvider');
  }
  return context;
}
