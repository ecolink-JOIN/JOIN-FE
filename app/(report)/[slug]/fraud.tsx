import React from 'react';
import { useForm } from 'react-hook-form';
import ReportTemplate from '@/components/templates/ReportTemplate';
import Button from '@/components/atoms/Button';
import ReportContent from '@/components/organisms/ReportContent';

function ReportFraudScreen() {
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
    <ReportTemplate title="사기인 것 같아요.">
      <ReportContent
        control={control}
        inputValue={inputValue}
        maxLength={300}
        infoText="스터디 모집이 아닌 사기의 위험이 있는 게시글의 경우 신고해요."
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

export default ReportFraudScreen;
