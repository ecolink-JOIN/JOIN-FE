import { API } from '@/apis/axios';

export const ProofService = () => {
  const baseUrl = '/study';

  /**
   * 회차 인증 조회 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/05.%20%EA%B3%B5%EC%A7%80/createProof
   */
  const getProof = async (studyToken: string, meetingNo: number) => {
    const req = (await API.get(`${baseUrl}/${studyToken}/meetings/${meetingNo}/proofs`)) as ProofResponse.GetProof;
    return req.data;
  };

  /**
   * 회차 인증 목록 조회
   */
  const getProofList = async (studyToken: string, meetingNo: number) => {
    const req = (await API.get(`${baseUrl}/${studyToken}/meetings/${meetingNo}/proofs`)) as ProofResponse.ProofList;
    return req.data;
  };

  /**
   * 회차 인증 등록 - 인증 필수
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/05.%20%EA%B3%B5%EC%A7%80/createProof
   */
  const postProof = async (studyToken: string, meetingNo: number, body: ProofRequest.PostProof) => {
    const req = (await API.post(
      `${baseUrl}/${studyToken}/meetings/${meetingNo}/proofs`,
      body,
    )) as ProofResponse.CreateProofResponse;
    return req.data;
  };

  /**
   * 인증 승인 - 관리자
   */
  const approveProof = async (studyToken: string, meetingNo: number, proofId: number) => {
    const req = (await API.patch(
      `${baseUrl}/${studyToken}/meetings/${meetingNo}/proofs/${proofId}/approve`,
    )) as Shared.HttpResponse;
    return req.data;
  };

  /**
   * 인증 반려 - 관리자
   */
  const rejectProof = async (studyToken: string, meetingNo: number, proofId: number) => {
    const req = (await API.patch(
      `${baseUrl}/${studyToken}/meetings/${meetingNo}/proofs/${proofId}/reject`,
    )) as Shared.HttpResponse;
    return req.data;
  };

  return { getProof, getProofList, postProof, approveProof, rejectProof };
};
