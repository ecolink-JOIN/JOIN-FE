import React, { useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ManageView, ManageBox, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import {
  Attendance,
  KakaoLink,
  StudyAnnouncement,
  MyAttendance,
  StudySchedule,
} from '@/components/organisms/MyPage/Manage';
import { FlatList, View } from 'react-native';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Button from '@/components/atoms/Button';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import TextField from '@/components/atoms/TextField';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import styled from 'styled-components/native';
import { colors } from '@/theme';

const StudyStatus = ({
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
      <Typography variant="heading3">스터디 현황</Typography>
      <ManageBox title="스터디 공지" icon="arrow-right">
        <StudyAnnouncement />
      </ManageBox>
      <ManageBox title="나의 출석 및 인증 현황">
        <MyAttendance id="123" />
      </ManageBox>
      <ManageBox title="스터디 출석 및 인증 현황">
        <Attendance />
      </ManageBox>
      <ManageBox title="스터디 스케쥴" icon="arrow-right">
        <StudySchedule />
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
        <ListComponent title="스터디 탈퇴" />
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

const StudyStatusWrapper = () => {
  const { id } = useLocalSearchParams();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  return <FlatList data={[null]} renderItem={() => <StudyStatus {...{ id, bottomSheetModalRef }} />} />;
};

export default StudyStatusWrapper;

const ModalContents = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;
