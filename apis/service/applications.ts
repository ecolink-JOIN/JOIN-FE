import { API } from '../axios';

export const ApplicationsService = () => {
  const url = '/applications';

  /**
   * 스터디 지원 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/apply
   */
  const post = async (body: ApplicationsRequest.Applications) => {
    const req = (await API.post(`${url}`, body)) as Shared.HttpResponse;
    return req.data;
  };

  /**
   * 스터디 지원 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/apply
   */
  const reject = async (applicationId: number, body: ApplicationsRequest.Reject) => {
    const req = (await API.patch(`${url}/${applicationId}/reject`, body)) as Shared.HttpResponse;
    return req.data;
  };

  /**
   * 스터디 지원 반려 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/rejectApplication
   */
  const accept = async (applicationId: number) => {
    const req = (await API.patch(`${url}/${applicationId}/accept`)) as Shared.HttpResponse;
    return req.data;
  };

  /**
   * 스터디 지원 현황 조회 - 인증 필수
   * @api-doc: http://ec2-43-200-168-20.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/18.%20%EC%A7%80%EC%9B%90/getApplications
   */
  const getApplications = async (studyToken: string) => {
    const req = (await API.get(`${url}/${studyToken}`)) as ApplicationsResponse.GetApplications;
    return req.data;
  };

  return { post, reject, accept, getApplications };
};
