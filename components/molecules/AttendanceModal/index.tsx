import React from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { colors } from '@/theme';

interface AttendanceModalProps {
  isVisible: boolean;
  dateTime: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

const AttendanceModal = ({ isVisible, dateTime, onConfirm, onClose, isLoading = false }: AttendanceModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={onClose}>
      <ModalContainer onPress={onClose}>
        <ModalBox onPress={(e) => e.stopPropagation()}>
          <ModalContents>
            <Typography variant="subtitle1">출석 확인</Typography>
            <Typography variant="body3" style={{ color: colors.primary }}>
              {dateTime}
            </Typography>
            <Typography variant="body4" style={{ textAlign: 'center' }}>
              출석을 진행하시겠습니까?
            </Typography>
            <Button
              variant="contained"
              onPress={handleConfirm}
              disabled={isLoading}
              style={{ marginHorizontal: 'auto' }}
            >
              {isLoading ? '처리 중...' : '출석하기'}
            </Button>
          </ModalContents>
        </ModalBox>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.Pressable`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 0 20px;
`;

const ModalBox = styled.Pressable`
  gap: 16px;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 320px;
  border-radius: 16px;
`;

const ModalContents = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

export default AttendanceModal;
