import { API } from '@/apis/axios';

export const ReportService = () => {
  const url = '/report';

  /**
   * 신고 API - 인증 필수
   * @api-doc: http://ec2-43-200-168-20.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/15.%20%EC%8B%A0%EA%B3%A0/createReport
   */
  const postReport = async (data: ReportRequest.PostReport) => {
    const req = (await API.post(url, data)) as Shared.HttpResponse;
    return req.data;
  };

  return { postReport };
};
