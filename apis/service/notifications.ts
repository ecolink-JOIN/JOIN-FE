import { API } from '../axios';

export const NotificationService = () => {
  // 백엔드에서 api.prefix가 없이 /notifications로만 되어있어 예외 처리
  const baseURL = process.env.EXPO_PUBLIC_API_URL?.replace('/api/v1', '') || '';
  const url = `${baseURL}/notifications`;

  /**
   * 알림 내역 조회 - 인증 필요
   * @api-doc: GET /notifications (예외: api.prefix 없음)
   */
  const getNotifications = async () => {
    const req = (await API.get(url)) as NotificationResponse.List;
    return req.data;
  };

  return { getNotifications };
};
