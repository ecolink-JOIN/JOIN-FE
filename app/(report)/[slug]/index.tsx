import React from 'react';
import ReportTemplate from '@/components/templates/ReportTemplate';
import Divider from '@/components/atoms/Divider';
import ReportOption from '@/components/molecules/ReportOption';
import { colors } from '@/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';

function ReportScreen() {
  const params = useLocalSearchParams<{ slug: string }>();
  const router = useRouter();

  return (
    <ReportTemplate title="게시글을 신고하는 이유를 선택해주세요.">
      <ReportOption
        text="스터디 모집 게시글이 아니에요"
        onPress={() => {
          router.push(`/(report)/${params.slug}/post?type=STUDY_CONTENT`);
        }}
      />
      <Divider style={{ height: 2 }} />
      <ReportOption
        text="스터디 가입 과정에서 문제가 발생했어요"
        onPress={() => {
          router.push(`/(report)/${params.slug}/post?type=ENROLLMENT_PROCESS`);
        }}
      />
      <Divider style={{ height: 2 }} />
      <ReportOption
        text="사기인 것 같아요"
        onPress={() => {
          router.push(`/(report)/${params.slug}/post?type=SCAM`);
        }}
      />
      <Divider style={{ height: 2 }} />
      <ReportOption
        text="기타 부적절한 행위가 있어요"
        onPress={() => {
          router.push(`/(report)/${params.slug}/post?type=MISCONDUCT`);
        }}
      />
      <Divider style={{ height: 2 }} />
      <ReportOption
        text="작성자 신고하기"
        color={colors.red[6]}
        onPress={() => {
          router.push(`/(report)/${params.slug}/post?type=WRITER`);
        }}
      />
    </ReportTemplate>
  );
}

export default ReportScreen;
