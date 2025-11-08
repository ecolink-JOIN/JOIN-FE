import { ActivityIndicator, ScrollView, View } from 'react-native';
import { ManageBoxView, ManageView, shadowStyles } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import Button from '@/components/atoms/Button';
import { useMyJoinedStudies } from '@/hooks/useMyPage';
import { useCurrentMeeting, useNextMeeting } from '@/hooks/useMeetings';
import { useState } from 'react';
import AttendanceModal from '@/components/molecules/AttendanceModal';
import ProofModal from '@/components/molecules/ProofModal';
import { usePostAttendance } from '@/hooks/useAttendance';
import { usePostProof } from '@/hooks/useProof';
import { getCurrentISOString } from '@/utils/dateFormatter';
import { Alert } from 'react-native';

function CertifiedScreen() {
  // 참여 중인 스터디 목록 조회
  const { data: studiesData, isLoading: isStudiesLoading } = useMyJoinedStudies();

  // 첫 번째 진행중인 스터디 선택 (실제로는 사용자가 선택할 수 있도록 해야 함)
  const currentStudy = studiesData?.joinStudyInfos?.[0];
  const studyToken = currentStudy?.studyToken;

  // 현재 회차 정보 조회
  const {
    currentMeeting,
    data: currentMeetingsData,
    isLoading: isCurrentMeetingLoading,
    error: currentMeetingError,
  } = useCurrentMeeting(studyToken || '');

  // 다음 회차 정보 조회 (현재 회차가 없을 때)
  const {
    nextMeeting,
    data: nextMeetingsData,
    isLoading: isNextMeetingLoading,
    error: nextMeetingError,
  } = useNextMeeting(studyToken || '');

  // 표시할 회차 (현재 회차 우선, 없으면 다음 회차)
  const displayMeeting = currentMeeting || nextMeeting;
  const meetingNo = displayMeeting?.meetingNo;

  // TODO: [백엔드 필요] 출석/인증 상태 조회 API 구현 필요
  // 현재: 백엔드에서 GET /study/{studyToken}/meetings/{meetingNo}/attendances 미지원
  // 에러: "Request method 'GET' is not supported"
  // 필요: GET 메서드 지원 또는 별도 조회 엔드포인트 추가
  // const { data: attendanceData } = useAttendance(studyToken || '', meetingNo || 0, !!studyToken && !!meetingNo);
  // const { data: proofData } = useProof(studyToken || '', meetingNo || 0, !!studyToken && !!meetingNo);

  // 모달 상태
  const [isAttendanceModalVisible, setIsAttendanceModalVisible] = useState(false);
  const [isProofModalVisible, setIsProofModalVisible] = useState(false);

  // 출석 mutation
  const postAttendance = usePostAttendance();

  // 인증 mutation
  const postProof = usePostProof();

  // 출석 확인 모달 열기
  const handleAttendancePress = () => {
    setIsAttendanceModalVisible(true);
  };

  // 출석 처리
  const handleAttendanceConfirm = () => {
    if (!studyToken || !meetingNo) {
      Alert.alert('오류', '스터디 정보가 없습니다.');
      return;
    }

    const now = getCurrentISOString();

    postAttendance.mutate(
      {
        studyToken,
        meetingNo,
        now,
      },
      {
        onSuccess: () => {
          setIsAttendanceModalVisible(false);
          Alert.alert('출석 완료', '출석이 정상적으로 등록되었습니다.');
        },
        onError: (error: any) => {
          Alert.alert('출석 실패', error.response?.data?.message || '출석 등록에 실패했습니다.');
        },
      },
    );
  };

  // 인증 확인 모달 열기
  const handleProofPress = () => {
    setIsProofModalVisible(true);
  };

  // 인증 처리
  const handleProofConfirm = (imageUri: string) => {
    if (!studyToken || !meetingNo) {
      Alert.alert('오류', '스터디 정보가 없습니다.');
      return;
    }

    const provenDate = getCurrentISOString();

    // TODO: [프론트엔드] 이미지 업로드 API 연동 필요
    // 현재: 로컬 URI를 직접 전송 (임시)
    // 필요: POST /api/v1/proof/files로 이미지를 먼저 업로드하고 URL을 받아야 함
    // 참고: utils/imageUpload.ts의 uploadProofImage 함수 구현 필요
    const photoUrl = imageUri;

    postProof.mutate(
      {
        studyToken,
        meetingNo,
        proofType: 'PHOTO',
        proofPhotoUrl: photoUrl,
        provenDate,
      },
      {
        onSuccess: () => {
          setIsProofModalVisible(false);
          Alert.alert('인증 완료', '인증이 제출되었습니다. 스터디장의 승인을 기다려주세요.');
        },
        onError: (error: any) => {
          Alert.alert('인증 실패', error.response?.data?.message || '인증 제출에 실패했습니다.');
        },
      },
    );
  };

  // 현재 날짜/시간 포맷 (예: 07/11(목) 20:01)
  const formatCurrentDateTime = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const day = days[now.getDay()];
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${month}/${date}(${day}) ${hours}:${minutes}`;
  };

  // 디버깅용 로그
  console.log('🔍 Debug:', {
    studyToken,
    meetingNo,
    currentMeeting,
    nextMeeting,
    displayMeeting,
    currentMeetingsData,
    nextMeetingsData,
    isCurrentMeetingLoading,
    isNextMeetingLoading,
    currentMeetingError,
    nextMeetingError,
    disabled: !studyToken || !meetingNo,
  });

  if (isStudiesLoading) {
    return (
      <ManageView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ManageView>
    );
  }

  if (!currentStudy) {
    return (
      <ManageView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body2" style={{ color: colors.gray[6] }}>
            참여 중인 스터디가 없습니다.
          </Typography>
        </View>
      </ManageView>
    );
  }

  return (
    <ManageView>
      <ScrollView>
        <ManageBoxView style={shadowStyles.shadow}>
          <View style={{ gap: 8, paddingTop: 30, alignItems: 'center', width: '100%' }}>
            <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
              {currentStudy.name}
            </Typography>
            <Typography variant="body3" style={{ color: colors.primary, textAlign: 'center' }}>
              {currentStudy.status === 'ACTIVE' ? '진행중' : currentStudy.status === 'READY' ? '시작 대기' : '모집중'}
            </Typography>
            <Typography variant="body4" style={{ textAlign: 'center' }}>
              {displayMeeting
                ? `${displayMeeting.meetingNo}회차 • ${displayMeeting.studyDate} ${displayMeeting.stTime}`
                : '예정된 회차가 없습니다'}
            </Typography>
            <View style={{ flexDirection: 'row', gap: 10, marginVertical: 18 }}>
              <Button
                variant="contained"
                style={{ width: 100 }}
                disabled={!studyToken || !meetingNo}
                onPress={handleAttendancePress}
              >
                출석하기
              </Button>
              <Button
                variant="outlined"
                style={{ width: 100 }}
                disabled={!studyToken || !meetingNo}
                onPress={handleProofPress}
              >
                인증하기
              </Button>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 14,
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography variant="button">출석</Typography>
              <Typography variant="button" style={{ color: colors.red[6] }}>
                미완료
              </Typography>
            </View>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 14,
                justifyContent: 'space-between',
                width: '100%',
                borderTopColor: colors.gray[2],
                borderTopWidth: 1.5,
                gap: 16,
              }}
            >
              <Typography variant="button">인증</Typography>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography variant="button" style={{ color: colors.gray[8] }}>
                  사진
                </Typography>
                <Typography variant="button" style={{ color: colors.red[6] }}>
                  미제출
                </Typography>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 14,
                justifyContent: 'space-between',
                borderTopColor: colors.gray[2],
                borderTopWidth: 1.5,
                width: '100%',
              }}
            >
              <Typography variant="button" style={{ color: colors.gray[8] }}>
                타이머 인증
              </Typography>
              <Typography variant="button" style={{ color: colors.gray[6] }}>
                ( 출시 예정 )
              </Typography>
            </View>
          </View>
        </ManageBoxView>
      </ScrollView>

      {/* 출석 확인 모달 */}
      <AttendanceModal
        isVisible={isAttendanceModalVisible}
        dateTime={formatCurrentDateTime()}
        onConfirm={handleAttendanceConfirm}
        onClose={() => setIsAttendanceModalVisible(false)}
        isLoading={postAttendance.isPending}
      />

      {/* 사진 인증 모달 */}
      <ProofModal
        isVisible={isProofModalVisible}
        dateTime={formatCurrentDateTime()}
        onConfirm={handleProofConfirm}
        onClose={() => setIsProofModalVisible(false)}
        isLoading={postProof.isPending}
      />
    </ManageView>
  );
}

export default CertifiedScreen;
