import { API } from '@/apis/axios';

export const UserService = () => {
  /**
   * 유저 정보 조회 API - 인증 필요
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/01.%20%EC%9C%A0%EC%A0%80/getUserInfo
   */
  const myPage = async () => {
    const req = (await API.get('/my-page')) as UserResponse.MyPage;
    return req.data;
  };

  /**
   * 유저 정보 조회 API - 인증 필요
   * @api-doc: http://ec2-3-38-27-246.ap-northeast-2.compute.amazonaws.com/swagger-ui/index.html#/04.%20%EC%9C%A0%EC%A0%80/getAvatarInfo
   */
  const avatars = async () => {
    const req = (await API.get('/avatars')) as UserResponse.Avatars;
    return req.data;
  };

  return { myPage, avatars };
};
