import React from 'react';
import Typography from '@/components/atoms/Typography';
import ContentView from '@/components/atoms/View/ContentView';
import TermsOptionGroup from '@/components/molecules/TermsOptionGroup';

const TermsGuide: React.FC = () => {
  return (
    <ContentView style={{ gap: 8 }}>
      <Typography variant="body3" style={{ marginTop: 40, paddingVertical: 12 }}>
        조인 서비스 이용약관
      </Typography>

      <TermsOptionGroup />
    </ContentView>
  );
};

export default TermsGuide;
