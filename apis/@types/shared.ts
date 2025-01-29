/* eslint-disable @typescript-eslint/no-unused-vars */

namespace Shared {
  export interface HttpRequest {
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
