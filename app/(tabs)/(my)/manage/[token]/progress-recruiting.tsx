import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ManageView, ManageBox, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { Status, ApplicationApproval } from '@/components/organisms/MyPage/Manage';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import Button from '@/components/atoms/Button';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import { StudyService } from '@/apis';
const ProgressWraper = () => {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [key, setKey] = React.useState(0);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleStatusToggle = () => {
    toggleModal();
  };

  const handleRecruitingComplete = () => {
    StudyService()
      .toggleRecruitStatus(token)
      .then(() => {
        toggleModal();
        setKey((prev) => prev + 1);
        router.back();
      })
      .catch((error) => {
        console.error('Error toggling recruiting status:', error);
      });
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            setKey((prev) => prev + 1);
          }}
          colors={[colors.primary]}
          progressBackgroundColor={colors.white}
        />
      }
    >
      <ManageView key={key}>
        <Typography variant="heading3">진행 관리</Typography>
        <ManageBox title="진행 현황">
          <Status value={false} onToggle={handleStatusToggle} />
          <ListComponent title="모집 글 바로가기" href={`/study/${token}`} />
        </ManageBox>
        <ManageBox title="신청 현황">
          <ApplicationApproval />
        </ManageBox>
        <ModalWrapper isModalVisible={isModalVisible} toggleModal={toggleModal}>
          <ModalContents>
            <Typography variant="subtitle1">모집 완료하고 스터디 시작하기</Typography>
            <Typography variant="body3" style={{ color: colors.primary }}></Typography>
            <Typography variant="body3" style={{ textAlign: 'center', color: colors.black }}>
              설정하신 스터디 기간을{'\n'}스터디 시작 이후에 변경하게 되면{'\n'}'스터디 회차 자동 생성 기능'을 사용할 수
              없습니다.
            </Typography>
            <Typography variant="body4" style={{ textAlign: 'center', color: colors.black, fontWeight: '400' }}>
              스터디 조건 변경을 원하신다면{'\n'}[운영 규칙 관리]에서 수정하신 후{'\n'}스터디를 시작하세요.
            </Typography>
            <Button
              variant="outlined"
              onPress={() => router.push(`/manage/${token}/rule`)}
              style={{ marginHorizontal: 'auto' }}
            >
              운영 규칙 관리로 이동
            </Button>
            <Button variant="contained" onPress={handleRecruitingComplete} style={{ marginHorizontal: 'auto' }}>
              스터디 시작하기
            </Button>
          </ModalContents>
        </ModalWrapper>
      </ManageView>
    </ScrollView>
  );
};

export default ProgressWraper;

const ModalContents = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;
