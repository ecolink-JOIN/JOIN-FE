/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace MyPageResponse {
  export interface GetMyPage extends Shared.HttpResponse {
    data: {
      avatarToken: string;
      nickname: string;
      image: Image;
      averageAttendanceRate: number;
      averageProofRate: number;
      averageRating: number;
    };
  }

  export interface GetManageStudy extends Shared.HttpResponse {
    data: StudyInfo[];
  }

  export interface GetJoinStudy extends Shared.HttpResponse {
    data: {
      ongoingStudyCount: number;
      completedStudyCount: number;
      joinStudyInfos: JoinStudyInfo[];
    };
  }

  export interface GetInterestStudy extends Shared.HttpResponse {
    data: StudyResponse.StudyInfo[];
  }
  export interface StudyInfo {
    studyToken: string;
    name: string;
    status: 'RECRUITING' | 'READY' | 'ACTIVE' | 'COMPLETED';
    teamAverageAttendanceRate: number;
    teamAverageProofRate: number;
    studyMembersInfos: StudyMembersInfo[];
    kakaoUrl: string;
  }

  export interface StudyMembersInfo {
    avatarToken: string;
    nickname: string;
    averageAttendanceRate: number;
    averageProofRate: number;
    isFullyApproved: boolean;
  }

  export interface JoinStudyInfo {
    studyToken: string;
    name: string;
    status: string;
  }

  export interface Leader {
    nickname: string;
    totalRating: number;
  }

  interface Image {
    url: string;
  }
}
