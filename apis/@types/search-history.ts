/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace SearchHistoryResponse {
  export type History = HistoryItem[];

  export interface HistoryItem {
    id: number;
    keyword: string;
    createdDate: string;
  }
}
