import * as FileSystem from 'expo-file-system';
import requests, { ReturnAxios } from './api';

interface AvatarsRequest {
  checkNickname: {
    nickname: string;
  };
  changeNickname: {
    nickname: string;
  };
  changeProfileImage: {
    file?: string;
    request: {
      defaultPhoto: boolean;
    };
  };
}

interface AvatarsResponse {
  checkNickname: ReturnAxios<CheckNickname>;
  changeNickname: ReturnAxios<ChangeNickname>;
  changeProfileImage: ReturnAxios<ChangeProfileImage>;
}

export type CheckNickname = {
  message: string;
  valid: boolean;
};

export type ChangeNickname = {
  message: string;
  valid: boolean;
};

export type ChangeProfileImage = {};

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
  /**
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/02.%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85/changePhoto
   */
  changeProfileImage: async (request: AvatarsRequest['changeProfileImage']) => {
    const formData = new FormData();
    let fileBuffer;

    if (typeof request.file === 'string' && request.file.startsWith('file://')) {
      try {
        const fileUri = request.file;

        // fs
        const fileInfo = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64, // Base64로 파일을 읽어오기
        });

        // base64 to binary
        const byteCharacters = atob(fileInfo);
        const byteArrays = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteArrays[i] = byteCharacters.charCodeAt(i);
        }
        fileBuffer = byteArrays;

        formData.append('file', new Blob([fileBuffer]));
      } catch (error) {
        console.error('파일을 읽는 중 오류 발생:', error);
        throw error;
      }
    }

    formData.append('defaultPhoto', String(request.request.defaultPhoto));

    return requests.post('/avatars/photos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
