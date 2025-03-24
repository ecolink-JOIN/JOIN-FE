import React, { useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ManageView, ManageBox } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { Status, Approval } from '@/components/organisms/MyPage/Manage';
import { FlatList } from 'react-native';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Button from '@/components/atoms/Button';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import styled from 'styled-components/native';
import { colors } from '@/theme';

const ReCruiting = ({ bottomSheetModalRef }: { bottomSheetModalRef: React.RefObject<BottomSheetModalMethods> }) => {
  // const { token } = useLocalSearchParams<{ token: string }>();
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
      <ManageBox title="스터디 인증 승인">
        <Approval />
      </ManageBox>
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

const ReCruitingWraper = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  return <FlatList data={[null]} renderItem={() => <ReCruiting {...{ bottomSheetModalRef }} />} />;
};

export default ReCruitingWraper;

const ModalContents = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;
