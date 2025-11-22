import React, { createContext, useState, ReactNode, FC, useContext } from 'react';

interface StudyPreferences {
  step: number;
  meetingType?: 'ONLINE' | 'OFFLINE';
  interestArea?: string;
  province?: string;
  city?: string;
  availableDays?: string[];
  availableTime?: string;
  weeklyParticipationCount?: number;
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
    province: undefined,
    city: undefined,
    interestArea: undefined,
    availableDays: [],
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
