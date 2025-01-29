/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace MeetingsResponse {
  export interface GetMeetings extends Shared.HttpResponse {
    data: Meeting[];
  }

  interface Meeting {
    id: number;
    meetingNo: number;
    studyDate: Date;
    stTime: string;
    endTime: string;
    status: string;
  }
}

declare namespace MeetingsRequest {
  export interface PostMeeting {
    studyDate: Date;
    stTime: string;
    endTime: string;
  }
}
