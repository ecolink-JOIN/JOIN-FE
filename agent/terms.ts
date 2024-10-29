import requests, { ReturnAxios } from './api';

interface TermRequest {
  get: void;
}

interface TermResponse {
  get: ReturnAxios<TermInfo>;
}

export type TermInfo = {
  data: {
    id: number;
    title: string;
    content: string;
    version: string;
    type: string;
  }[];
};

/**
 * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/02.%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85/getRequiredConsentTerms
 */
export const Terms = {
  getAll: (request: TermRequest['get']): TermResponse['get'] => {
    return requests.get(`/terms`);
  },
};
