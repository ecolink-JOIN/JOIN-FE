import React from 'react';
import Typography from '@/components/atoms/Typography';
import { ActivityIndicator } from 'react-native';
import { ManageView, ManageBoxView, shadowStyles } from '@/components/molecules/MyMolecules/ManageView';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import { useLocalSearchParams } from 'expo-router';
import { MeetingsService } from '@/apis';
import { useQuery } from '@tanstack/react-query';

// MeetingStatus를 한글로 변환
const getStatusLabel = (status: MeetingsResponse.MeetingStatus): string => {
  switch (status) {
    case 'COMPLETED':
      return '완료';
    case 'ACTIVE':
      return '진행중';
    case 'WAITING':
      return '대기';
    case 'NOT_STARTED':
      return '시작 안 함';
    default:
      return '알 수 없음';
  }
};

// 날짜 포맷팅 (YYYY-MM-DD -> YYYY.MM.DD)
const formatDate = (dateStr: string): string => {
  return dateStr.replace(/-/g, '.');
};

const RoundCheck = () => {
  const { token } = useLocalSearchParams<{ token: string }>();

  const {
    data: meetings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['meetings', token],
    queryFn: () => MeetingsService().getMeetings(token),
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <ManageView>
        <Typography variant="heading3">스터디 회차 확인</Typography>
        <ListView style={shadowStyles.shadow}>
          <ActivityIndicator size="large" color={colors.primary} />
        </ListView>
      </ManageView>
    );
  }

  if (error) {
    return (
      <ManageView>
        <Typography variant="heading3">스터디 회차 확인</Typography>
        <ListView style={shadowStyles.shadow}>
          <Typography variant="body3" style={{ color: colors.gray[9], textAlign: 'center' }}>
            회차 정보를 불러오는 중 오류가 발생했습니다.
          </Typography>
        </ListView>
      </ManageView>
    );
  }

  if (!meetings || meetings.length === 0) {
    return (
      <ManageView>
        <Typography variant="heading3">스터디 회차 확인</Typography>
        <ListView style={shadowStyles.shadow}>
          <Typography variant="body3" style={{ color: colors.gray[9], textAlign: 'center' }}>
            등록된 회차가 없습니다.
          </Typography>
        </ListView>
      </ManageView>
    );
  }

  return (
    <ManageView>
      <Typography variant="heading3">스터디 회차 확인</Typography>
      <ListView style={shadowStyles.shadow}>
        {meetings.map((meeting: MeetingsResponse.Meeting) => (
          <RoundBox key={meeting.id}>
            <RoundNumber variant="body3">{meeting.meetingNo}회차</RoundNumber>
            <RoundStatus variant="body3" status={getStatusLabel(meeting.status)} date>
              {formatDate(meeting.studyDate)}
            </RoundStatus>
            <RoundStatus variant="body3" status={getStatusLabel(meeting.status)}>
              {getStatusLabel(meeting.status)}
            </RoundStatus>
          </RoundBox>
        ))}
      </ListView>
    </ManageView>
  );
};

export default RoundCheck;

const ListView = styled(ManageBoxView)`
  gap: 14px;
  padding: 24px 20px;
`;

const RoundBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

const RoundNumber = styled(Typography)`
  flex: 1;
  color: ${colors.primary};
`;

const RoundStatus = styled(Typography)<{ status: string; date?: boolean }>`
  flex: 1;
  text-align: ${(props) => (props.date ? 'center' : 'right')};
  color: ${(props) => (props.status === '제외' ? '#D32625' : props.status === '추가 회차' ? '#2E90FA' : colors.black)};
`;
