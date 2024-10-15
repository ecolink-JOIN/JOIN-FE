import { ScrollView, View } from 'react-native';
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

const RoundData = [
  {
    id: 1,
    date: '2021.09.01',
    attendence: '출석',
    certify: true,
  },
  {
    id: 2,
    date: '2021.09.08',
    attendence: '출석',
    certify: true,
  },
  {
    id: 3,
    date: '2021.09.15',
    attendence: '출석',
    certify: true,
  },
  {
    id: 4,
    date: '2021.09.22',
    attendence: '지각',
    certify: true,
  },
  {
    id: 5,
    date: '2021.09.29',
    attendence: '결석',
    certify: true,
  },
  {
    id: 6,
    date: '2021.10.06',
    attendence: '출석',
    certify: true,
  },
  {
    id: 7,
    date: '2021.10.13',
    attendence: '출석',
    certify: true,
  },
  {
    id: 8,
    date: '2021.10.20',
    attendence: '출석',
    certify: true,
  },
  {
    id: 9,
    date: '2021.10.27',
    attendence: '출석',
    certify: false,
  },
  {
    id: 10,
    date: '2021.11.03',
    attendence: '출석',
    certify: true,
  },
];
const MemberDetail = () => {
  const params = useLocalSearchParams<{ userid: string }>();
  const [isAttendenceModalVisible, setIsAttendenceModalVisible] = React.useState(false);
  const [isCertifyModalVisible, setIsCertifyModalVisible] = React.useState(false);
  const [isEntrustModalVisible, setIsEntrustModalVisible] = React.useState(false);
  const [onClickDate, setOnClickDate] = React.useState('');
  const [selectedChip, setSelectedChip] = React.useState(0);

  const attendenceToggleModal = () => {
    setIsAttendenceModalVisible(!isAttendenceModalVisible);
  };

  const certifyToggleModal = () => {
    setIsCertifyModalVisible(!isCertifyModalVisible);
  };

  const entrustToggleModal = () => {
    setIsEntrustModalVisible(!isEntrustModalVisible);
  };
  return (
    <ScrollView>
      <ManageView>
        <Typography variant="heading3">스터디원 관리</Typography>
        <ManageBox style={[shadowStyles.shadow]}>
          <ProfileImage
            source={require('@/assets/images/profile.png')}
            style={{ width: 80, height: 80, borderRadius: 100 }}
          />
          <Typography variant="heading4" style={{ marginVertical: 8 }}>
            닉네임{params.userid}
          </Typography>
          <InfoViewBox
            InfoList={[
              { title: '출석률', value: '100%' },
              { title: '인증률', value: '97%' },
            ]}
          />
          <ContentBox>
            {RoundData.map((item) => (
              <RoundBox key={item.id}>
                <RoundNumber variant="body3">{item.id}회차</RoundNumber>
                <RoundDate variant="body3">{item.date}</RoundDate>
                <RoundStatus
                  variant="body3"
                  status={item.attendence === '출석'}
                  date
                  onPress={() => {
                    attendenceToggleModal();
                    setOnClickDate(item.date);
                  }}
                >
                  {item.attendence}
                </RoundStatus>
                <RoundStatus
                  variant="body3"
                  status={item.certify}
                  onPress={() => {
                    certifyToggleModal();
                    setOnClickDate(item.date);
                  }}
                >
                  {item.certify ? '인증' : '미인증'}
                </RoundStatus>
              </RoundBox>
            ))}
          </ContentBox>
          <ButtonBox>
            <Button variant="contained">평가하기</Button>
            <Button variant="outlined">강퇴하기</Button>
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
            닉네임{params.userid} 님에게 스터디장을 위임합니다.
          </Typography>
          <Typography variant="body4" style={{ textAlign: 'center' }}>
            .이후 스터디장의 모든 권리는{'\n'}닉네임{params.userid} 님에게 위임됩니다.
          </Typography>
          <Button variant="contained" onPress={entrustToggleModal} style={{ marginHorizontal: 'auto' }}>
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
