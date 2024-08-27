import React from 'react';
import Divider from '@/components/atoms/Divider';
import StudyRulesSection from '@/components/organisms/StudyDetails/StudyRulesSection';
import StudyApplicationSection from '@/components/organisms/StudyDetails/StudyApplicationSection';
import StudyDetailsTemplate from '@/components/templates/StudyDetailsTemplate';
import StudyOverviewSection from '@/components/organisms/StudyDetails/StudyOverviewSection';

const StudyDetailsScreen: React.FC = () => {
  return (
    <StudyDetailsTemplate
      title="직장인 영어 회화 스터디 1기"
      leader="닉네임(모집자)"
      date="2024.07.09"
      deadline="마감 D-3"
    >
      <StudyOverviewSection />
      <Divider style={{ height: 4 }} />
      <StudyRulesSection />
      <Divider style={{ height: 4 }} />
      <StudyApplicationSection />
    </StudyDetailsTemplate>
  );
};

export default StudyDetailsScreen;
