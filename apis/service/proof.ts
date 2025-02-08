import { API } from '@/apis/axios';

export const ProofService = () => {
  /**
   * 회차 인증 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/05.%20%EA%B3%B5%EC%A7%80/createProof
   */
  const getProof = async (studyToken: string, meetingNo: number) => {
    const req = (await API.get(`/study/${studyToken}/meetings/${meetingNo}/proofs`)) as ProofResponse.GetProof;
    return req.data;
  };
  /**
   * 회차 인증 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/05.%20%EA%B3%B5%EC%A7%80/createProof
   */
  const postProof = async (studyToken: string, meetingNo: number, body: ProofRequest.PostProof) => {
    const req = (await API.post(`/study/${studyToken}/meetings/${meetingNo}/proofs`, body)) as Shared.HttpResponse;
    return req.data;
  };

  return { getProof, postProof };
};
