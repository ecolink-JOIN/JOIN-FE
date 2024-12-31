import requests, { ReturnAxios } from './api';

interface SearchRequest {
  keyword: string;
  page: number;
  size: number;
  sort: {
    unsorted: boolean;
    empty: boolean;
    sorted: boolean;
  };
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}

interface RecommendationRequest {
  category: string;
  form: 'ONLINE' | 'OFFLINE';
  possibleDays: ('SUN' | 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT')[];
  timeZone: 'MORNING' | 'AFTERNOON' | 'EVENING';
  minParticipationCount: number;
  maxParticipationCount: number;
  province: string;
  city: string;
}

interface PopularRequest {
  category: string;
  form: 'ONLINE' | 'OFFLINE';
  now: string;
  page: number;
  size: number;
  sort: {
    unsorted: boolean;
    empty: boolean;
    sorted: boolean;
  };
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}

interface StudyResponse {
  studySearch: ReturnAxios<SearchList>;
  studyRecommendation: ReturnAxios<RecommendationList[]>;
  studyPopular: ReturnAxios<RecommendationList[]>;
}

export type SearchList = {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  size: number;
  content: {
    studyToken: string;
    title: string;
    isBookmark: boolean;
    viewCount: number;
    leader: {
      nickname: string;
      totalRating: number;
    };
    memberAverage: number;
  }[];
  number: number;
  sort: {
    unsorted: boolean;
    empty: boolean;
    sorted: boolean;
  };
  pageable: {
    unpaged: boolean;
    offset: number;
    sort: {
      unsorted: boolean;
      empty: boolean;
      sorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type RecommendationList = {
  studyToken: string;
  title: string;
  isBookmark: boolean;
  viewCount: number;
  leader: {
    nickname: string;
    totalRating: number;
  };
  memberAverage: number;
};

export type PopularList = {
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  size: number;
  content: {
    studyToken: string;
    title: string;
    isBookmark: boolean;
    viewCount: number;
    leader: {
      nickname: string;
      totalRating: number;
    };
    memberAverage: number;
  }[];
  number: number;
  sort: {
    unsorted: boolean;
    empty: boolean;
    sorted: boolean;
  };
  pageable: {
    unpaged: boolean;
    offset: number;
    sort: {
      unsorted: boolean;
      empty: boolean;
      sorted: boolean;
    };
    paged: boolean;
    pageNumber: number;
    pageSize: number;
  };
  first: boolean;
  last: boolean;
  empty: boolean;
};

export const Study = {
  /**
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/searchStudy
   */
  search: (request: SearchRequest): StudyResponse['studySearch'] => {
    return requests.get(`/study/search`, {
      params: request,
    });
  },

  /**
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/recommendStudies
   */
  recommendation: (request: RecommendationRequest): StudyResponse['studyRecommendation'] => {
    return requests.post(`/study/recommendation`, { params: request });
  },

  /**
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/03.%20%EC%8A%A4%ED%84%B0%EB%94%94/getStudiesOrderByPopularity
   */
  popular: (request: PopularRequest): StudyResponse['studyPopular'] => {
    return requests.get(`/study/popular`, {
      params: request,
    });
  },
};
