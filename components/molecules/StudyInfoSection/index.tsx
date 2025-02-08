import React from 'react';
import { View, ViewStyle } from 'react-native';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import Badge from '@/components/atoms/Badge';
import RowView from '@/components/atoms/View/RowView';

interface StudyInfoSectionProps {
  title: string;
  content: string;
  tags?: string[];
  row?: boolean;
}

const StudyInfoSection: React.FC<StudyInfoSectionProps> = ({ title, content, tags, row }) => {
  const containerStyle: ViewStyle = {
    gap: 10,
    flexDirection: row ? 'row' : 'column',
    flexWrap: row ? 'wrap' : 'nowrap',
  };

  return (
    <View style={containerStyle}>
      <Typography variant="button" style={{ color: colors.primary, minWidth: 100 }}>
        {title}
      </Typography>
      {tags && (
        <RowView style={{ gap: 10 }}>
          {tags.map((tag) => (
            <Badge key={tag} variant="simple" value={tag} size="small" />
          ))}
        </RowView>
      )}
      <Typography variant="body2" style={{ color: colors.gray[11] }}>
        {content}
      </Typography>
    </View>
  );
};

export default StudyInfoSection;
