import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';

const RecruitingMemb = () => {
  const { member } = useLocalSearchParams();
  const getmember = JSON.parse(member as string) as ApplicationsResponse.GetApplicationsResult;
  return (
    <View>
      <Text>{getmember.nickname}</Text>
      <Text>{getmember.applicationStatus}</Text>
      <Text>{getmember.introduction}</Text>
      <Text>{getmember.activeStudyStats.attendanceRate}</Text>
      <Text>{getmember.activeStudyStats.proofRate}</Text>
      <Text>{getmember.activeStudyStats.rating}</Text>
      <Text>{getmember.completedStudyStats.attendanceRate}</Text>
      <Text>{getmember.completedStudyStats.proofRate}</Text>
      <Text>{getmember.completedStudyStats.rating}</Text>
      <Text>{getmember.applicationId}</Text>
    </View>
  );
};

export default RecruitingMemb;
