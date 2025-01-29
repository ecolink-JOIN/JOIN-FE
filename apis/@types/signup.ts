/* eslint-disable @typescript-eslint/no-unused-vars */
declare namespace Avatars {
  export interface BaseDto extends Shared.HttpResponse {
    data: {
      avatarToken: string;
      nickname: string;
      totalRating: number;
      ratingCnt: number;
      email: string;
      singUpDate: Date;
      status: string;
      platform: string;
      image: Image;
    };
  }
  export interface NicknameDto extends Shared.HttpResponse {
    data: { message: string; valid: boolean };
  }
}

interface Image {
  url: string;
  width: number;
  height: number;
}

declare namespace Terms {
  export interface BaseDto extends Shared.HttpResponse {
    data: { id: number; version: string; title: string; content: string; type: 'OPTIONAL' | 'REQUIRED' }[];
  }

  export interface AgreeRequest {
    terms: {
      id: number;
      version: string;
      status: string;
    }[];
  }
}
