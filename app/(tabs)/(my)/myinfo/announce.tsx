import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import React, { useEffect, useState } from 'react';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import { UserService } from '@/apis';
import { ActivityIndicator, View } from 'react-native';

const Index = () => {
  const [notifications, setNotifications] = useState<UserResponse.AppNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const data = await UserService().getAppNotifications();
      setNotifications(data);
    } catch (error: any) {
      console.error('공지사항 조회 실패:', error);
      // 빈 배열로 설정하여 "등록된 공지사항이 없습니다" 메시지 표시
      setNotifications([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  if (isLoading) {
    return (
      <ManageView>
        <Typography variant="heading3">공지사항</Typography>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ManageView>
    );
  }

  if (notifications.length === 0) {
    return (
      <ManageView>
        <Typography variant="heading3">공지사항</Typography>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40 }}>
          <Typography variant="body3" style={{ color: colors.gray[8] }}>
            등록된 공지사항이 없습니다.
          </Typography>
        </View>
      </ManageView>
    );
  }

  return (
    <ManageView>
      <Typography variant="heading3">공지사항</Typography>
      {notifications.map((item) => (
        <ManageBoxView style={shadowStyles.shadow} key={item.id}>
          <AlarmBox>
            <Header>
              <Typography variant="button">{item.title}</Typography>
              <Typography variant="button" style={{ color: colors.gray[8] }}>
                {formatDate(item.createdAt)}
              </Typography>
            </Header>
            <Typography variant="button" style={{ color: colors.gray[8] }}>
              {item.content}
            </Typography>
          </AlarmBox>
        </ManageBoxView>
      ))}
    </ManageView>
  );
};

export default Index;

const AlarmBox = styled.Pressable`
  padding: 14px 20px;
  gap: 16px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
