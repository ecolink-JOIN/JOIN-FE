import { useQuery } from '@tanstack/react-query';
import { MeetingsService } from '@/apis/service/meetings';

/**
 * 회차 목록 조회 Hook
 */
export const useMeetings = (studyToken: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['meetings', studyToken],
    queryFn: () => MeetingsService().getMeetings(studyToken),
    enabled: enabled && !!studyToken,
    select: (data) => {
      // 회차 번호 기준 정렬
      return data.sort((a, b) => a.meetingNo - b.meetingNo);
    },
  });
};

/**
 * 현재 진행중인 회차 찾기
 */
export const useCurrentMeeting = (studyToken: string) => {
  const { data: meetings, ...rest } = useMeetings(studyToken);

  const currentMeeting = meetings?.find((meeting) => meeting.status === 'ACTIVE');

  return {
    ...rest,
    data: meetings,
    currentMeeting,
  };
};

/**
 * 다음 예정 회차 찾기
 */
export const useNextMeeting = (studyToken: string) => {
  const { data: meetings, ...rest } = useMeetings(studyToken);

  const nextMeeting = meetings?.find((meeting) => meeting.status === 'WAITING');

  return {
    ...rest,
    data: meetings,
    nextMeeting,
  };
};
