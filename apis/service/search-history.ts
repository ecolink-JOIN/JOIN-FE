import { API } from '@/apis/axios';

export const SearchHistoryService = () => {
  const url = '/search-histories';

  /**
   * 검색 기록 조회 - 인증 필요
   * @api-doc: GET /api/v1/search-histories
   */
  const getHistory = async (): Promise<SearchHistoryResponse.History> => {
    const req = await API.get(url);

    // axios 인터셉터가 이미 response.data를 반환하므로 req가 바로 배열
    if (Array.isArray(req)) {
      return req as SearchHistoryResponse.History;
    }

    // 혹시 객체 형태로 오는 경우 처리
    const responseData = req.data || req;

    if (responseData && typeof responseData === 'object' && !Array.isArray(responseData)) {
      const items = Object.keys(responseData)
        .filter((key) => key !== 'length')
        .map((key) => responseData[key])
        .filter((item) => item && typeof item === 'object');

      return items as SearchHistoryResponse.History;
    }

    return (responseData || []) as SearchHistoryResponse.History;
  };

  return { getHistory };
};
