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

  // 푸시 알림 동의 요청
  export interface PushConsentRequest {
    consent: boolean;
    fcmToken: string;
  }

  // 유저 선호 변경 요청
  export interface PreferenceRequest {
    category: string;
    form: 'ONLINE' | 'OFFLINE' | 'HYBRID';
    possibleDays: ('MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY')[];
    timeZone: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
    minParticipationCount: number;
    maxParticipationCount: number;
    province: string;
    city: string;
  }
}

interface Image {
  url: string;
  width: number;
  height: number;
}

declare namespace Terms {
  export interface BaseDto extends Shared.HttpResponse {
    data: Term[];
  }

  export interface Term {
    id: number;
    version: string;
    title: string;
    content: string;
    type: 'OPTIONAL' | 'REQUIRED';
  }

  export interface AgreeRequest {
    terms: {
      id: number;
      version: string;
      status: string;
    }[];
  }
}
