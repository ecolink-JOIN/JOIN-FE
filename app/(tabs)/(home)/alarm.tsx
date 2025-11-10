import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import Typography from '@/components/atoms/Typography';

// TODO: 백엔드 알림 API 구현 대기 중
// GET /notifications - 알림 내역 조회

const Container = styled.View`
  flex: 1;
  background-color: ${colors.gray[1]};
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px;
`;

const NotificationItem = styled.TouchableOpacity`
  background-color: ${colors.white};
  padding: 16px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray[2]};
`;

const NotificationHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const NotificationBadge = styled.View<{ type: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ type }) =>
    type === 'study' ? colors.primary : type === 'system' ? colors.gray[5] : colors.gray[7]};
`;

const AlarmScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // TODO: API 연동
  const fetchNotifications = async () => {
    try {
      // const data = await NotificationService().getNotifications();
      // setNotifications(data);

      // Mock 데이터 (임시)
      setNotifications([]);
    } catch (error) {
      console.error('알림 조회 실패:', error);
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  const handleNotificationPress = (notification: any) => {
    // TODO: 알림 타입별 라우팅 처리
    console.log('알림 클릭:', notification);
  };

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case 'study':
        return '스터디';
      case 'system':
        return '시스템';
      case 'notice':
        return '공지';
      default:
        return '알림';
    }
  };

  const formatTimeAgo = (date: string) => {
    // TODO: 시간 포맷팅 로직
    return '방금 전';
  };

  if (notifications.length === 0) {
    return (
      <Container>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          <EmptyContainer>
            <Typography variant="body1" style={{ color: colors.gray[6], marginBottom: 8 }}>
              알림이 없습니다
            </Typography>
            <Typography variant="body3" style={{ color: colors.gray[5], textAlign: 'center' }}>
              스터디 활동 시작하면{'\n'}알림을 받을 수 있습니다
            </Typography>
          </EmptyContainer>
        </ScrollView>
      </Container>
    );
  }

  return (
    <Container>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {notifications.map((notification, index) => (
          <NotificationItem key={index} onPress={() => handleNotificationPress(notification)}>
            <NotificationHeader>
              <NotificationBadge type={notification.type}>
                <Typography variant="body4" style={{ color: colors.white }}>
                  {getNotificationTypeLabel(notification.type)}
                </Typography>
              </NotificationBadge>
              <Typography variant="body4" style={{ color: colors.gray[6] }}>
                {formatTimeAgo(notification.createdAt)}
              </Typography>
            </NotificationHeader>
            <Typography variant="subtitle2" style={{ marginBottom: 4 }}>
              {notification.title}
            </Typography>
            <Typography variant="body3" style={{ color: colors.gray[7] }}>
              {notification.content}
            </Typography>
          </NotificationItem>
        ))}
      </ScrollView>
    </Container>
  );
};

export default AlarmScreen;
