import React, { useCallback, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable, Image, Alert, Modal, SafeAreaView } from 'react-native';
import { BottomSheetHandle, BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from '@/components/molecules/BottomSheet';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import Icon from '@/components/atoms/Icon';
import { colors } from '@/theme';
import { Camera, CameraType } from 'expo-camera/legacy';
import * as ImagePicker from 'expo-image-picker';
import { usePhotoContext } from '@/context/PhotoContext';

const ImageSettingsButton = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const cameraRef = useRef<Camera | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean | null>(null);
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.back);
  const { setPhotoUri } = usePhotoContext();
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
      setIsCameraVisible(false);
      bottomSheetModalRef.current?.close();
    }
  };

  const pickImageFromGallery = async () => {
    if (!hasGalleryPermission) {
      Alert.alert('권한 필요', '갤러리 접근 권한이 없습니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
      bottomSheetModalRef.current?.close();
    }
  };

  const toggleCameraType = () => {
    setCameraType((prevType) => (prevType === CameraType.back ? CameraType.front : CameraType.back));
  };

  const openCamera = () => {
    if (!hasCameraPermission) {
      Alert.alert('권한 필요', '카메라 접근 권한이 없습니다.');
      return;
    }
    setIsCameraVisible(true);
  };

  const removeProfileImage = () => {
    setPhotoUri(null);
    bottomSheetModalRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePresentModalPress}>
        <CameraIcon source={require('@/assets/images/camera.png')} />
      </Pressable>

      <BottomSheet
        snapPoints={['28%']}
        bottomSheetModalRef={bottomSheetModalRef}
        handleComponent={BottomSheetHandle}
        enablePanDownToClose
        component={
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
              <View style={{ gap: 4 }}>
                <RowPressable onPress={pickImageFromGallery}>
                  <Icon name="library-outline" />
                  <Typography variant="body2" style={{ color: colors.gray[10] }}>
                    라이브러리에서 선택
                  </Typography>
                </RowPressable>

                <RowPressable onPress={openCamera}>
                  <Icon name="camera-outline" />
                  <Typography variant="body2" style={{ color: colors.gray[10] }}>
                    사진 촬영
                  </Typography>
                </RowPressable>

                <RowPressable onPress={removeProfileImage}>
                  <Icon name="delete-outline" />
                  <Typography variant="body2" style={{ color: colors.red[6] }}>
                    프로필 사진 제거
                  </Typography>
                </RowPressable>
              </View>
            </ScrollView>
          </View>
        }
      />

      <Modal visible={isCameraVisible} onRequestClose={() => setIsCameraVisible(false)}>
        <Camera ref={cameraRef} style={{ flex: 1, backgroundColor: 'black' }} type={cameraType} />
        <CameraHeaders>
          <SafeAreaView>
            <CameraHeaderControls>
              <Pressable onPress={() => {}}>
                <Icon name="flash-outline" />
              </Pressable>
              <Typography
                variant="body1"
                style={{
                  color: 'white',
                }}
              >
                사진
              </Typography>
              <View style={{ width: 24 }} />
            </CameraHeaderControls>
          </SafeAreaView>
        </CameraHeaders>
        <CameraControls>
          <Pressable onPress={() => setIsCameraVisible(false)}>
            <Typography variant="body1" style={{ color: 'white' }}>
              취소
            </Typography>
          </Pressable>
          <CameraShutter onPress={handleTakePicture}>
            <CameraShutterCircle />
          </CameraShutter>
          <Pressable onPress={toggleCameraType}>
            <Icon name="swap-outline" />
          </Pressable>
        </CameraControls>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default ImageSettingsButton;

const RowPressable = styled(Pressable)`
  flex-direction: row;
  gap: 8px;
  height: 44px;
`;

const CameraIcon = styled.Image`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const CameraHeaders = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background: black;
`;

const CameraShutter = styled(Pressable)`
  width: 72px;
  height: 72px;
  background-color: transparent;
  border-width: 5px;
  border-color: white;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const CameraShutterCircle = styled.View`
  width: 53.3px;
  height: 53.3px;
  background-color: white;
  border-radius: 50%;
`;

const CameraHeaderControls = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const CameraControls = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  flex-direction: row;
  justify-content: space-between;
  background: black;
  padding: 12px 20px;
`;
