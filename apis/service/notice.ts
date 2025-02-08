import { API } from '@/apis/axios';

export const NoticeService = () => {
  /**
   * 스터디 공지 생성 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/05.%20%EA%B3%B5%EC%A7%80/createNotice
   */
  const studyNotice = async (studyId: number, body: NoticeRequest.StudyNotice) => {
    const req = (await API.post(`study/${studyId}/notice`, body)) as Shared.HttpResponse;
    return req.data;
  };

  return { studyNotice };
};
