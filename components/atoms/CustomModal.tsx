import React from 'react';
import { View, Modal, ModalProps, Alert, StyleSheet } from 'react-native';

import { colors } from '@/theme';

interface CustomModalProps extends ModalProps {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  children?: React.ReactNode;
  type?: 'default' | 'button' | 'yesno';
  buttonTitle?: string;
}

const CustomModal = ({ modalVisible, setModalVisible, children }: CustomModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 10,
    width: '100%',
  },
});
