import { API } from '@/apis/axios';

export const StudyService = () => {
  const url = '/study';

  /**
   * 스터디 상세 조회 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/getStudyDetails
   */
  const detail = async (studyId: number) => {
    const req = (await API.get(url, { params: { studyId } })) as Study.DetailDto;
    return req.data;
  };

  /**
   * 스터디 검색 - 입력한 키워드가 제목에 포함된 스터디 목록을 반환
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/searchStudy
   */
  const search = async (keyword?: number, pageNumber?: number, pageSize?: number) => {
    const req = (await API.get(url, { params: { keyword, pageNumber, pageSize } })) as Study.SearchDto;
    return req.data;
  };

  /**
   * 맞춤 스터디 조회
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/recommendStudies
   */
  const recommendation = async (params: Study.RecommendationRequest) => {
    const req = (await API.get(url, { params })) as Study.RecommendationDto;
    return req.data;
  };

  /**
   * 맞춤 스터디 조회
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/recommendStudies
   */
  const popular = async (params: Study.PopularRequest) => {
    const req = (await API.get(url, { params })) as Study.PopularDto;
    return req.data;
  };

  return { detail, search, recommendation, popular };
};
