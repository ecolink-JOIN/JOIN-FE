import React, { createContext, useState, useContext, ReactNode } from 'react';

type RecommendationContextType = {
  searchData: StudyRequest.Recommendation;
  setSearchData: React.Dispatch<React.SetStateAction<StudyRequest.Recommendation>>;
};

const RecommendationContext = createContext<RecommendationContextType | undefined>(undefined);

export function RecommendationProvider({ children }: { children: ReactNode }) {
  const [searchData, setSearchData] = useState<StudyRequest.Recommendation>({});

  return (
    <RecommendationContext.Provider value={{ searchData, setSearchData }}>{children}</RecommendationContext.Provider>
  );
}

export function useRecommendationContext() {
  const context = useContext(RecommendationContext);
  if (context === undefined) {
    throw new Error('useRecommendationContext must be used within a RecommendationProvider');
  }
  return context;
}
