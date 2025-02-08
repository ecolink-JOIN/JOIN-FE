/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace StudyResponse {
  export interface Detail extends Shared.HttpResponse {
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

  export interface Search extends Shared.HttpResponse {
    data: Search;
  }

  export interface Recommendation extends Shared.HttpResponse {
    data: StudyInfo[];
  }

  export interface StudyInfo {
    studyToken: string;
    title: string;
    isBookmark: boolean;
    viewCount: number;
    leader: Leader;
    memberAverage: number;
  }

  export interface Popular extends Shared.HttpResponse {
    data: Popular;
  }
}

declare namespace StudyRequest {
  export interface Close {
    actualEndDate: Date;
  }

  export interface Recruit {
    capacity: number;
    recruit_end_date: string;
    st_date: string;
    end_date: string;
    province: string;
    city: string;
    category_name: SharedStudy.Category;
    study_name: string;
    title: string;
    introduction: string;
    content: string;
    rule_exp: string;
    qualification_exp: string;
    schedules: Schedule[];
    regular: boolean;
  }
  export interface Applications {
    introduction: string;
    appDate: Date;
    studyToken: string;
  }
  export interface ReRecruit {
    capacity: number;
    recruit_end_date: Date;
    title: string;
    introduction: string;
    content: string;
    qualification_exp: string;
  }
  export interface Reject {
    rejectReason: string;
    otherReason: string;
  }

  export interface Recommendation {
    category?: SharedStudy.Category;
    form?: SharedStudy.Form;
    possibleDays?: SharedStudy.PossibleDays[];
    timeZone?: SharedStudy.TimeZone;
    minParticipationCount?: number;
    maxParticipationCount?: number;
    province?: string;
    city?: string;
  }

  export interface Popular {
    category: string;
    form: string;
    now: Date;
    pageNumber: number;
    pageSize: number;
  }
}
interface Popular extends Shared.Pagenation {
  content: StudyContent[];
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
  weekOfDay: SharedStudy.PossibleDays;
  stTime: string;
  endTime: string;
}

interface Search extends Shared.Pagenation {
  content: StudyContent[];
}
