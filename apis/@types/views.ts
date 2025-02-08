/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace ViewsResponse {
  export interface GetViews extends Shared.HttpResponse {
    data: BookmarksResponse.Bookmark; // Bookmark 결과와 타입 공유
  }
}

declare namespace ViewsRequest {}
