import { useQuery } from '@tanstack/react-query';
import { StudyEnrollmentsService } from '@/apis/service/study-enrollments';

/**
 * 스터디 멤버 목록 조회 Hook
 * @param studyToken - 스터디 토큰
 * @param enabled - 쿼리 활성화 여부 (기본값: true)
 */
export const useStudyMembers = (studyToken: string, enabled = true) => {
  return useQuery({
    queryKey: ['study-members', studyToken],
    queryFn: () => StudyEnrollmentsService().getStudyEnrollments(studyToken),
    enabled: enabled && !!studyToken,
    staleTime: 1000 * 60 * 5, // 5분
  });
};

/**
 * 스터디원 참여 상세 정보 조회 Hook
 * @param studyToken - 스터디 토큰
 * @param targetToken - 대상 아바타 토큰
 * @param enabled - 쿼리 활성화 여부 (기본값: true)
 */
export const useMemberAttendance = (studyToken: string, targetToken: string, enabled = true) => {
  return useQuery({
    queryKey: ['member-attendance', studyToken, targetToken],
    queryFn: () => StudyEnrollmentsService().getMemberAttendance(studyToken, targetToken),
    enabled: enabled && !!studyToken && !!targetToken,
    staleTime: 1000 * 60, // 1분
  });
};
