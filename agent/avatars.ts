import requests, { ReturnAxios } from './api';

interface AvatarsRequest {
  checkNickname: {
    nickname: string;
  };
  changeNickname: {
    nickname: string;
  };
}

interface AvatarsResponse {
  checkNickname: ReturnAxios<CheckNickname>;
  changeNickname: ReturnAxios<ChangeNickname>;
}

export type CheckNickname = {
  message: string;
  valid: boolean;
};

export type ChangeNickname = {
  message: string;
  valid: boolean;
};

export const Avatars = {
  /**
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/02.%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85/isValidNickname
   */
  checkNickname: (request: AvatarsRequest['checkNickname']): AvatarsResponse['checkNickname'] => {
    return requests.get(`/avatars/nickname/valid`, {
      params: request,
    });
  },
  /**
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/02.%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85/changeNickname
   */
  changeNickname: (request: AvatarsRequest['changeNickname']): AvatarsResponse['changeNickname'] => {
    return requests.patch(`/avatars/nickname`, request);
  },
};
