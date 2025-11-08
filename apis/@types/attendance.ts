/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace AttendanceResponse {
  export interface GetAttendance extends Shared.HttpResponse {
    data: {
      hasAttendance: boolean;
      attendanceTime: string | null; // ISO 8601 format
    };
  }

  export interface AttendanceStatus {
    attendanceId: number;
    avatarToken: string;
    avatarNickname: string;
    status: 'PRESENT' | 'LATENESS' | 'ABSENT';
    attendanceTime: string | null;
  }

  export interface MeetingAttendanceList extends Shared.HttpResponse {
    data: AttendanceStatus[];
  }
}

declare namespace AttendanceRequest {
  export interface PostAttendance {
    now: string; // ISO 8601 format (YYYY-MM-DDTHH:mm:ss)
  }

  export interface UpdateAttendance {
    targetAvatarToken: string;
    status: 'PRESENT' | 'LATENESS' | 'ABSENT';
  }
}
