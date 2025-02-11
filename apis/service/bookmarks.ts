import { API } from '@/apis/axios';

export const BookmarksService = () => {
  /**
   * 북마크한 스터디 조회
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/07.%20%EB%B6%81%EB%A7%88%ED%81%AC/getBookmarkStudy
   */
  const getBookmarks = async (params: ViewsRequest.GetViewsParams) => {
    const req = (await API.get(`/bookmarks`), params) as BookmarksResponse.GetBookmarks;
    return req.data;
  };

  /**
   * 스터디 북마크 등록 API - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/07.%20%EB%B6%81%EB%A7%88%ED%81%AC/addBookmark
   */
  const postBookmark = async (body: BookmarksRequest.PostBookmark) => {
    const req = (await API.post(`/bookmarks`, body)) as Shared.HttpResponse;
    return req.data;
  };
  /**
   * 스터디 북마크 취소 API - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/07.%20%EB%B6%81%EB%A7%88%ED%81%AC/deleteBookmark
   */
  const deleteBookmark = async (data: BookmarksRequest.DeleteBookmark) => {
    const req = (await API.delete(`/bookmarks`, { data })) as Shared.HttpResponse;
    return req.data;
  };

  return { getBookmarks, postBookmark, deleteBookmark };
};
