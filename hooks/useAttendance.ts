import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AttendanceService } from '@/apis/service/attendance';
import Toast from 'react-native-toast-message';

/**
 * 출석 내역 조회 Hook
 */
export const useAttendance = (studyToken: string, meetingNo: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['attendance', studyToken, meetingNo],
    queryFn: () => AttendanceService().getAttendance(studyToken, meetingNo),
    enabled: enabled && !!studyToken && !!meetingNo,
  });
};

/**
 * 출석 체크 Hook
 */
export const usePostAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studyToken, meetingNo, now }: { studyToken: string; meetingNo: number; now: string }) =>
      AttendanceService().postAttendance(studyToken, meetingNo, { now }),
    onSuccess: (_, variables) => {
      // 출석 데이터 갱신
      queryClient.invalidateQueries({
        queryKey: ['attendance', variables.studyToken, variables.meetingNo],
      });
      Toast.show({
        type: 'success',
        text1: '출석 완료',
        text2: '출석이 성공적으로 등록되었습니다.',
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: '출석 실패',
        text2: error.response?.data?.message || '출석 등록에 실패했습니다.',
      });
    },
  });
};

/**
 * 출석 수정 Hook (관리자용)
 */
export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      studyToken,
      meetingNo,
      attendanceId,
      targetAvatarToken,
      status,
    }: {
      studyToken: string;
      meetingNo: number;
      attendanceId: number;
      targetAvatarToken: string;
      status: 'PRESENT' | 'LATENESS' | 'ABSENT';
    }) =>
      AttendanceService().updateAttendance(studyToken, meetingNo, attendanceId, {
        targetAvatarToken,
        status,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['attendance', variables.studyToken, variables.meetingNo],
      });
      Toast.show({
        type: 'success',
        text1: '출석 수정 완료',
        text2: '출석 상태가 수정되었습니다.',
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: '출석 수정 실패',
        text2: error.response?.data?.message || '출석 수정에 실패했습니다.',
      });
    },
  });
};
