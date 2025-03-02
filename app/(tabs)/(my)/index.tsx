import TabScreen from '@/components/molecules/CustomTab/TabScreen';
import { ManageStudy, JoinedStudy, InterestStudy } from '@/components/organisms/MyPage/Main/StudyTabs';
import FormalInfo from '@/components/organisms/MyPage/Main/FormalInfo';
import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

const Screen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [key, setKey] = useState(new Date().getTime());

  const handleRefresh = () => {
    setRefreshing(true);
    setKey(new Date().getTime());
    setRefreshing(false);
  };
  return (
    <ScrollView key={key} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      <FormalInfo />
      <TabScreen
        menus={['운영 스터디', '가입 스터디', '관심 스터디']}
        contents={[<ManageStudy />, <JoinedStudy />, <InterestStudy />]}
      />
    </ScrollView>
  );
};

export default Screen;
