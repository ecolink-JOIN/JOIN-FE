/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace ReportResponse {}

declare namespace ReportRequest {
  export interface PostReport {
    report_type: ReportType;
    study_token: string;
    reason: string;
  }
}

type ReportType = 'STUDY_CONTENT' | 'ENROLLMENT_PROCESS' | 'SCAM' | 'MISCONDUCT' | 'WRITER';
