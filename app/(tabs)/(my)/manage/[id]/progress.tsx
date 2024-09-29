import React, { useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ManageView, ManageBox, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { Status, Attendance, Approval, KakaoLink } from '@/components/organisms/MyPage/Manage';
import { FlatList, View } from 'react-native';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Button from '@/components/atoms/Button';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import TextField from '@/components/atoms/TextField';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import styled from 'styled-components/native';
import { colors } from '@/theme';

const Progress = ({
  id,
  bottomSheetModalRef,
}: {
  id: string | string[] | undefined;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
}) => {
  const [kakaolink, setKakaoLink] = React.useState('https://open.kakao.com/o/joinjoinjoi');
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
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
        <ListComponent title="스터디 회차 설정" href={`/manage/${id}/round`} />
      </ManageBox>
      <ManageBox title="스터디 메시지">
        <ListComponent title="스터디 공지" href={`/manage/${id}/notice`} />
        <ListComponent title="자동 알림 메세지 설정" href={`/manage/${id}/alarm`} />
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
          <Typography variant="body3" style={{ color: colors.primary }}>
            2024.06.04 - 2024.10.31
          </Typography>
          <Typography variant="body4" style={{ textAlign: 'center' }}>
            설정된 스터디 기간이 남아있습니다.{'\n'}정말 종료하시겠습니까?
          </Typography>
          <Button variant="contained" onPress={toggleModal} style={{ marginHorizontal: 'auto' }}>
            종료하기
          </Button>
        </ModalContents>
      </ModalWrapper>
    </ManageView>
  );
};

const ProgressWraper = () => {
  const { id } = useLocalSearchParams();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  return <FlatList data={[null]} renderItem={() => <Progress {...{ id, bottomSheetModalRef }} />} />;
};

export default ProgressWraper;

const ModalContents = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;
