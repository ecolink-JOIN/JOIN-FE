/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace ReportResponse {
  export interface GetReport extends Shared.HttpResponse {
    data: {
      report_type: string;
      // TODO: 스터디 신고 타입 추가
    };
  }

  interface Report {
    id: number;
    meetingNo: number;
    studyDate: Date;
    stTime: string;
    endTime: string;
    status: string;
  }
}

declare namespace ReportRequest {
  export interface PostReport {
    studyDate: Date;
    stTime: string;
    endTime: string;
  }
}
