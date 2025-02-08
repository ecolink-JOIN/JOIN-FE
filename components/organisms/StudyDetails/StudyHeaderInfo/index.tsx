import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@/theme';
import Typography from '@/components/atoms/Typography';
import Bar from '@/components/atoms/Bar';
import SafeAreaView from '@/components/atoms/View/SafeAreaView';

type StudyHeaderInfoProps = {
  title: string;
  leader: string;
  date: string;
  deadline: string;
};

const StudyHeaderInfo: React.FC<StudyHeaderInfoProps> = ({ title, leader, date, deadline }) => (
  <SafeAreaView>
    <View style={styles.headerContent}>
      <Typography variant="heading4" style={styles.headerTitle}>
        {title}
      </Typography>
      <View style={styles.infoContainer}>
        <Typography variant="body3" style={styles.leader}>
          {leader}
        </Typography>
        <Bar />
        <Typography variant="body3" style={styles.date}>
          {date}
        </Typography>
        <Bar />
        <Typography variant="body3" style={styles.deadline}>
          {deadline}
        </Typography>
      </View>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  headerContent: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: colors.white,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 8,
    paddingBottom: 24,
  },
  leader: {
    color: colors.gray[11],
  },
  date: {
    color: colors.gray[11],
  },
  deadline: {
    color: colors.white,
  },
});

export default StudyHeaderInfo;
