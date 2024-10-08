import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import Typography from '@/components/atoms/Typography';
import { ManageView, ManageBox, ListComponent } from '@/components/molecules/MyMolecules/ManageView';

const Leave = () => {
  const { id } = useLocalSearchParams();

  return (
    <ManageView>
      <Typography variant="heading3">스터디 탈퇴</Typography>

      <ManageBox>
        <ListComponent title="스터디장에게 탈퇴 승인받기" href={`/member/${id}/leave/request`} />
      </ManageBox>
      <ManageBox>
        <ListComponent title="임의 탈퇴하기" href={`/member/${id}/leave/immediate`} />
      </ManageBox>
    </ManageView>
  );
};

export default Leave;
