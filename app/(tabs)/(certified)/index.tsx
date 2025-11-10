import { ActivityIndicator, ScrollView, View, Alert } from 'react-native';
import { ManageBoxView, ManageView, shadowStyles } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import Button from '@/components/atoms/Button';
import { useMyJoinedStudies } from '@/hooks/useMyPage';
import { useCurrentMeeting, useNextMeeting } from '@/hooks/useMeetings';
import { useState, useEffect } from 'react';
import AttendanceModal from '@/components/molecules/AttendanceModal';
import ProofModal from '@/components/molecules/ProofModal';
import { usePostAttendance, useAttendance } from '@/hooks/useAttendance';
import { usePostProof, useProof } from '@/hooks/useProof';
import { getCurrentISOString } from '@/utils/dateFormatter';
import { ProofService } from '@/apis';
import FormData from 'form-data';
import { useNotificationContext } from '@/context/NotificationContext';

function CertifiedScreen() {
  const { refreshUnreadCount } = useNotificationContext();

  // 인증 페이지 진입 시 알림 개수 갱신
  useEffect(() => {
    refreshUnreadCount();
  }, [refreshUnreadCount]);

  // 참여 중인 스터디 목록 조회
  const { data: studiesData, isLoading: isStudiesLoading } = useMyJoinedStudies();

  if (isStudiesLoading) {
    return (
      <ManageView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ManageView>
    );
  }

  const joinedStudies = studiesData?.joinStudyInfos || [];

  if (joinedStudies.length === 0) {
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
      <ScrollView contentContainerStyle={{ gap: 16, paddingBottom: 20 }}>
        {joinedStudies.map((study) => (
          <StudyCard key={study.studyToken} study={study} />
        ))}
      </ScrollView>
    </ManageView>
  );
}

// 개별 스터디 카드 컴포넌트
function StudyCard({ study }: { study: any }) {
  const studyToken = study.studyToken;

  // 현재 회차 정보 조회
  const { currentMeeting } = useCurrentMeeting(studyToken || '');

  // 다음 회차 정보 조회 (현재 회차가 없을 때)
  const { nextMeeting } = useNextMeeting(studyToken || '');

  // 표시할 회차 (현재 회차 우선, 없으면 다음 회차)
  const displayMeeting = currentMeeting || nextMeeting;
  const meetingNo = displayMeeting?.meetingNo;

  // 출석 상태 조회
  const { data: attendanceData } = useAttendance(studyToken || '', meetingNo || 0, !!studyToken && !!meetingNo);

  // 인증 상태 조회
  const { data: proofData } = useProof(studyToken || '', meetingNo || 0, !!studyToken && !!meetingNo);

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
  const handleProofConfirm = async (imageUri: string) => {
    if (!studyToken || !meetingNo) {
      Alert.alert('오류', '스터디 정보가 없습니다.');
      return;
    }

    try {
      const fileName = `proof_${Date.now()}.jpg`;
      const formData = new FormData();

      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: fileName,
      } as any);

      const uploadResult = await ProofService().uploadProofImage(formData);
      const uploadedUrl = uploadResult?.url;

      if (!uploadedUrl) {
        throw new Error('업로드된 URL을 받지 못했습니다.');
      }

      const provenDate = getCurrentISOString();

      postProof.mutate(
        {
          studyToken,
          meetingNo,
          proofType: 'PHOTO',
          proofPhotoUrl: uploadedUrl,
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
    } catch (error: any) {
      Alert.alert('업로드 실패', error.message || '이미지 업로드에 실패했습니다.');
    }
  };

  // 현재 날짜/시간 포맷팅
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

  return (
    <>
      <ManageBoxView style={shadowStyles.shadow}>
        <View style={{ gap: 8, paddingTop: 30, alignItems: 'center', width: '100%' }}>
          <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
            {study.name}
          </Typography>
          <Typography variant="body3" style={{ color: colors.primary, textAlign: 'center' }}>
            {study.status === 'ACTIVE' ? '진행중' : study.status === 'READY' ? '시작 대기' : '모집중'}
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
            <Typography
              variant="button"
              style={{ color: attendanceData?.hasAttendance ? colors.primary : colors.red[6] }}
            >
              {attendanceData?.hasAttendance ? '출석 완료' : '미완료'}
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
              <Typography
                variant="button"
                style={{
                  color:
                    proofData?.proofStatus === 'APPROVED'
                      ? colors.primary
                      : proofData?.proofStatus === 'PENDING'
                        ? colors.yellow[6]
                        : proofData?.proofStatus === 'REJECTED'
                          ? colors.red[6]
                          : colors.red[6],
                }}
              >
                {proofData?.proofStatus === 'APPROVED'
                  ? '인증 완료'
                  : proofData?.proofStatus === 'PENDING'
                    ? '승인 대기'
                    : proofData?.proofStatus === 'REJECTED'
                      ? '반려'
                      : '미제출'}
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
    </>
  );
}

export default CertifiedScreen;
