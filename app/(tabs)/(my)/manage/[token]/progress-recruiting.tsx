import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ManageView, ManageBox, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { Status, ApplicationApproval } from '@/components/organisms/MyPage/Manage';
const ProgressWraper = () => {
  const { token } = useLocalSearchParams<{ token: string }>();

  return (
    <ManageView>
      <Typography variant="heading3">진행 관리</Typography>
      <ManageBox title="진행 현황">
        <Status value={false} />
        <ListComponent title="모집 글 바로가기" href={`/study/${token}`} />
      </ManageBox>
      <ManageBox title="신청 현황">
        <ApplicationApproval />
      </ManageBox>
    </ManageView>
  );
};

export default ProgressWraper;
