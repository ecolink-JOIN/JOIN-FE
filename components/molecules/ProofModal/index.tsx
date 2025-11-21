import React, { useState } from 'react';
import { Modal, Image, Pressable } from 'react-native';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { colors } from '@/theme';
import { Ionicons } from '@expo/vector-icons';
import { pickImage, takePhoto } from '@/utils/imageUpload';

interface ProofModalProps {
  isVisible: boolean;
  dateTime: string;
  onConfirm: (imageUri: string) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const ProofModal = ({ isVisible, dateTime, onConfirm, onClose, isLoading = false }: ProofModalProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handlePickImage = async () => {
    const result = await pickImage();
    if (result) {
      setSelectedImage(result.uri);
    }
  };

  const handleTakePhoto = async () => {
    const result = await takePhoto();
    if (result) {
      setSelectedImage(result.uri);
    }
  };

  const handleConfirm = () => {
    if (selectedImage) {
      onConfirm(selectedImage);
      setSelectedImage(null); // 모달 닫을 때 초기화
    }
  };

  const handleClose = () => {
    setSelectedImage(null);
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={handleClose}>
      <ModalContainer onPress={handleClose}>
        <ModalBox onPress={(e) => e.stopPropagation()}>
          <ModalContents>
            <Typography variant="subtitle1">사진 인증하기</Typography>
            <Typography variant="body3" style={{ color: colors.primary }}>
              {dateTime}
            </Typography>

            {/* 사진 업로드 버튼 */}
            <Pressable onPress={handlePickImage} disabled={isLoading}>
              {selectedImage ? (
                <ImageContainer>
                  <StyledImage source={{ uri: selectedImage }} resizeMode="cover" />
                  <RemoveButton
                    onPress={(e) => {
                      e.stopPropagation();
                      setSelectedImage(null);
                    }}
                  >
                    <Ionicons name="close-circle" size={32} color={colors.gray[8]} />
                  </RemoveButton>
                </ImageContainer>
              ) : (
                <UploadButton>
                  <Ionicons name="add" size={60} color="white" />
                </UploadButton>
              )}
            </Pressable>

            <ButtonGroup>
              <Button variant="outlined" onPress={handlePickImage} disabled={isLoading} style={{ flex: 1 }}>
                갤러리
              </Button>
              <Button variant="outlined" onPress={handleTakePhoto} disabled={isLoading} style={{ flex: 1 }}>
                카메라
              </Button>
            </ButtonGroup>

            <Typography variant="body4" style={{ textAlign: 'center', color: colors.gray[6] }}>
              스터디 활동을 인증할 수 있는{'\n'}사진을 업로드해주세요.
            </Typography>

            <Button
              variant="contained"
              onPress={handleConfirm}
              disabled={!selectedImage || isLoading}
              style={{ marginHorizontal: 'auto' }}
            >
              {isLoading ? '제출 중...' : '인증하기'}
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
  width: 100%;
`;

const UploadButton = styled.View`
  width: 200px;
  height: 200px;
  background-color: ${colors.gray[4]};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.View`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  background-color: ${colors.gray[2]};
  border-width: 1px;
  border-color: ${colors.gray[3]};
  position: relative;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const RemoveButton = styled.Pressable`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: white;
  border-radius: 16px;
`;

const ButtonGroup = styled.View`
  flex-direction: row;
  gap: 10px;
  width: 100%;
`;

export default ProofModal;
