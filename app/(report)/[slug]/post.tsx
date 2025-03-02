import React from 'react';
import { useForm } from 'react-hook-form';
import ReportTemplate from '@/components/templates/ReportTemplate';
import Button from '@/components/atoms/Button';
import ReportContent from '@/components/organisms/ReportContent';
import { ReportService } from '@/apis';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

const TitleContentMap: Record<ReportType, { title: string; content: string }> = {
  STUDY_CONTENT: {
    title: '스터디 모집 게시글이 아니에요.',
    content: '스터디 모집 목적이 아닌 타 목적의 게시글의 경우 신고해요.',
  },
  ENROLLMENT_PROCESS: {
    title: '스터디 가입 과정에서 문제가 발생했어요.',
    content: '스터디 가입 과정에서 문제가 발생한 경우 신고해요.',
  },
  SCAM: { title: '사기인 것 같아요.', content: '스터디 모집이 아닌 사기의 위험이 있는 게시글의 경우 신고해요.' },
  MISCONDUCT: { title: '기타 부적절한 행위가 있어요.', content: '기타 부적절한 행위가 있어요.' },
  WRITER: { title: '사용자를 신고하는 이유를 선택해주세요.', content: '게시글 작성자를 신고하는 이유를 알려주세요.' },
};

function ReportPostScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ slug: string; type: ReportType }>();
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      inputValue: '',
    },
  });

  const showToast = (text1: string, text2: string) => {
    Toast.show({
      type: 'success',
      text1,
      text2,
    });
  };

  const onSubmit = () => {
    ReportService()
      .postReport({
        report_type: params.type,
        reason: watch('inputValue'),
        study_token: params.slug,
      })
      .then(() => {
        showToast('신고가 완료되었습니다.', '홈 화면으로 이동합니다.');
        router.replace('/(tabs)');
      })
      .catch(() => {
        router.back();
      });
  };

  return (
    <ReportTemplate title={TitleContentMap[params.type].title}>
      <ReportContent control={control} maxLength={300} infoText={TitleContentMap[params.type].content} />
      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={watch('inputValue').length < 10 || watch('inputValue').length > 300}
        variant="contained"
        fullWidth
        size="large"
      >
        신고하기
      </Button>
    </ReportTemplate>
  );
}

export default ReportPostScreen;
