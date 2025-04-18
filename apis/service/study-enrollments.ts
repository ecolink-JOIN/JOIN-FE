import { API } from '../axios';

export const StudyEnrollmentsService = () => {
  const url = '/study';

  const getStudyEnrollments = async (studyToken: string) => {
    const req = (await API.get(`${url}/${studyToken}/enrollments/members`)) as StudyEnrollmentsResponse.GetMembers;
    return req.data;
  };

  const getMemberDetail = async (avatarToken: string) => {
    const req = (await API.get(`/avatars/${avatarToken}`)) as StudyEnrollmentsResponse.GetMemberDetail;
    return req.data;
  };

  const getMemberAttendance = async (studyToken: string, targetToken: string) => {
    const req = (await API.get(
      `${url}/${studyToken}/enrollments/${targetToken}`,
    )) as StudyEnrollmentsResponse.GetMemberAttendance;
    return req.data;
  };

  const forcedOut = async (studyToken: string, targetToken: string) => {
    const req = (await API.patch(`${url}/${studyToken}/enrollments/forced-out`, {
      targetToken,
    })) as Shared.HttpResponse;
    return req.data;
  };

  const delegateStudy = async (studyToken: string, targetToken: string) => {
    const req = (await API.patch(`${url}/${studyToken}/enrollments/delegate`, {
      targetToken,
    })) as Shared.HttpResponse;
    return req.data;
  };

  // const evaluation = async (studyToken: string, avatarToken: string, score: number, comment: string) => {
  //   const req = (await API.patch(`/evaluation`, {
  //     studyToken,
  //     avatarToken,
  //     score,
  //     comment,
  //   })) as Shared.HttpResponse;
  //   return req.data;
  // };

  return { getStudyEnrollments, getMemberDetail, getMemberAttendance, forcedOut, delegateStudy };
};
