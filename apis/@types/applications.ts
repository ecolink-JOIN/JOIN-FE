/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace ApplicationsResponse {
  export interface GetApplications extends Shared.HttpResponse {
    data: GetApplicationsResult[];
  }
  export interface GetApplicationsResult {
    applicationId: number;
    nickname: string;
    image: string;
    applicationStatus: '승인 대기중' | '승인 완료' | '거절 완료';
    introduction: string;
    activeStudyStats: StudyStats;
    completedStudyStats: StudyStats;
  }

  export interface StudyStats {
    attendanceRate: number;
    proofRate: number;
    rating: number;
    studyCount: number;
  }
}

declare namespace ApplicationsRequest {
  export interface Applications {
    introduction: string;
    appDate: Date;
    studyToken: string;
  }
  export interface Reject {
    rejectReason: 'ATTENDANCE' | 'AUTHENTICATION' | 'RATING' | 'STUDY_COUNT' | 'OTHER';
    otherReason: string;
  }
}
