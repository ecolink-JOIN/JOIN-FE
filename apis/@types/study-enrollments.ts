/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace StudyEnrollmentsResponse {
  export interface GetMembers extends Shared.HttpResponse {
    data: Member[];
  }

  export interface Member {
    memberToken: string;
    nickname: string;
    attendanceRate: number;
    proofRate: number;
    totalFine: number;
  }

  export interface GetMemberDetail extends Shared.HttpResponse {
    data: MemberDetail;
  }

  export interface MemberDetail {
    avatarToken: string;
    nickname: string;
    profileUrl: string;
    averageAttendanceRate: number;
    averageProofRate: number;
  }

  export interface GetMemberAttendance extends Shared.HttpResponse {
    data: MemberAttendance;
  }

  export interface MemberAttendance {
    studyToken: string;
    avatarToken: string;
    meetingAttendanceStatus: MeetingAttendanceStatus[];
  }

  export interface MeetingAttendanceStatus {
    meetingNo: number;
    studyDate: Date;
    attendanceStatus: 'PRESENT' | 'LATENESS' | 'ABSENT';
    hasApproveProof: boolean;
  }
}

declare namespace StudyEnrollmentRequest {}
