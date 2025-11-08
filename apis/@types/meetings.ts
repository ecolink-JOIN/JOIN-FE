/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace MeetingsResponse {
  export interface GetMeetings extends Shared.HttpResponse {
    data: Meeting[];
  }

  interface Meeting {
    id: number;
    meetingNo: number;
    studyDate: string; // YYYY-MM-DD
    stTime: string; // HH:mm
    endTime: string; // HH:mm
    status: MeetingStatus;
  }

  export type MeetingStatus =
    | 'WAITING' // 대기
    | 'ACTIVE' // 진행중
    | 'COMPLETED' // 완료
    | 'NOT_STARTED'; // 시작 안 함
}

declare namespace MeetingsRequest {
  export interface PostMeeting {
    studyDate: string; // YYYY-MM-DD
    stTime: string; // HH:mm
    endTime: string; // HH:mm
  }
}
