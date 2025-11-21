import TabScreen from '@/components/molecules/CustomTab/TabScreen';
import { ManageStudy, JoinedStudy, InterestStudy } from '@/components/organisms/MyPage/Main/StudyTabs';
import FormalInfo from '@/components/organisms/MyPage/Main/FormalInfo';
import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { useNotificationContext } from '@/context/NotificationContext';

const Screen = () => {
  const { refreshUnreadCount } = useNotificationContext();
  const [refreshing, setRefreshing] = useState(false);
  const [infoKey, setInfoKey] = useState(new Date().getTime());

  // 마이 페이지 진입 시 알림 개수 갱신
  useEffect(() => {
    refreshUnreadCount();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setInfoKey(new Date().getTime());
    // 새로고침 시 알림 개수도 갱신
    refreshUnreadCount();
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
