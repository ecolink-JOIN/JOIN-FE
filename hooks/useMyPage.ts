import { useQuery } from '@tanstack/react-query';
import { MyPageService } from '@/apis/service/my-page';

/**
 * 내 정보 조회 Hook
 */
export const useMyPage = () => {
  return useQuery({
    queryKey: ['myPage'],
    queryFn: () => MyPageService().getMyPage(),
  });
};

/**
 * 내가 운영중인 스터디 목록 조회 Hook
 */
export const useMyManageStudies = () => {
  return useQuery({
    queryKey: ['myManageStudies'],
    queryFn: () => MyPageService().getManageStudy(),
  });
};

/**
 * 내가 참여중인 스터디 목록 조회 Hook
 */
export const useMyJoinedStudies = () => {
  return useQuery({
    queryKey: ['myJoinedStudies'],
    queryFn: () => MyPageService().getJoinStudy(),
  });
};

/**
 * 내 관심 스터디 목록 조회 Hook
 */
export const useMyInterestStudies = () => {
  return useQuery({
    queryKey: ['myInterestStudies'],
    queryFn: () => MyPageService().getInterestStudy(),
  });
};
