declare namespace Avatars {
  export interface BaseDto {
    avatarToken: string;
    nickname: string;
    totalRating: number;
    ratingCnt: number;
    email: string;
    singUpDate: Date;
    status: string;
    platform: string;
    image: Image;
  }
  export interface NicknameDto {
    message: string;
    valid: boolean;
  }
}

interface Image {
  url: string;
  width: number;
  height: number;
}

declare namespace Terms {
  export interface BaseDto {
    data: { id: number; version: string; title: string; content: string; type: string }[];
    status: number;
    message: string;
  }

  export interface AgreeRequest {
    terms: {
      id: number;
      version: string;
      status: string;
    }[];
  }
}
