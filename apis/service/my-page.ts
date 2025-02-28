import { API } from '@/apis/axios';

export const MyPageService = () => {
  const url = '/my-page';

  /**
   * 마이페이지 조회
   * @api-doc: http://ec2-43-200-168-20.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/14.%20%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80/getMyPageInfo
   */
  const getMyPage = async () => {
    const req = (await API.get(`${url}`)) as MyPageResponse.GetMyPage;
    return req.data;
  };

  /**
   * 마이페이지 운영중인 스터디 목록을 조회
   * @api-doc: http://ec2-43-200-168-20.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/14.%20%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80/getMyManagedStudies
   */
  const getManageStudy = async () => {
    const req = (await API.get(`${url}/manage-study`)) as MyPageResponse.GetManageStudy;
    return req.data;
  };

  /**
   * 마이페이지 가입 스터디 목록
   * @api-doc: http://ec2-43-200-168-20.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/14.%20%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80/getMyJoinedStudies
   */
  const getJoinStudy = async () => {
    const req = (await API.get(`${url}/join-study`)) as MyPageResponse.GetJoinStudy;
    return req.data;
  };

  /**
   * 마이페이지 관심 스터디 목록
   * @api-doc: http://ec2-43-200-168-20.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/14.%20%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80/getMyInterestStudies
   */
  const getInterestStudy = async () => {
    const req = (await API.get(`${url}/interest-study`)) as MyPageResponse.GetInterestStudy;
    return req.data;
  };

  return { getMyPage, getManageStudy, getJoinStudy, getInterestStudy };
};
