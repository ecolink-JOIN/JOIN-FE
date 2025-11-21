/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace NoticeResponse {
  // 알림 목록 응답
  export interface NotificationList extends Shared.HttpResponse {
    data: Notification[];
  }

  export interface Notification {
    notificationId: number;
    title: string;
    content: string;
    type:
      | 'STUDY_NOTICE'
      | 'PROOF_APPROVAL'
      | 'PROOF_REJECTION'
      | 'APPLICATION_APPROVAL'
      | 'APPLICATION_REJECTION'
      | 'FORCED_OUT'
      | 'STUDY_END'
      | 'DELEGATE';
    createdAt: string;
    isRead: boolean;
  }
}

declare namespace NoticeRequest {
  export interface StudyNotice {
    content: string;
  }
}
