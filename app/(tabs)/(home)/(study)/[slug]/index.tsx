import React, { useEffect, useState } from 'react';
import Divider from '@/components/atoms/Divider';
import StudyRulesSection from '@/components/organisms/StudyDetails/StudyRulesSection';
import StudyApplicationSection from '@/components/organisms/StudyDetails/StudyApplicationSection';
import StudyDetailsTemplate from '@/components/templates/StudyDetailsTemplate';
import StudyOverviewSection from '@/components/organisms/StudyDetails/StudyOverviewSection';
import { useLocalSearchParams } from 'expo-router';
import { StudyService } from '@/apis';

const StudyDetailsScreen: React.FC = () => {
  const params = useLocalSearchParams<{ slug: string }>();
  const [study, setStudy] = useState<StudyResponse.Detail['data'] | null>(null);

  useEffect(() => {
    StudyService()
      .detail(params.slug)
      .then((res) => {
        setStudy(res);
      });
  }, [params.slug]);

  return (
    <StudyDetailsTemplate
      title={study?.studyName ?? ''}
      leader={study?.writerNickname ?? '모집자 비공개'}
      date={study?.stDate.toString() ?? ''}
      deadline={
        new Date(study?.recruitEndDate ?? '').getTime() - new Date().getTime() > 0
          ? `마감 D-${Math.ceil((new Date(study?.recruitEndDate ?? '').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}`
          : '마감'
      }
      studyToken={params.slug}
    >
      <StudyOverviewSection props={study} />
      <Divider style={{ height: 4 }} />
      <StudyRulesSection props={study} />
      <Divider style={{ height: 4 }} />
      <StudyApplicationSection props={study} />
    </StudyDetailsTemplate>
  );
};

export default StudyDetailsScreen;
