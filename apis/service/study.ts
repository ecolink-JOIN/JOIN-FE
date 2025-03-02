import { API } from '@/apis/axios';

export const StudyService = () => {
  const url = '/study';

  /**
   * 스터디 상세 조회 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/getStudyDetails
   */
  const detail = async (studyToken: string) => {
    const req = (await API.get(`${url}/${studyToken}`)) as StudyResponse.Detail;
    return req.data;
  };

  /**
   * 스터디 검색 - 입력한 키워드가 제목에 포함된 스터디 목록을 반환
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/searchStudy
   */
  const search = async (keyword?: string, pageNumber?: number, pageSize?: number) => {
    const req = (await API.get(`${url}/search`, { params: { keyword, pageNumber, pageSize } })) as StudyResponse.Search;
    return req.data;
  };

  /**
   * 맞춤 스터디 조회
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/recommendStudies
   */
  const recommendation = async (params: StudyRequest.Recommendation) => {
    const req = (await API.get(`${url}/recommendation`, { params })) as StudyResponse.Recommendation;
    return req.data;
  };

  /**
   * 맞춤 스터디 조회
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/recommendStudies
   */
  const popular = async (params: StudyRequest.Popular) => {
    const req = (await API.get(`${url}/popular`, { params })) as StudyResponse.Popular;
    return req.data;
  };

  /**
   * 스터디 종료 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/closeStudy
   */
  const close = async (studyId: number, body: StudyRequest.Close) => {
    const req = (await API.post(`${url}/${studyId}/close`, body)) as Shared.HttpResponse;
    return req.data;
  };

  /**
   * 스터디 모집 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/createStudy
   */
  const recruit = async (body: StudyRequest.Recruit) => {
    const req = (await API.post(`${url}/recruit`, body)) as Shared.HttpResponse;
    return req.data;
  };

  /**
   * 스터디 추가 모집 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/reRecruitStudy
   */
  const reRecruit = async (body: StudyRequest.ReRecruit) => {
    const req = (await API.patch(`${url}/re-recruit`, body)) as Shared.HttpResponse;
    return req.data;
  };

  return { detail, search, recommendation, popular, close, recruit, reRecruit };
};

export const ApplicationsService = () => {
  const url = '/applications';

  /**
   * 스터디 지원 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/apply
   */
  const post = async (body: StudyRequest.Applications) => {
    const req = (await API.post(`${url}`, body)) as Shared.HttpResponse;
    return req.data;
  };

  /**
   * 스터디 지원 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/apply
   */
  const reject = async (applicationId: number, body: StudyRequest.Reject) => {
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

  return { post, reject, accept };
};
