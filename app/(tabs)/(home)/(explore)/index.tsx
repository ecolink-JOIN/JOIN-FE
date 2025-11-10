import { RefreshControl, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import AdsCarousel from '@/components/organisms/AdsCarousel';
import StudySection from '@/components/organisms/StudySection';
import { colors } from '@/theme';
import studySections from '@/constants/StudySections';
import RowView from '@/components/atoms/View/RowView';
import FilterBottomSheet from '@/components/organisms/FilterBottomSheet';
import { useRecommendationContext } from '@/context/Recommendation';
import { useGlobalContext } from '@/context/GlobalContext';
import { useNotificationContext } from '@/context/NotificationContext';
import { useState, useEffect } from 'react';

const Container = styled(RowView)`
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

function HomeScreen() {
  const { searchData, setSearchData } = useRecommendationContext();
  const { userinfo } = useGlobalContext();
  const { refreshUnreadCount } = useNotificationContext();
  const [key, setKey] = useState(new Date().getTime());
  const [refreshing, setRefreshing] = useState(false);

  // 홈 화면 진입 시 알림 개수 조회
  useEffect(() => {
    refreshUnreadCount();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setKey(new Date().getTime());
    // 새로고침 시 알림 개수도 함께 갱신
    refreshUnreadCount();
    setRefreshing(false);
  };

  return (
    <SafeAreaView>
      <ScrollView
        style={{ backgroundColor: colors.white }}
        key={key}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        <AdsCarousel />

        <Container
          style={{
            paddingVertical: 16,
            paddingHorizontal: 20,
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 12,
          }}
        >
          <Typography variant="subtitle1">
            {userinfo.nickname}
            {'님에게\n딱 맞는 스터디를 찾았어요'}
          </Typography>
          <FilterBottomSheet {...{ searchData, setSearchData }} />
        </Container>

        <StudySection section={studySections.custom} searchParam={searchData} />
        <StudySection section={studySections.popular} searchParam={searchData} />
        <StudySection section={studySections.interest} searchParam={searchData} />
        <StudySection section={studySections.recent} searchParam={searchData} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
