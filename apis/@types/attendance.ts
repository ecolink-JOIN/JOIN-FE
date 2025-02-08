/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace AttendanceResponse {
  export interface GetAttendance extends Shared.HttpResponse {
    data: {
      hasAttendance: boolean;
      attendanceTime: Date;
    };
  }
}

declare namespace AttendanceRequest {
  export interface PostAttendance {
    now: Date;
  }
}
