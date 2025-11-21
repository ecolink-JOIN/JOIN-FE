import React from 'react';
import { ManageView, ManageBox } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';

// TODO: 백엔드 API 추가 필요
// API Endpoint: GET /api/v1/study/{studyToken}/notice
// Request: { studyToken: string }
// Response: { noticeId: number, content: string, createdAt: string }
// Priority: 낮음
// Description: 스터디 공지를 조회하는 API (현재는 POST만 존재)
// Note: Manage.tsx의 StudyAnnouncement 컴포넌트와 동일한 이슈
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
