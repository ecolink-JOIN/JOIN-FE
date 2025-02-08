import { API } from '@/apis/axios';

export const MeetingsService = () => {
  /**
   * 회차 리스트 조회
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/05.%20%EA%B3%B5%EC%A7%80/createNotice
   */
  const getMeetings = async (studyToken: string) => {
    const req = (await API.get(`study/${studyToken}/meetings`)) as MeetingsResponse.GetMeetings;
    return req.data;
  };

  /**
   * 회차 리스트 조회
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/05.%20%EA%B3%B5%EC%A7%80/createNotice
   */
  const postMeeting = async (studyToken: string, body: MeetingsRequest.PostMeeting) => {
    const req = (await API.post(`study/${studyToken}/meetings`, body)) as Shared.HttpResponse;
    return req.data;
  };
  /**
   * 회차 리스트 조회
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/05.%20%EA%B3%B5%EC%A7%80/createNotice
   */
  const deleteMeeting = async (studyToken: string, meetingId: number) => {
    const req = (await API.delete(`study/${studyToken}/meetings/${meetingId}`)) as Shared.HttpResponse;
    return req.data;
  };

  return { getMeetings, postMeeting, deleteMeeting };
};
