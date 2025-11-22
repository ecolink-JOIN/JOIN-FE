import React from 'react';
import Typography from '@/components/atoms/Typography';
import { FlatList, Image, View, ActivityIndicator } from 'react-native';
import { ManageView, ManageBoxView, shadowStyles } from '@/components/molecules/MyMolecules/ManageView';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import { useLocalSearchParams } from 'expo-router';
import { InfoViewBox } from '@/components/molecules/MyMolecules/InfoView';
import { useQuery } from '@tanstack/react-query';
import { StudyEnrollmentsService } from '@/apis';
import { useUserStore } from '@/store';
import { useAvatarDetail } from '@/hooks/useAvatar';

const RoundCheck: React.FC<{ id: string | string[] | undefined }> = ({ id }) => {
  const studyToken = typeof id === 'string' ? id : '';
  const { avatarToken } = useUserStore();

  // 멤버 상세 정보 조회 (출석률, 인증률) - useAvatarDetail hook 사용
  const { data: memberDetail, isLoading: isLoadingDetail } = useAvatarDetail(avatarToken || '', !!avatarToken);

  // 출석 및 인증 현황 조회
  const { data: attendance, isLoading: isLoadingAttendance } = useQuery({
    queryKey: ['memberAttendance', studyToken, avatarToken],
    queryFn: async () => {
      if (!avatarToken) throw new Error('avatarToken이 없습니다');
      return StudyEnrollmentsService().getMemberAttendance(studyToken, avatarToken);
    },
    enabled: !!studyToken && !!avatarToken,
  });

  const isLoading = isLoadingDetail || isLoadingAttendance;

  // avatarToken이 없는 경우
  if (!avatarToken) {
    return (
      <ManageView>
        <Typography variant="heading3">나의 출석 및 인증 현황</Typography>
        <View style={{ padding: 40, alignItems: 'center' }}>
          <Typography variant="body3" style={{ color: colors.gray[7], textAlign: 'center' }}>
            로그인 정보를 불러올 수 없습니다.{'\n'}다시 로그인해주세요.
          </Typography>
        </View>
      </ManageView>
    );
  }

  if (isLoading) {
    return (
      <ManageView>
        <Typography variant="heading3">나의 출석 및 인증 현황</Typography>
        <View style={{ padding: 40, alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Typography variant="body3" style={{ marginTop: 16, color: colors.gray[7] }}>
            로딩 중...
          </Typography>
        </View>
      </ManageView>
    );
  }

  if (!memberDetail || !attendance) {
    return (
      <ManageView>
        <Typography variant="heading3">나의 출석 및 인증 현황</Typography>
        <View style={{ padding: 40, alignItems: 'center' }}>
          <Typography variant="body3" style={{ color: colors.gray[7] }}>
            출석 정보를 불러올 수 없습니다.
          </Typography>
        </View>
      </ManageView>
    );
  }

  // 출석 상태 한글 변환
  const getAttendanceLabel = (status: 'PRESENT' | 'LATENESS' | 'ABSENT'): string => {
    switch (status) {
      case 'PRESENT':
        return '출석';
      case 'LATENESS':
        return '지각';
      case 'ABSENT':
        return '결석';
    }
  };

  // 날짜 포맷팅
  const formatDate = (date: Date): string => {
    const d = new Date(date);
    return d.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.');
  };

  // 회차 정보를 날짜 순으로 정렬 (과거 → 현재 순)
  const sortedMeetings = [...(attendance.meetingAttendanceStatus || [])].sort((a, b) => {
    const dateA = new Date(a.studyDate).getTime();
    const dateB = new Date(b.studyDate).getTime();
    return dateA - dateB;
  });

  return (
    <ManageView>
      <Typography variant="heading3">나의 출석 및 인증 현황</Typography>
      <ListView style={shadowStyles.shadow}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            marginBottom: 10,
          }}
        >
          <Image
            source={memberDetail.profileUrl ? { uri: memberDetail.profileUrl } : require('@/assets/images/profile.png')}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}
          />
          <Typography variant="heading4">{memberDetail.nickname}</Typography>

          <InfoViewBox
            center
            InfoList={[
              { title: '출석률', value: `${memberDetail.averageAttendanceRate.toFixed(0)}%` },
              { title: '인증률', value: `${memberDetail.averageProofRate.toFixed(0)}%` },
            ]}
          />
        </View>
        {sortedMeetings.map((item, index) => (
          <RoundBox key={`${item.meetingNo}-${index}`}>
            <RoundNumber variant="body3">{item.meetingNo}회차</RoundNumber>
            <RoundStatus variant="body3" status={item.attendanceStatus} date>
              {formatDate(item.studyDate)}
            </RoundStatus>
            <RoundStatus variant="body3" status={item.attendanceStatus}>
              {getAttendanceLabel(item.attendanceStatus)}
            </RoundStatus>
            <RoundStatus variant="body3" status={item.hasApproveProof ? 'PRESENT' : 'ABSENT'}>
              {item.hasApproveProof ? '인증' : '미인증'}
            </RoundStatus>
          </RoundBox>
        ))}
      </ListView>
    </ManageView>
  );
};

const RoundCheckWrapper = () => {
  const { id } = useLocalSearchParams();
  return <FlatList data={[null]} renderItem={() => <RoundCheck id={id} />} />;
};

export default RoundCheckWrapper;

const ListView = styled(ManageBoxView)`
  gap: 14px;
  padding: 24px 20px;
`;

const RoundBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const RoundNumber = styled(Typography)`
  flex: 1;
  color: ${colors.primary};
`;

const RoundStatus = styled(Typography)<{ status: string; date?: boolean }>`
  flex: 1;
  text-align: ${(props) => (props.date ? 'center' : 'right')};
  color: ${(props) => (props.status === '지각' ? '#D32625' : props.status === '추가 회차' ? '#2E90FA' : colors.black)};
`;
