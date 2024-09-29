import { PropsWithChildren } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 0 20px;
`;

export const ModalBox = styled.View`
  gap: 16px;
  justify-content: center;
  align-items: center;
  background-color: white;
  /* padding: 16px 16px 32px 16px; */
  width: 320px;
  border-radius: 16px;
`;

export const ModalWrapper = ({
  isModalVisible,
  toggleModal,
  children,
}: PropsWithChildren<{ isModalVisible: boolean; toggleModal: () => void }>) => {
  return (
    <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={toggleModal}>
      <ModalContainer>
        <ModalBox>{children}</ModalBox>
      </ModalContainer>
    </Modal>
  );
};
