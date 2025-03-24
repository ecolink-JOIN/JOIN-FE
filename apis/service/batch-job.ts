import { API } from '@/apis/axios';

export const BatchJobService = () => {
  const url = '/batch-job';

  /**
   * 자동 알림 조회 API - 인증 필수
   * @api-doc: http://ec2-43-200-168-20.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/16.%20%EC%9E%90%EB%8F%99%20%EC%95%8C%EB%A6%BC/getBatchJobs
   */
  const getBatchJobs = async (studyToken: string) => {
    const req = (await API.get(`${url}/${studyToken}/batch-jobs`)) as BatchJobResponse.BatchJob;
    return req.data;
  };

  /**
   * 자동 알림 변경 API - 인증 필수
   * @api-doc: http://ec2-43-200-168-20.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/16.%20%EC%9E%90%EB%8F%99%20%EC%95%8C%EB%A6%BC/updateBatchJob
   */
  const putBatchJob = async (
    data: BatchJobRequest.PutBatchJobBody,
    { batchJobId }: BatchJobRequest.PutBatchJobParams,
  ) => {
    const req = (await API.put(`${url}/${batchJobId}`, data)) as Shared.HttpResponse;
    return req.data;
  };

  /**
   * 자동 알림 등록 API - 인증 필수
   * @api-doc: http://ec2-43-200-168-20.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/16.%20%EC%9E%90%EB%8F%99%20%EC%95%8C%EB%A6%BC/addBatchJob
   */
  const postBatchJob = async (data: BatchJobRequest.PostBatchJobBody) => {
    const req = (await API.post(`${url}`, data)) as Shared.HttpResponse;
    return req.data;
  };

  /**
   * 자동 알림 삭제 API - 인증 필수
   * @api-doc: http://ec2-43-200-168-20.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/16.%20%EC%9E%90%EB%8F%99%20%EC%95%8C%EB%A6%BC/deleteBatchJob
   */
  const deleteBatchJob = async (batchJobId: number) => {
    const req = (await API.delete(`${url}/${batchJobId}`)) as Shared.HttpResponse;
    return req.data;
  };

  return { getBatchJobs, putBatchJob, postBatchJob, deleteBatchJob };
};
