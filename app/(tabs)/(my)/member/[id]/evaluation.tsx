import React from 'react';
import { ManageView, ManageBox } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { StudyEvaluation } from '@/components/organisms/MyPage/Manage';

const Evaluation = () => {
  return (
    <ManageView>
      <Typography variant="heading3">스터디원 평가</Typography>
      <ManageBox title="스터디원 평가">
        <StudyEvaluation />
      </ManageBox>
    </ManageView>
  );
};

export default Evaluation;
