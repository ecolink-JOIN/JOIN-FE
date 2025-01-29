/* eslint-disable @typescript-eslint/no-unused-vars */

namespace Shared {
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
  export type Category = '입시' | '취업' | '자격증' | '어학' | '취미' | '기타';
  export type PossibleDays = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  export type Form = 'ONLINE' | 'OFFLINE';
  export type TimeZone = 'MORNING' | 'AFTERNOON' | 'EVENING';
}
