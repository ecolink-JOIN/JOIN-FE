/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace BatchJobRequest {
  export interface PutBatchJobParams {
    batchJobId: number;
  }
  export interface PutBatchJobBody {
    content?: string;
    day?: SharedStudy.PossibleDays;
    time?: string;
    studyToken: string;
  }
  export interface PostBatchJobBody {
    content: string;
    day: SharedStudy.PossibleDays;
    time?: string;
    studyToken: string;
  }
}

declare namespace BatchJobResponse {
  export interface BatchJob extends Shared.HttpResponse {
    data: Job[];
  }

  export interface Job {
    batchJobId: number;
    content: string;
    day: string;
    time: string;
  }
}
