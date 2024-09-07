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
          router.push(`/(report)/${params.slug}/post`);
        }}
      />
      <Divider style={{ height: 2 }} />
      <ReportOption
        text="스터디 가입 과정에서 문제가 발생했어요"
        onPress={() => {
          router.push(`/(report)/${params.slug}/join`);
        }}
      />
      <Divider style={{ height: 2 }} />
      <ReportOption
        text="사기인 것 같아요"
        onPress={() => {
          router.push(`/(report)/${params.slug}/fraud`);
        }}
      />
      <Divider style={{ height: 2 }} />
      <ReportOption
        text="기타 부적절한 행위가 있어요"
        onPress={() => {
          router.push(`/(report)/${params.slug}/other`);
        }}
      />
      <Divider style={{ height: 2 }} />
      <ReportOption
        text="작성자 신고하기"
        color={colors.red[6]}
        onPress={() => {
          router.push(`/(report)/${params.slug}/author`);
        }}
      />
    </ReportTemplate>
  );
}

export default ReportScreen;
