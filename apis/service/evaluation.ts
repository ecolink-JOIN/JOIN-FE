import { API } from '@/apis/axios';

export const EvaluationService = () => {
  /**
   * 스터디원 평가 API - 인증 필수
   * @api-doc: POST /api/v1/evaluation
   * @param studyToken - 스터디 토큰
   * @param rateeToken - 평가 대상자 토큰
   * @param sincerity - 성실도 (1-5)
   * @param familiarity - 프로그램 숙지도 (1-5)
   * @param effect - 학습 분위기 영향 (1-5)
   */
  const submitEvaluation = async (data: {
    studyToken: string;
    rateeToken: string;
    sincerity: number;
    familiarity: number;
    effect: number;
  }) => {
    const req = (await API.post('/evaluation', data)) as Shared.HttpResponse;
    return req.data;
  };

  return { submitEvaluation };
};
