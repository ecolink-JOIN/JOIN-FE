import React, { createContext, useState, ReactNode, FC, useContext } from 'react';

/**
 * TODO: 임시 컨텍스트. 선택 항목이 id로 변경된다면, 수정 필요할듯.
 */
export interface StudyPreferences {
  step: number;
  meetingType: 'online' | 'offline';
  interestArea: '입시' | '고시' | '취업' | '자격증' | '사이드프로젝트' | '기타';
  location?: string;
  availableDays: string[];
  availableTime: string;
  weeklyParticipationCount: number;
}

interface OnboardingContextType {
  studyPreferences: Partial<StudyPreferences>;
  setStudyPreferences: React.Dispatch<React.SetStateAction<Partial<StudyPreferences>>>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const OnboardingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [studyPreferences, setStudyPreferences] = useState<Partial<StudyPreferences>>({
    step: 0,
    meetingType: undefined,
    location: undefined,
    interestArea: undefined,
    availableDays: undefined,
    availableTime: undefined,
    weeklyParticipationCount: undefined,
  });

  return (
    <OnboardingContext.Provider value={{ studyPreferences, setStudyPreferences }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export { OnboardingContext, OnboardingProvider };

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('OnboardingContext must be used within a OnboardingProvider');
  }

  return context;
}
