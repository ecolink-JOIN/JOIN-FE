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

  /**
   * 차단 해제
   * @param blockId 차단 ID (차단 목록 조회 시 받은 id)
   *
   * TODO: 백엔드 API 스펙 확인 필요
   * - 현재: DELETE /api/v1/blocks/{blockId}
   * - 확인 필요: 파라미터가 id인지 avatarToken인지
   * - 백엔드 개발자에게 차단 해제 API 엔드포인트 확인 요청
   */
  const deleteBlock = async (blockId: number) => {
    const req = await API.delete(`${url}/${blockId}`);
    return req.data;
  };

  return { getBlocks, postBlocks, postBlockStudyMember, getStudyBlock, deleteBlock };
};
