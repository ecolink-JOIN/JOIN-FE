import React, { useState } from 'react';
import { Alert, View, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ManageBox } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { colors } from '@/theme';
import { useSubmitEvaluation } from '@/hooks/useEvaluation';
import { InfoViewBox } from '@/components/molecules/MyMolecules/InfoView';
import Evaluator from '@/components/molecules/Evaluator';
import { useQuery } from '@tanstack/react-query';
import { StudyEnrollmentsService } from '@/apis';

export default function EvaluationPage() {
  const router = useRouter();
  const { avartarToken, token, nickname } = useLocalSearchParams<{
    avartarToken: string;
    token: string;
    nickname: string;
  }>();

  const [selectedScores, setSelectedScores] = useState<{
    sincerity: number | null;
    familiarity: number | null;
    effect: number | null;
  }>({
    sincerity: null,
    familiarity: null,
    effect: null,
  });

  const submitEvaluation = useSubmitEvaluation();

  // 스터디원 상세 정보 조회
  const { data: memberDetail } = useQuery({
    queryKey: ['member', avartarToken],
    queryFn: () => StudyEnrollmentsService().getMemberDetail(avartarToken),
    enabled: !!avartarToken,
  });

  const handleScoreChange = (key: 'sincerity' | 'familiarity' | 'effect', score: number) => {
    setSelectedScores((prev) => ({
      ...prev,
      [key]: score,
    }));
  };

  const isValid =
    selectedScores.sincerity !== null && selectedScores.familiarity !== null && selectedScores.effect !== null;

  const handleSubmit = () => {
    if (!isValid) {
      Alert.alert('알림', '모든 평가 항목을 선택해주세요.');
      return;
    }

    Alert.alert('평가 제출', '평가를 제출하시겠습니까? 제출 후에는 수정할 수 없습니다.', [
      { text: '취소', style: 'cancel' },
      {
        text: '제출',
        onPress: () => {
          submitEvaluation.mutate(
            {
              studyToken: token,
              rateeToken: avartarToken,
              sincerity: selectedScores.sincerity!,
              familiarity: selectedScores.familiarity!,
              effect: selectedScores.effect!,
            },
            {
              onSuccess: () => {
                router.back();
              },
            },
          );
        },
      },
    ]);
  };

  const evaluations = [
    {
      key: 'sincerity' as const,
      badgeValue: '성실도',
      question: '스터디원은 얼마나 성실하게 스터디에 임했나요?',
    },
    {
      key: 'familiarity' as const,
      badgeValue: '프로그램 숙지도',
      question: '스터디원은 스터디 프로그램을 잘 숙지하고 있었나요?',
    },
    {
      key: 'effect' as const,
      badgeValue: '학습 분위기 영향',
      question: '스터디원은 학습 분위기에 긍정적인 영향을 주었나요?',
    },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.gray['2'] }} showsVerticalScrollIndicator={false}>
      <View style={{ padding: 25, paddingHorizontal: 20, gap: 20 }}>
        <Typography variant="heading3">스터디원 평가</Typography>
        <ManageBox>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              paddingTop: 24,
              paddingBottom: 20,
            }}
          >
            <Image
              source={
                memberDetail?.profileUrl ? { uri: memberDetail.profileUrl } : require('@/assets/images/profile.png')
              }
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
              }}
            />
            <Typography variant="heading4">{nickname || memberDetail?.nickname}</Typography>

            {memberDetail && (
              <InfoViewBox
                center
                InfoList={[
                  { title: '출석률', value: `${memberDetail.averageAttendanceRate}%` },
                  { title: '인증률', value: `${memberDetail.averageProofRate}%` },
                ]}
              />
            )}

            {evaluations.map((evalItem) => (
              <Evaluator
                key={evalItem.key}
                badgeValue={evalItem.badgeValue}
                question={evalItem.question}
                selectedValue={selectedScores[evalItem.key]}
                onValueChange={(score: number) => handleScoreChange(evalItem.key, score)}
              />
            ))}

            <View
              style={{
                width: '100%',
                padding: 16,
                gap: 12,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.gray['1'],
                  padding: 16,
                  borderRadius: 8,
                  gap: 8,
                }}
              >
                <Typography variant="caption1" style={{ color: colors.gray['7'] }}>
                  • 평가는 수정할 수 없습니다
                </Typography>
                <Typography variant="caption1" style={{ color: colors.gray['7'] }}>
                  • 평가 내용은 상대방에게 공개되지 않습니다
                </Typography>
              </View>

              <Button variant="contained" onPress={handleSubmit} disabled={!isValid || submitEvaluation.isPending}>
                {submitEvaluation.isPending ? '제출 중...' : '평가 제출'}
              </Button>
            </View>
          </View>
        </ManageBox>
      </View>
    </ScrollView>
  );
}
