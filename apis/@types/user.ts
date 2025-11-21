/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace UserResponse {
  export interface Avatars extends Shared.HttpResponse {
    data: {
      avatarToken: string;
      nickname: string;
      totalRating: number;
      ratingCnt: number;
      email: string;
      singUpDate: Date;
      status: 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'DELETED';
      platform: 'LOCAL' | 'KAKAO' | 'NAVER';
      image: Image;
    };
  }

  export interface AppNotifications extends Shared.HttpResponse {
    data: AppNotification[];
  }

  export interface AppNotification {
    id: number;
    title: string;
    content: string;
    createdAt: string;
  }

  interface Image {
    url: string;
    width: number;
    height: number;
  }

  // 아바타 상세 정보 (출석률, 인증률 포함)
  export interface AvatarDetail extends Shared.HttpResponse {
    data: {
      avatarToken: string;
      nickname: string;
      profileUrl: string;
      averageAttendanceRate: number; // 평균 출석률
      averageProofRate: number; // 평균 인증률
    };
  }
}
