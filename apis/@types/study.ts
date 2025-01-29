/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace Study {
  export interface DetailDto extends Shared.HttpRequest {
    data: {
      studyName: string;
      title: string;
      introduction: string;
      content: string;
      capacity: number;
      recruitEndDate: Date;
      stDate: Date;
      endDate: Date;
      writerId: number;
      writerNickname: string;
      schedules: Schedule[];
      ruleExp: string;
      qualificationExp: string;
      regular: boolean;
    };
  }

  export interface SearchDto extends Shared.HttpRequest {
    data: Search;
  }

  export interface Search extends Shared.Pagenation {
    content: StudyContent[];
  }
  export interface RecommendationDto extends Shared.HttpRequest {
    data: {
      studyToken: string;
      title: string;
      isBookmark: boolean;
      viewCount: number;
      leader: Leader;
      memberAverage: number;
    };
  }

  export interface PopularDto extends Shared.HttpRequest {
    data: Popular;
  }

  interface Popular extends Shared.Pagenation {
    content: StudyContent[];
  }

  export interface CloseRequest {
    actualEndDate: Date;
  }

  export interface RecruitRequest {
    capacity: number;
    recruit_end_date: Date;
    st_date: Date;
    end_date: Date;
    province: string;
    city: string;
    category_name: string;
    study_name: string;
    title: string;
    introduction: string;
    content: string;
    rule_exp: string;
    qualification_exp: string;
    schedules: Schedule[];
    regular: boolean;
  }
  export interface ApplicationsRequest {
    introduction: string;
    appDate: Date;
    studyToken: string;
  }
  export interface ReRecruitRequest {
    capacity: number;
    recruit_end_date: Date;
    title: string;
    introduction: string;
    content: string;
    qualification_exp: string;
  }
  export interface RejectRequest {
    rejectReason: string;
    otherReason: string;
  }

  export interface RecommendationRequest {
    category: string;
    form: string;
    possibleDays: string[];
    timeZone: string;
    minParticipationCount: number;
    maxParticipationCount: number;
    province: string;
    city: string;
  }

  export interface PopularRequest {
    category: string;
    form: string;
    now: Date;
    pageNumber: number;
    pageSize: number;
  }

  interface StudyContent {
    studyToken: string;
    title: string;
    isBookmark: boolean;
    viewCount: number;
    leader: Leader;
    memberAverage: number;
  }

  interface Leader {
    nickname: string;
    totalRating: number;
  }

  interface Schedule {
    weekOfDay: string;
    stTime: string;
    endTime: string;
  }
}
