/* eslint-disable @typescript-eslint/no-unused-vars */

namespace Shared {
  export interface ErrorResponse {
    data: any;
    code: string;
    message: string;
  }
  export interface HttpResponse {
    data: any;
    status: number;
    message: string;
  }

  export interface Pagenation {
    totalPages: number;
    totalElements: number;
    pageable: Pageable;
    numberOfElements: number;
    size: number;
    content: any;
    number: number;
    sort: Sort;
    first: boolean;
    last: boolean;
    empty: boolean;
  }

  interface Pageable {
    paged: boolean;
    pageNumber: number;
    pageSize: number;
    unpaged: boolean;
    offset: number;
    sort: Sort;
  }
  interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  }
}

namespace SharedStudy {
  export type Category = '입시' | '고시' | '취업' | '자격증' | '사이드프로젝트' | '기타';
  export type PossibleDays = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  export type Form = 'ONLINE' | 'OFFLINE';
  export type TimeZone = 'MORNING' | 'AFTERNOON' | 'EVENING';
  export const Days: { label: string; value: string }[] = [
    { label: '일요일', value: 'MON' },
    { label: '월요일', value: 'TUE' },
    { label: '화요일', value: 'WED' },
    { label: '수요일', value: 'THU' },
    { label: '목요일', value: 'FRI' },
    { label: '금요일', value: 'SAT' },
    { label: '토요일', value: 'SUN' },
  ];
}

namespace GlobalVariable {
  export interface UserInfo {
    nickname: string;
    profileImage: string;
  }
}
