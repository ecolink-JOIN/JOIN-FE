import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EvaluationService } from '@/apis';
import { Alert } from 'react-native';

/**
 * 스터디원 평가 제출
 */
export const useSubmitEvaluation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      studyToken: string;
      rateeToken: string;
      sincerity: number;
      familiarity: number;
      effect: number;
    }) => {
      return await EvaluationService().submitEvaluation(data);
    },
    onSuccess: () => {
      Alert.alert('평가 완료', '평가가 성공적으로 제출되었습니다.');
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['studyEnrollments'] });
      queryClient.invalidateQueries({ queryKey: ['member'] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || '평가 제출에 실패했습니다.';
      if (errorMessage.includes('이미 평가한')) {
        Alert.alert('알림', '이미 평가를 완료한 스터디원입니다.');
      } else {
        Alert.alert('평가 실패', errorMessage);
      }
    },
  });
};
