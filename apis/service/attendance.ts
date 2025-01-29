import { API } from '@/apis/axios';

export const AttendanceService = () => {
  /**
   * 출석 내역 조회
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/09.%20%EC%B6%9C%EC%84%9D/checkAttendance
   */
  const getAttendance = async (studyToken: string, meetingNo: number) => {
    const req = (await API.get(`${studyToken}/meetings/${meetingNo}/attendance`)) as AttendanceResponse.GetAttendance;
    return req.data;
  };

  /**
   * 출석 진행
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/09.%20%EC%B6%9C%EC%84%9D/createAttendance
   */
  const postAttendance = async (studyToken: string, meetingNo: number, data: AttendanceRequest.PostAttendance) => {
    const req = (await API.post(`${studyToken}/meetings/${meetingNo}/attendance`, data)) as Shared.HttpResponse;
    return req.data;
  };

  return { getAttendance, postAttendance };
};
