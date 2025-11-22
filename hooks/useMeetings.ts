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
      // 날짜와 시간을 기준으로 정렬 (과거 → 미래 순)
      return data.sort((a, b) => {
        const dateTimeA = new Date(`${a.studyDate}T${a.stTime}`).getTime();
        const dateTimeB = new Date(`${b.studyDate}T${b.stTime}`).getTime();
        return dateTimeA - dateTimeB;
      });
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
