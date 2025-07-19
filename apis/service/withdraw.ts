import { API } from '../axios';

export const WithdrawService = () => {
  const url = (studyToken: string) => `/study/${studyToken}/withdraw`;

  const getRequest = async (studyToken: string) => {
    const req = (await API.get(`${url(studyToken)}/request`)) as WithdrawResponse.RequestList;
    return req.data;
  };

  const postWithdraw = async (studyToken: string, body: WithdrawRequest.PostWithdraw) => {
    const req = (await API.post(`${url(studyToken)}`, body)) as Shared.HttpResponse;
    return req.data;
  };

  const approveWithdraw = async (studyToken: string, withdrawId: number) => {
    const req = (await API.patch(`${url(studyToken)}/${withdrawId}/approve`)) as Shared.HttpResponse;
    return req.data;
  };

  return { getRequest, postWithdraw, approveWithdraw };
};
