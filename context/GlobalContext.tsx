import React, { createContext, useState, useContext, ReactNode } from 'react';

type GlobalContextType = {
  userinfo: GlobalVariable.UserInfo;
  setUserinfo: React.Dispatch<React.SetStateAction<GlobalVariable.UserInfo>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [userinfo, setUserinfo] = useState<GlobalVariable.UserInfo>({ nickname: '', profileImage: '' });

  return <GlobalContext.Provider value={{ userinfo, setUserinfo }}>{children}</GlobalContext.Provider>;
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
}
