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
    data: { ongoingStudyCount: number; completedStudyCount: number; joinStudyInfos: JoinStudyInfo[] };
  }

  export interface GetInterestStudy extends Shared.HttpResponse {
    data: { interestStudyInfos: InterestStudyInfo[] };
  }

  interface StudyInfo {
    name: string;
    status: string;
    teamAverageAttendanceRate: number;
    teamAverageProofRate: number;
    studyMembersInfos: StudyMembersInfo[];
    kakaoUrl: null;
  }

  interface StudyMembersInfo {
    avatarToken: string;
    nickname: null | string;
    averageAttendanceRate: number;
    averageProofRate: number;
    isFullyApproved: boolean;
  }

  export interface JoinStudyInfo {
    name: string;
    status: string;
  }
  export interface InterestStudyInfo {
    studyName: string;
    status: string;
    studyMemberInfos: StudyMemberInfo[];
    viewCount: number;
  }

  interface StudyMemberInfo {
    studyRole: string;
    nickname: string;
    rating: number;
  }

  interface Image {
    url: string;
  }
}
