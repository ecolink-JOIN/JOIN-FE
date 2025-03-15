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
