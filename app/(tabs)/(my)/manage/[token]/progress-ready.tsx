import React, { useEffect, useRef } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { ManageView, ManageBox, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { Status, Attendance, Approval, KakaoLink } from '@/components/organisms/MyPage/Manage';
import { FlatList, View, Alert, ActivityIndicator } from 'react-native';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Button from '@/components/atoms/Button';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import TextField from '@/components/atoms/TextField';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import { StudyService } from '@/apis';

const Ready = ({ bottomSheetModalRef }: { bottomSheetModalRef: React.RefObject<BottomSheetModalMethods> }) => {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [kakaolink, setKakaoLink] = React.useState('https://open.kakao.com/o/joinjoinjoi');
  const [isClosing, setIsClosing] = React.useState(false);
  const [studyDetail, setStudyDetail] = React.useState<any>(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  React.useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const detail = await StudyService().detail(token);
        setStudyDetail(detail);
      } catch (error) {
        console.error('스터디 상세 조회 실패:', error);
      }
    };

    if (token) {
      fetchStudyDetail();
    }
  }, [token]);

  const toggleModal = () => {
    console.log('🟡 모달 토글');
    setIsModalVisible(!isModalVisible);
  };

  const handleCloseStudy = async () => {
    console.log('🔴 스터디 종료 시작');
    try {
      setIsClosing(true);
      const today = new Date().toISOString().split('T')[0];

      await StudyService().closeStudy(token, {
        actualEndDate: today,
      });

      console.log('✅ 스터디 종료 성공');
      Alert.alert('스터디 종료', '스터디가 성공적으로 종료되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            toggleModal();
            router.push('/(tabs)/(my)');
          },
        },
      ]);
    } catch (error) {
      console.error('❌ 스터디 종료 실패:', error);
      Alert.alert('오류', '스터디 종료에 실패했습니다.\n잠시 후 다시 시도해주세요.');
    } finally {
      setIsClosing(false);
    }
  };

  return (
    <ManageView>
      <Typography variant="heading3">진행 관리</Typography>
      <ManageBox title="진행 현황">
        <Status value={false} />
      </ManageBox>
      <ManageBox title="스터디 출석 및 인증 현황">
        <Attendance />
      </ManageBox>
      <ManageBox title="스터디 인증 승인">
        <Approval />
      </ManageBox>
      <ManageBox>
        <ListComponent title="스터디 회차 설정" href={`/manage/${token}/round`} />
      </ManageBox>
      <ManageBox title="스터디 메시지">
        <ListComponent title="스터디 공지" href={`/manage/${token}/notice`} />
        <ListComponent title="자동 알림 메세지 설정" href={`/manage/${token}/alarm`} />
      </ManageBox>
      <ManageBox
        title="스터디 카카오톡 링크"
        icon="pencil"
        onPress={() => {
          bottomSheetModalRef.current?.present();
        }}
      >
        <KakaoLink />
      </ManageBox>
      <ManageBox>
        <ListComponent title="스터디 종료하기" onPress={toggleModal} />
      </ManageBox>
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef}
        component={
          <View style={{ padding: 20, gap: 12 }}>
            <Typography variant="subtitle1">스터디 카카오톡 링크 수정</Typography>
            <TextField placeholder="카카오톡 링크를 입력해주세요." value={kakaolink} onChangeText={setKakaoLink} />
            <Button
              variant="contained"
              style={{ marginHorizontal: 'auto' }}
              onPress={() => bottomSheetModalRef.current?.dismiss()}
            >
              완료
            </Button>
          </View>
        }
      />
      <ModalWrapper isModalVisible={isModalVisible} toggleModal={toggleModal}>
        <ModalContents>
          <Typography variant="subtitle1">스터디 종료하기</Typography>
          {studyDetail && (
            <Typography variant="body3" style={{ color: colors.primary }}>
              {new Date(studyDetail.stDate).toLocaleDateString('ko-KR')} -{' '}
              {new Date(studyDetail.endDate).toLocaleDateString('ko-KR')}
            </Typography>
          )}
          <Typography variant="body4" style={{ textAlign: 'center' }}>
            {studyDetail && new Date(studyDetail.endDate) > new Date() ? '설정된 스터디 기간이 남아있습니다.\n' : ''}
            정말 종료하시겠습니까?
          </Typography>
          <Typography variant="body4" style={{ textAlign: 'center', color: colors.gray[6] }}>
            종료된 스터디는 다시 되돌릴 수 없습니다.
          </Typography>
          <Button
            variant="contained"
            style={{ marginHorizontal: 'auto' }}
            onPress={handleCloseStudy}
            disabled={isClosing}
          >
            {isClosing ? <ActivityIndicator color={colors.white} size="small" /> : '종료하기'}
          </Button>
        </ModalContents>
      </ModalWrapper>
    </ManageView>
  );
};

const ReadyWraper = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  return <FlatList data={[null]} renderItem={() => <Ready {...{ bottomSheetModalRef }} />} />;
};

export default ReadyWraper;

const ModalContents = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;
