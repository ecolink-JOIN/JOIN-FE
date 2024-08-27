import React, { createContext, useState, ReactNode, FC } from 'react';

interface Term {
  text: string;
  checked: boolean;
  required: boolean;
}

interface TermsContextType {
  terms: Term[];
  setTerms: React.Dispatch<React.SetStateAction<Term[]>>;
}

const TermsContext = createContext<TermsContextType | undefined>(undefined);

const TermsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [terms, setTerms] = useState<Term[]>([
    { text: '서비스 이용약관에 동의 (필수)', checked: false, required: true },
    { text: '개인정보 수집 및 이용에 동의 (필수)', checked: false, required: true },
    { text: '광고 및 마케팅 수신에 동의 (선택)', checked: false, required: false },
  ]);

  return <TermsContext.Provider value={{ terms, setTerms }}>{children}</TermsContext.Provider>;
};

export { TermsContext, TermsProvider };
