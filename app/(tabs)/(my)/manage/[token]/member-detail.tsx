import { ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import { styled } from 'styled-components/native';
import Button from '@/components/atoms/Button';
import { InfoViewBox } from '@/components/molecules/MyMolecules/InfoView';
import Chip from '@/components/atoms/Badge';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import { StudyEnrollmentsService, ProofService } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useGlobalContext } from '@/context/GlobalContext';
import { useAvatarDetail } from '@/hooks/useAvatar';

const MemberDetail = () => {
  const router = useRouter();
  const { userinfo } = useGlobalContext();
  const { avartarToken, token } = useLocalSearchParams<{ avartarToken: string; token: string }>();
  const [isAttendenceModalVisible, setIsAttendenceModalVisible] = React.useState(false);
  const [isCertifyModalVisible, setIsCertifyModalVisible] = React.useState(false);
  const [isEntrustModalVisible, setIsEntrustModalVisible] = React.useState(false);
  const [onClickDate, setOnClickDate] = React.useState('');
  const [selectedMeetingNo, setSelectedMeetingNo] = React.useState<number | null>(null);
  const [selectedChip, setSelectedChip] = React.useState(0);
  const [isForcedOutModalVisible, setIsForcedOutModalVisible] = React.useState(false);
  const [evaluationModalVisible, setEvaluationModalVisible] = React.useState(false);

  // 아바타 상세 정보 조회 (새로운 API 사용)
  const { data: memberDetail } = useAvatarDetail(avartarToken || '');

  const { data: memberAttendance, refetch: refetchAttendance } = useQuery({
    queryKey: ['memberAttendance', avartarToken],
    queryFn: () => StudyEnrollmentsService().getMemberAttendance(token, avartarToken),
  });

  const attendenceToggleModal = () => {
    setIsAttendenceModalVisible(!isAttendenceModalVisible);
  };

  const certifyToggleModal = () => {
    setIsCertifyModalVisible(!isCertifyModalVisible);
  };

  const entrustToggleModal = () => {
    setIsEntrustModalVisible(!isEntrustModalVisible);
  };

  const forcedOutToggleModal = () => {
    setIsForcedOutModalVisible(!isForcedOutModalVisible);
  };
  return (
    <ScrollView>
      <ManageView>
        <Typography variant="heading3">스터디원 관리</Typography>
        <ManageBox style={[shadowStyles.shadow]}>
          <ProfileImage
            source={{ uri: memberDetail?.profileUrl }}
            style={{ width: 80, height: 80, borderRadius: 100 }}
          />
          <Typography variant="heading4" style={{ marginVertical: 8 }}>
            {memberDetail?.nickname}
          </Typography>
          <InfoViewBox
            center
            InfoList={[
              { title: '출석률', value: `${memberDetail?.averageAttendanceRate}`, extraString: '%' },
              { title: '인증률', value: `${memberDetail?.averageProofRate}`, extraString: '%' },
            ]}
          />
          <ContentBox>
            {memberAttendance && memberAttendance.meetingAttendanceStatus.length > 0 ? (
              <>
                <Typography variant="body4" style={{ textAlign: 'center', color: colors.gray['7'], marginBottom: 8 }}>
                  💡 미인증 항목을 클릭하면 인증으로 수정할 수 있습니다
                </Typography>
                {memberAttendance?.meetingAttendanceStatus.map((item) => {
                  const studyDate = new Date(item.studyDate);
                  return (
                    <RoundBox key={item.meetingNo}>
                      <RoundNumber variant="body3">{item.meetingNo}회차</RoundNumber>
                      <RoundDate variant="body3">
                        {studyDate.getFullYear()}.{studyDate.getMonth() + 1}.{studyDate.getDate()}
                      </RoundDate>
                      <RoundStatus
                        variant="body3"
                        status={item.attendanceStatus === 'PRESENT'}
                        date
                        onPress={() => {
                          attendenceToggleModal();
                          setOnClickDate(studyDate.toLocaleDateString());
                        }}
                      >
                        {item.attendanceStatus === 'PRESENT'
                          ? '출석'
                          : item.attendanceStatus === 'LATENESS'
                            ? '지각'
                            : '결석'}
                      </RoundStatus>
                      <RoundStatus
                        variant="body3"
                        status={item.hasApproveProof}
                        onPress={() => {
                          if (!item.hasApproveProof) {
                            setSelectedMeetingNo(item.meetingNo);
                            certifyToggleModal();
                            setOnClickDate(studyDate.toLocaleDateString());
                          }
                        }}
                      >
                        {item.hasApproveProof ? '인증' : '미인증'}
                      </RoundStatus>
                    </RoundBox>
                  );
                })}
              </>
            ) : (
              <Typography variant="body3" style={{ textAlign: 'center' }}>
                출석 내역이 없습니다.
              </Typography>
            )}
          </ContentBox>
          <ButtonBox>
            <Button
              variant="contained"
              onPress={() => {
                router.push({
                  pathname: '/(tabs)/(my)/manage/[token]/evaluation',
                  params: {
                    token,
                    avartarToken,
                    nickname: memberDetail?.nickname || '스터디원',
                  },
                });
              }}
            >
              평가하기
            </Button>
            <Button variant="outlined" onPress={() => setIsForcedOutModalVisible(true)}>
              강퇴하기
            </Button>
          </ButtonBox>
          <Chip variant="simple" value="스터디장 위임하기" onPress={entrustToggleModal} />
        </ManageBox>
      </ManageView>
      <ModalWrapper isModalVisible={isAttendenceModalVisible} toggleModal={attendenceToggleModal}>
        <ModalContents>
          <Typography variant="subtitle1">출결 수정</Typography>
          <Typography variant="body3" style={{ color: colors.primary }}>
            {onClickDate}
          </Typography>
          <ChipBox>
            <ChipWrapper
              selected={selectedChip === 0}
              onPress={() => {
                setSelectedChip(0);
              }}
            >
              <ChipView variant="button" selected={selectedChip === 0}>
                출석
              </ChipView>
            </ChipWrapper>
            <ChipWrapper
              selected={selectedChip === 1}
              onPress={() => {
                setSelectedChip(1);
              }}
            >
              <ChipView variant="button" selected={selectedChip === 1}>
                지각
              </ChipView>
            </ChipWrapper>
            <ChipWrapper
              selected={selectedChip === 2}
              onPress={() => {
                setSelectedChip(2);
              }}
            >
              <ChipView variant="button" selected={selectedChip === 2}>
                결석
              </ChipView>
            </ChipWrapper>
          </ChipBox>
          <Button variant="contained" onPress={attendenceToggleModal} style={{ marginHorizontal: 'auto' }}>
            수정하기
          </Button>
        </ModalContents>
      </ModalWrapper>
      <ModalWrapper isModalVisible={isCertifyModalVisible} toggleModal={certifyToggleModal}>
        <ModalContents>
          <Typography variant="subtitle1">인증 수정</Typography>
          <Typography variant="body3" style={{ color: colors.primary }}>
            {onClickDate}
          </Typography>
          <Typography variant="body4" style={{ textAlign: 'center' }}>
            미인증 내역을 '인증'으로 수정합니다
          </Typography>
          <Button
            variant="contained"
            onPress={async () => {
              if (!selectedMeetingNo) return;
              try {
                await ProofService().updateUncertifiedProof(token, selectedMeetingNo, {
                  targetToken: avartarToken,
                  provenTime: new Date().toISOString(),
                });
                alert('인증 수정이 완료되었습니다.');
                certifyToggleModal();
                // 데이터 리프레시
                refetchAttendance();
              } catch {
                alert('인증 수정에 실패했습니다.');
              }
            }}
            style={{ marginHorizontal: 'auto' }}
          >
            수정하기
          </Button>
        </ModalContents>
      </ModalWrapper>
      <ModalWrapper isModalVisible={isEntrustModalVisible} toggleModal={entrustToggleModal}>
        <ModalContents>
          <Typography variant="subtitle1">스터디장 위임하기</Typography>
          <Typography variant="body4" style={{ textAlign: 'center' }}>
            {memberDetail?.nickname} 님에게 스터디장을 위임합니다.
          </Typography>
          <Typography variant="body4" style={{ textAlign: 'center' }}>
            스터디장 위임은 1회만 가능하며,{'\n'}위임 후 재위임은 불가하므로 위임을 원하는{'\n'}스터디원과의 충분한
            논의를 통해{'\n'}위임을 진행해주세요.
          </Typography>
          <Typography variant="body4" style={{ textAlign: 'center' }}>
            {userinfo.nickname} 님이 스터디장 위임 승인 시{'\n'}이후 스터디장의 모든 권리는{'\n'}
            {memberDetail?.nickname} 님에게 위임됩니다.
          </Typography>
          <Button
            variant="contained"
            style={{ marginHorizontal: 'auto' }}
            onPress={() => {
              StudyEnrollmentsService()
                .delegateStudy(token, avartarToken)
                .then(() => {
                  alert('스터디장 위임이 완료되었습니다.');
                  entrustToggleModal();
                  router.back();
                })
                .catch((error) => {
                  console.error('스터디장 위임 실패:', error);
                  alert('스터디장 위임에 실패했습니다.\n잠시 후 다시 시도해주세요.');
                  entrustToggleModal();
                });
            }}
          >
            확인
          </Button>
        </ModalContents>
      </ModalWrapper>
      <ModalWrapper isModalVisible={isForcedOutModalVisible} toggleModal={forcedOutToggleModal}>
        <ModalContents>
          <Typography variant="subtitle1">강퇴하기</Typography>
          <Typography variant="body4" style={{ textAlign: 'center' }}>
            {memberDetail?.nickname} 님을 강퇴하시겠습니까?
          </Typography>
          <Typography variant="body4" style={{ textAlign: 'center' }}>
            강퇴 후 스터디원은{'\n'}스터디에 참여할 수 없습니다.
          </Typography>
          <Button
            variant="contained"
            style={{ marginHorizontal: 'auto' }}
            onPress={() => {
              StudyEnrollmentsService()
                .forcedOut(token, avartarToken)
                .finally(() => {
                  forcedOutToggleModal();
                });
            }}
          >
            확인
          </Button>
        </ModalContents>
      </ModalWrapper>
    </ScrollView>
  );
};

export default MemberDetail;

const ManageBox = styled(ManageBoxView)`
  align-items: center;
  padding: 28px 20px;
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

const RoundDate = styled(Typography)`
  width: 100px;
`;
const RoundStatus = styled(Typography)<{ status: boolean; date?: boolean }>`
  flex: 1;
  text-align: ${(props) => (props.date ? 'center' : 'right')};
  color: ${(props) => (props.status ? colors.black : '#D32625')};
`;

const ContentBox = styled.View`
  margin-top: 16px;
  width: 100%;
  gap: 14px;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
`;

const ButtonBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin: 26px 0;
`;

const ModalContents = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const ChipBox = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const ChipWrapper = styled.Pressable<{ selected: boolean }>`
  flex: 1;
  height: 40px;
  border-radius: 24px;
  border-color: ${(props) => (props.selected ? colors.primary : colors.gray[3])};
  background-color: ${(props) => (props.selected ? colors.sub2 : colors.gray[2])};
  border-width: 2px;
  justify-content: center;
  align-items: center;
`;

const ChipView = styled(Typography)<{ selected: boolean }>`
  color: ${(props) => (props.selected ? colors.primary : colors.gray[9])};
`;
