import React from 'react';
import { View } from 'react-native';
import StudyInfoSection from '@/components/molecules/StudyInfoSection';

const StudyRulesSection = ({ props }: { props: StudyResponse.Detail['data'] | null }) => {
  return (
    <View
      style={{
        paddingHorizontal: 28,
        gap: 24,
      }}
    >
      <StudyInfoSection title="활동 내용" content={props?.content ?? ''} />
      <StudyInfoSection title="스터디 규칙" tags={['벌금', '강퇴조건']} content={props?.ruleExp ?? ''} />
    </View>
  );
};

export default StudyRulesSection;
