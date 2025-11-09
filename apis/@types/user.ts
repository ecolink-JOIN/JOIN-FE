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
}
