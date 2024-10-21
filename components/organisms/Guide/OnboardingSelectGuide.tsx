import React from 'react';
import ContentView from '@/components/atoms/View/ContentView';
import { colors } from '@/theme';
import { Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import MeetingTypeSelectPane from '@/components/molecules/Onboarding/MeetingTypeSelectPane';
import InterestAreaSelectPane from '@/components/molecules/Onboarding/InterestAreaSelectPane';
import LocationSelectPane from '@/components/molecules/Onboarding/LocationSelectPane';
import DateTimeSelectPane from '@/components/molecules/Onboarding/DateTimeSelectPane';
import WeeklyParticipationCountSelectPane from '@/components/molecules/Onboarding/WeeklyParticipationCountSelectPane';

interface OnboardingSelectGuideProps {
  step: number;
  maxStep: number;
}

const OnboardingSelectGuide: React.FC<OnboardingSelectGuideProps> = ({ step, maxStep }) => {
  const screenWidth = Dimensions.get('window').width;

  let renderPane = null;
  switch (step) {
    default:
    case 0:
      renderPane = <MeetingTypeSelectPane />;
      break;
    case 1:
      renderPane = <LocationSelectPane />;
      break;
    case 2:
      renderPane = <InterestAreaSelectPane />;
      break;
    case 3:
      renderPane = <DateTimeSelectPane />;
      break;
    case 4:
      renderPane = <WeeklyParticipationCountSelectPane />;
      break;
  }

  return (
    <ContentView style={{ gap: 40, alignItems: 'center' }}>
      <Progress.Bar
        progress={(step + 1) / maxStep}
        color={colors.primary}
        unfilledColor={colors.gray[2]}
        borderWidth={0}
        width={screenWidth - 40}
        height={8}
        style={{
          marginTop: 80,
        }}
      />
      {renderPane}
    </ContentView>
  );
};

export default OnboardingSelectGuide;
