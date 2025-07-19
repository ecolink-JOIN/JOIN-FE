/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace BookmarksResponse {
  export interface GetBookmarks extends Shared.HttpResponse {
    data: Bookmark;
  }

  interface Bookmark extends Shared.Pagenation {
    content: StudyResponse.StudyInfo[];
  }
}

declare namespace BookmarksRequest {
  export interface PostBookmark {
    study_token: string;
  }

  export interface DeleteBookmark {
    study_token: string;
  }
}
