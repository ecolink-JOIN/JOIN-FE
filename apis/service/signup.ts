import { API } from '@/apis/axios';
import FormData from 'form-data';

export const AvatarsService = () => {
  const url = '/avatars';

  /**
   * 유저 정보 조회 API - 인증 필요
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/02.%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85/getAvatarInfo
   */
  const base = async () => {
    return (await API.get(url)) as Avatars.BaseDto;
  };

  /**
   * 프로필 사진 변경 - 인증 필요, request 부분을 application/json 으로 설정해서 요청을 보내주세요.
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/02.%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85/changePhoto
   */
  const photos = async (body: FormData) => {
    const req = (await API.post(`${url}/photos`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: (formData) => formData,
    })) as Shared.HttpRequest;
    return req.data;
  };

  /**
   * 닉네임 변경 API - 인증 필요
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/02.%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85/changeNickname
   */
  const nickname = async (nickname: string) => {
    const req = (await API.post(`${url}/nickname`, { nickname })) as Avatars.NicknameDto;
    return req.data;
  };

  /**
   * 닉네임 유효성 검사 API
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/02.%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85/isValidNickname
   */
  const nicknameValid = async (nickname: string) => {
    const req = (await API.get(`${url}/nickname/valid`, { params: { nickname } })) as Avatars.NicknameDto;
    return req.data;
  };

  return { base, photos, nickname, nicknameValid };
};

export const TermsService = () => {
  const url = '/terms';
  /**
   * 약관 조회 API - 현재 유저의 동의가 필요한 약관을 조회하는 API입니다.
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/02.%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85/getRequiredConsentTerms
   */
  const Base = async () => {
    const req = (await API.get(url)) as Terms.BaseDto;
    return req.data;
  };

  /**
   * 약관 동의 API - 약관 동의를 진행하는 API입니다.
   * @api-doc:  http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/02.%20%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85/agreeTerms
   */
  const agree = async (body: Terms.AgreeRequest) => {
    // return (await API.post(`${url}/agree`, data)) as AxiosResponse<{ result: null }>;
    const req = (await API.post(`${url}/agree`, body)) as Shared.HttpRequest;
    return req.data;
  };

  return { Base, agree };
};
