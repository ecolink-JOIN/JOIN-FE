import React from 'react';
import { View } from 'react-native';
import StudyInfoSection from '@/components/molecules/StudyInfoSection';

const StudyRulesSection: React.FC = () => {
  return (
    <View
      style={{
        paddingHorizontal: 28,
        gap: 24,
      }}
    >
      <StudyInfoSection title="활동 내용" content="안녕하세요. 영어 일기쓰기 모임 함께 하실 스터디원 모집해요!" />
      <StudyInfoSection
        title="스터디 규칙"
        tags={['벌금', '강퇴조건']}
        content={`한국어 사용하면 회초리 5대
지각하면 전재산을 스터디장에게 증여`}
      />
    </View>
  );
};

export default StudyRulesSection;
