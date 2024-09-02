import React from 'react';
import { useForm } from 'react-hook-form';
import ReportTemplate from '@/components/templates/ReportTemplate';
import Button from '@/components/atoms/Button';
import ReportContent from '@/components/organisms/ReportContent';

function ReportAuthorScreen() {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      inputValue: '',
    },
  });

  const inputValue = watch('inputValue');

  const onSubmit = () => {
    alert('신고가 완료도 ㅣㅇ');
  };

  return (
    <ReportTemplate title="사용자를 신고하는 이유를 선택해주세요.">
      <ReportContent
        control={control}
        inputValue={inputValue}
        maxLength={300}
        infoText="게시글 작성자를 신고하는 이유를 알려주세요."
      />
      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={inputValue.length === 0}
        variant="contained"
        fullWidth
        size="large"
      >
        신고하기
      </Button>
    </ReportTemplate>
  );
}

export default ReportAuthorScreen;
