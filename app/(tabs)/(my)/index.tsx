import TabScreen from '@/components/molecules/CustomTab/TabScreen';
import { ManageStudy, JoinedStudy, InterestStudy } from '@/components/organisms/MyPage/Main/StudyTabs';
import FormalInfo from '@/components/organisms/MyPage/Main/FormalInfo';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

const Screen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [infoKey, setInfoKey] = useState(new Date().getTime());

  const handleRefresh = () => {
    setRefreshing(true);
    setInfoKey(new Date().getTime());
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      <FormalInfo key={infoKey + 'formal'} />
      <TabScreen
        menus={['운영 스터디', '가입 스터디', '관심 스터디']}
        contents={[
          <ManageStudy key={infoKey} />,
          <JoinedStudy key={infoKey + 1} />,
          <InterestStudy key={infoKey + 2} />,
        ]}
      />
    </ScrollView>
  );
};

export default Screen;
