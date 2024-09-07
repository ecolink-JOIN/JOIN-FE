import React from 'react';
import { useForm } from 'react-hook-form';
import ReportTemplate from '@/components/templates/ReportTemplate';
import Button from '@/components/atoms/Button';
import ReportContent from '@/components/organisms/ReportContent';

function ReportOtherScreen() {
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
    <ReportTemplate title="기타 부적절한 행위가 있어요.">
      <ReportContent
        control={control}
        inputValue={inputValue}
        maxLength={300}
        infoText="스터디 게시글 혹은 모집 과정에서 부적절한 행위가 있었던 경우 신고해요."
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

export default ReportOtherScreen;
