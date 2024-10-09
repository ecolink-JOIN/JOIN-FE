import React from 'react';
import { ManageView, ManageBox } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';

const Notice = () => {
  return (
    <ManageView>
      <Typography variant="heading3">스터디 공지</Typography>
      <ManageBox>
        <Typography variant="button">
          {`오늘은 지난주에 공지드렸듯이\n쉬어가도록 하겠습니다~\n모두 컨디션 회복하시고 목요일에 뵈어요!\n* 다음 시간까지 29페이지까지 예습해오시면 됩니다1234123`}
        </Typography>
      </ManageBox>
    </ManageView>
  );
};

export default Notice;
