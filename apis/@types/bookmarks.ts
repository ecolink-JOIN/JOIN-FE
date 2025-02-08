/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace BookmarksResponse {
  export interface GetBookmarks extends Shared.HttpResponse {
    data: Bookmark;
  }

  interface Bookmark extends Shared.Pagenation {
    content: BookmarkContent[];
  }

  interface BookmarkContent {
    studyToken: string;
    title: string;
    isBookmark: boolean;
    viewCount: number;
    leader: {
      nickname: string;
      totalRating: number;
    };
    memberAverage: number;
  }
}

declare namespace BookmarksRequest {
  export interface PostBookmark {
    study_id: string;
  }

  export interface DeleteBookmark {
    study_id: string;
  }
}
