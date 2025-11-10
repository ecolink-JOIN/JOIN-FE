import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NotificationService } from '@/apis';

interface NotificationContextType {
  unreadCount: number;
  refreshUnreadCount: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = async () => {
    try {
      const notifications = await NotificationService().getNotifications();
      const unread = notifications.filter((n) => !n.isRead).length;
      setUnreadCount(unread);
    } catch (error: any) {
      // 알림이 없거나 에러 발생 시 0으로 설정 (배지 숨김)
      console.log('알림 조회 실패 또는 알림 없음:', error?.response?.status);
      setUnreadCount(0);
    }
  };

  // 최초 로드 시 알림 개수 조회
  useEffect(() => {
    refreshUnreadCount();
  }, []);

  return (
    <NotificationContext.Provider value={{ unreadCount, refreshUnreadCount }}>{children}</NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};
