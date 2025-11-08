import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ProofService } from '@/apis/service/proof';
import Toast from 'react-native-toast-message';

/**
 * 인증 조회 Hook
 */
export const useProof = (studyToken: string, meetingNo: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['proof', studyToken, meetingNo],
    queryFn: () => ProofService().getProof(studyToken, meetingNo),
    enabled: enabled && !!studyToken && !!meetingNo,
  });
};

/**
 * 인증 목록 조회 Hook (관리자용)
 */
export const useProofList = (studyToken: string, meetingNo: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['proofList', studyToken, meetingNo],
    queryFn: () => ProofService().getProofList(studyToken, meetingNo),
    enabled: enabled && !!studyToken && !!meetingNo,
  });
};

/**
 * 인증 등록 Hook
 */
export const usePostProof = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: {
      studyToken: string;
      meetingNo: number;
      proofType: ProofResponse.ProofType;
      proofPhotoUrl: string;
      provenDate: string;
    }) =>
      ProofService().postProof(params.studyToken, params.meetingNo, {
        proofType: params.proofType,
        proofPhotoUrl: params.proofPhotoUrl,
        provenDate: params.provenDate,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['proof', variables.studyToken, variables.meetingNo],
      });
      queryClient.invalidateQueries({
        queryKey: ['proofList', variables.studyToken, variables.meetingNo],
      });
      Toast.show({
        type: 'success',
        text1: '인증 완료',
        text2: '인증이 성공적으로 등록되었습니다.',
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: '인증 실패',
        text2: error.response?.data?.message || '인증 등록에 실패했습니다.',
      });
    },
  });
};

/**
 * 인증 승인 Hook (관리자용)
 */
export const useApproveProof = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { studyToken: string; meetingNo: number; proofId: number }) =>
      ProofService().approveProof(params.studyToken, params.meetingNo, params.proofId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['proofList', variables.studyToken, variables.meetingNo],
      });
      Toast.show({
        type: 'success',
        text1: '인증 승인',
        text2: '인증이 승인되었습니다.',
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: '승인 실패',
        text2: error.response?.data?.message || '인증 승인에 실패했습니다.',
      });
    },
  });
};

/**
 * 인증 반려 Hook (관리자용)
 */
export const useRejectProof = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: { studyToken: string; meetingNo: number; proofId: number }) =>
      ProofService().rejectProof(params.studyToken, params.meetingNo, params.proofId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['proofList', variables.studyToken, variables.meetingNo],
      });
      Toast.show({
        type: 'success',
        text1: '인증 반려',
        text2: '인증이 반려되었습니다.',
      });
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: '반려 실패',
        text2: error.response?.data?.message || '인증 반려에 실패했습니다.',
      });
    },
  });
};
