import { API } from '@/apis/axios';

export const ViewsService = () => {
  const url = '/views';

  /**
   * 최근 조회한 스터디 조회
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/08.%20%EC%B5%9C%EA%B7%BC%20%EC%A1%B0%ED%9A%8C%ED%95%9C%20%EC%8A%A4%ED%84%B0%EB%94%94/getViewStudyByAvatarId
   */
  const getViews = async () => {
    const req = (await API.get(url)) as BookmarksResponse.GetBookmarks;
    return req.data;
  };

  return { getViews };
};
