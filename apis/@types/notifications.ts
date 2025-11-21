/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace NotificationResponse {
  export interface List extends Shared.HttpResponse {
    data: Notification[];
  }

  export interface Notification {
    notificationId: number;
    title: string | null;
    content: string;
    type: 'STUDY_ANNOUNCEMENT' | 'ATTENDANCE_CHECK' | 'PROOF' | 'OTHER';
    createdAt: string; // ISO 8601 format
    isRead: boolean;
  }
}
