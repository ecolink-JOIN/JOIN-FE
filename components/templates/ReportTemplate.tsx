import React from 'react';
import StaticView from '@/components/atoms/View/StaticView';
import Typography from '@/components/atoms/Typography';
import Divider from '@/components/atoms/Divider';
import { View } from 'react-native';

type ReportTemplateProps = {
  title: string;
  children: React.ReactNode;
};

const ReportTemplate: React.FC<ReportTemplateProps> = ({ title, children }) => {
  return (
    <StaticView>
      <View style={{ marginBottom: 16 }}>
        <Typography variant="subtitle1" style={{ paddingTop: 12, paddingBottom: 8 }}>
          {title}
        </Typography>
      </View>
      <Divider style={{ height: 2 }} />
      {children}
    </StaticView>
  );
};

export default ReportTemplate;
