import React, { useEffect, useState } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import Typography from '@/components/atoms/Typography';
import { NotificationService } from '@/apis';
import { useNotificationContext } from '@/context/NotificationContext';

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

const NotificationBadge = styled.View<{ type: NotificationResponse.Notification['type'] }>`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: ${({ type }) => {
    switch (type) {
      case 'STUDY_ANNOUNCEMENT':
        return colors.primary;
      case 'ATTENDANCE_CHECK':
        return colors.gray[5];
      case 'PROOF':
        return colors.gray[6];
      case 'OTHER':
      default:
        return colors.gray[7];
    }
  }};
`;

const AlarmScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<NotificationResponse.Notification[]>([]);
  const { refreshUnreadCount } = useNotificationContext();

  const fetchNotifications = async () => {
    try {
      const data = await NotificationService().getNotifications();
      setNotifications(data);
      // 알림 목록을 가져온 후 배지 개수 갱신
      refreshUnreadCount();
    } catch (error: any) {
      // 알림이 없거나 에러 발생 시 빈 배열로 설정
      console.log('알림 조회 실패 또는 알림 없음:', error?.response?.status);
      setNotifications([]);
      // 에러 발생 시에도 배지 개수는 0으로 갱신
      refreshUnreadCount();
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

  const handleNotificationPress = (notification: NotificationResponse.Notification) => {
    // TODO: 알림 타입별 라우팅 처리
    console.log('알림 클릭:', notification);
  };

  const getNotificationTypeLabel = (type: NotificationResponse.Notification['type']) => {
    switch (type) {
      case 'STUDY_ANNOUNCEMENT':
        return '스터디 공지';
      case 'ATTENDANCE_CHECK':
        return '출석 체크';
      case 'PROOF':
        return '인증';
      case 'OTHER':
        return '알림';
      default:
        return '알림';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) {
      return '방금 전';
    } else if (diffMins < 60) {
      return `${diffMins}분 전`;
    } else if (diffHours < 24) {
      return `${diffHours}시간 전`;
    } else if (diffDays < 7) {
      return `${diffDays}일 전`;
    } else {
      return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
    }
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
        {notifications.map((notification) => (
          <NotificationItem key={notification.notificationId} onPress={() => handleNotificationPress(notification)}>
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
            {notification.title && (
              <Typography variant="subtitle2" style={{ marginBottom: 4 }}>
                {notification.title}
              </Typography>
            )}
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
