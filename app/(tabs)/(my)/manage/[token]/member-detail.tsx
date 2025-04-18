import { ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import { styled } from 'styled-components/native';
import Button from '@/components/atoms/Button';
import { InfoViewBox } from '@/components/molecules/MyMolecules/InfoView';
import Chip from '@/components/atoms/Badge';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import { StudyEnrollmentsService } from '@/apis';
import { useQuery } from '@tanstack/react-query';
import { useGlobalContext } from '@/context/GlobalContext';

const MemberDetail = () => {
  const { userinfo } = useGlobalContext();
  const { avartarToken, token } = useLocalSearchParams<{ avartarToken: string; token: string }>();
  const [isAttendenceModalVisible, setIsAttendenceModalVisible] = React.useState(false);
  const [isCertifyModalVisible, setIsCertifyModalVisible] = React.useState(false);
  const [isEntrustModalVisible, setIsEntrustModalVisible] = React.useState(false);
  const [onClickDate, setOnClickDate] = React.useState('');
  const [selectedChip, setSelectedChip] = React.useState(0);
  const [isForcedOutModalVisible, setIsForcedOutModalVisible] = React.useState(false);
  const [evaluationModalVisible, setEvaluationModalVisible] = React.useState(false);

  const { data: memberDetail } = useQuery({
    queryKey: ['member', avartarToken],
    queryFn: () => StudyEnrollmentsService().getMemberDetail(avartarToken),
  });
  const { data: memberAttendance } = useQuery({
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
              memberAttendance?.meetingAttendanceStatus.map((item) => (
                <RoundBox key={item.meetingNo}>
                  <RoundNumber variant="body3">{item.meetingNo}회차</RoundNumber>
                  <RoundDate variant="body3">
                    {item.studyDate.getFullYear()}.{item.studyDate.getMonth()}.{item.studyDate.getDate()}
                  </RoundDate>
                  <RoundStatus
                    variant="body3"
                    status={item.attendanceStatus === 'PRESENT'}
                    date
                    onPress={() => {
                      attendenceToggleModal();
                      setOnClickDate(item.studyDate.toLocaleDateString());
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
                      certifyToggleModal();
                      setOnClickDate(item.studyDate.toLocaleDateString());
                    }}
                  >
                    {item.hasApproveProof ? '인증' : '미인증'}
                  </RoundStatus>
                </RoundBox>
              ))
            ) : (
              <Typography variant="body3" style={{ textAlign: 'center' }}>
                출석 내역이 없습니다.
              </Typography>
            )}
          </ContentBox>
          <ButtonBox>
            <Button variant="contained">평가하기</Button>
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
          <Button variant="contained" onPress={certifyToggleModal} style={{ marginHorizontal: 'auto' }}>
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
                .finally(() => {
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
