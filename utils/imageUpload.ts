import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

export interface ImagePickerResult {
  uri: string;
  base64?: string;
  type: string;
  name: string;
}

/**
 * 이미지 피커 권한 요청
 */
export const requestImagePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진 업로드를 위해 앨범 접근 권한이 필요합니다.');
      return false;
    }
  }
  return true;
};

/**
 * 카메라 권한 요청
 */
export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진 촬영을 위해 카메라 접근 권한이 필요합니다.');
      return false;
    }
  }
  return true;
};

/**
 * 이미지 선택 (앨범에서)
 */
export const pickImage = async (): Promise<ImagePickerResult | null> => {
  const hasPermission = await requestImagePermission();
  if (!hasPermission) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
    base64: true, // Base64 인코딩 포함
  });

  if (result.canceled) {
    return null;
  }

  const asset = result.assets[0];
  return {
    uri: asset.uri,
    base64: asset.base64,
    type: asset.type || 'image',
    name: asset.fileName || `photo_${Date.now()}.jpg`,
  };
};

/**
 * 사진 촬영 (카메라)
 */
export const takePhoto = async (): Promise<ImagePickerResult | null> => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) return null;

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.8,
    base64: true,
  });

  if (result.canceled) {
    return null;
  }

  const asset = result.assets[0];
  return {
    uri: asset.uri,
    base64: asset.base64,
    type: asset.type || 'image',
    name: asset.fileName || `camera_${Date.now()}.jpg`,
  };
};

/**
 * 이미지 선택 옵션 다이얼로그
 */
export const showImagePickerOptions = (): Promise<'camera' | 'gallery' | null> => {
  return new Promise((resolve) => {
    Alert.alert(
      '사진 선택',
      '사진을 어떻게 업로드하시겠습니까?',
      [
        {
          text: '카메라로 촬영',
          onPress: () => resolve('camera'),
        },
        {
          text: '앨범에서 선택',
          onPress: () => resolve('gallery'),
        },
        {
          text: '취소',
          onPress: () => resolve(null),
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  });
};

/**
 * 이미지를 Base64 URL로 변환
 */
export const imageToBase64Url = (base64: string, mimeType: string = 'image/jpeg'): string => {
  return `data:${mimeType};base64,${base64}`;
};

/**
 * 이미지 압축 및 리사이징 (옵션)
 */
export const compressImage = async (uri: string, quality: number = 0.7): Promise<string> => {
  // TODO: expo-image-manipulator 사용하여 구현
  // 현재는 원본 URI 반환
  return uri;
};

/**
 * S3 업로드 함수 (추후 구현)
 * 현재는 Base64로 대체
 */
export const uploadToS3 = async (image: ImagePickerResult): Promise<string> => {
  // TODO: AWS S3 또는 백엔드 파일 업로드 API 구현
  // 임시로 Base64 URL 반환
  if (image.base64) {
    return imageToBase64Url(image.base64);
  }
  throw new Error('이미지 업로드 실패');
};
