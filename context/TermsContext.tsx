import React, { createContext, useState, ReactNode, FC } from 'react';

export interface Term {
  id: number;
  version: string;
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
  const [terms, setTerms] = useState<Term[]>([]);

  return <TermsContext.Provider value={{ terms, setTerms }}>{children}</TermsContext.Provider>;
};

export { TermsContext, TermsProvider };
