import { API } from '@/apis/axios';

export const BlocksService = () => {
  const url = '/blocks';
  /**
   * 차단 목록 조회
   * @api-doc: http://ec2-43-200-168-20.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/13.%20%EC%B0%A8%EB%8B%A8/getBlocks
   */
  const getBlocks = async () => {
    const req = (await API.get(`${url}`)) as BlocksResponse.GetBlocks;
    return req.data;
  };

  /**일반 사용자 차단
   * @api-doc: http://ec2-43-200-168-20.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/13.%20%EC%B0%A8%EB%8B%A8/create
   */
  const postBlocks = async (data: BlocksRequest.PostBlocks) => {
    const req = (await API.post(`${url}`, data)) as BlocksResponse.PostBlocks;
    return req.data;
  };

  /**
   * 진행중인 스터디 멤버 차단
   * @api-doc: http://ec2-43-200-168-20.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/13.%20%EC%B0%A8%EB%8B%A8/deleteBookmark
   */
  const postBlockStudyMember = async (data: BlocksRequest.PostBlocksStudyMember) => {
    const req = (await API.post(`${url}/block/study-member`, data)) as BlocksResponse.PostBlocks;
    return req.data;
  };

  /**
   * 스터디별 차단 가능한 사용자 목록
   * @api-doc: http://ec2-43-200-168-20.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/13.%20%EC%B0%A8%EB%8B%A8/getStudiesForBlock
   */
  const getStudyBlock = async () => {
    const req = (await API.get(`/study/block`)) as BlocksResponse.GetStudyBlocks;
    return req.data;
  };

  return { getBlocks, postBlocks, postBlockStudyMember, getStudyBlock };
};
