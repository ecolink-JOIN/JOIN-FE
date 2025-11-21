/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace BlocksResponse {
  export interface GetBlocks extends Shared.HttpResponse {
    data: { id: number; avatarToken: string; nickname: string; profileUrl: string }[];
  }

  export interface PostBlocks extends Shared.HttpResponse {
    data: { id: number; blockAvatarToken: string; blockDate: string };
  }

  export interface GetStudyBlocks extends Shared.HttpResponse {
    data: StudyBlock[];
  }

  export interface StudyBlock {
    title: string;
    studyToken: string;
    members: Member[];
    isActive: boolean;
  }

  export interface Member {
    nickname: string;
    avatarToken: string;
    profileUrl?: string;
  }
}

declare namespace BlocksRequest {
  export interface PostBlocks {
    targetAvatarToken: string;
    blockDate: string;
  }
  export interface PostBlocksStudyMember {
    targetAvatarToken: string;
    studyToken: string;
    blockDate: string;
  }
}
