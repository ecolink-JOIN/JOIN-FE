/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace BlocksResponse {
  export interface GetBlocks extends Shared.HttpResponse {
    data: { id: number; avatarToken: string; nickname: string; profileUrl: string }[];
  }

  export interface PostBlocks extends Shared.HttpResponse {
    data: { id: number; blockAvatarToken: string; blockDate: string };
  }

  interface GetStudyBlocks extends Shared.HttpResponse {
    data: { title: string; studyToken: string; members: Member[]; isActive: boolean }[];
  }

  interface Member {
    nickname: string;
    avatarToken: string;
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
