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
  // TODO: [프론트엔드] expo-image-manipulator 패키지 설치 및 구현
  // 1. 패키지 설치: npx expo install expo-image-manipulator
  // 2. 이미지 리사이징: manipulateAsync(uri, [{ resize: { width: 1024 } }])
  // 3. 이미지 압축: compress 옵션으로 품질 조정
  // 참고: https://docs.expo.dev/versions/latest/sdk/imagemanipulator/
  return uri;
};

/**
 * 이미지 업로드 함수
 * POST /api/v1/proof/files 사용
 */
export const uploadProofImage = async (image: ImagePickerResult): Promise<string> => {
  // TODO: [프론트엔드] POST /api/v1/proof/files API 연동
  //
  // 백엔드 API (이미 구현됨):
  // POST /api/v1/proof/files
  // 인증 이미지 저장 - 인증 필수
  //
  // 프론트엔드 구현 예시:
  // import { API } from '@/apis/axios';
  //
  // const formData = new FormData();
  // formData.append('file', {
  //   uri: image.uri,
  //   type: 'image/jpeg',
  //   name: image.name,
  // } as any);
  //
  // const response = await API.post('/proof/files', formData, {
  //   headers: { 'Content-Type': 'multipart/form-data' },
  // });
  // return response.data.url; // 업로드된 이미지 URL
  //
  // 임시 처리: Base64 URL 반환 (로컬 테스트용)
  if (image.base64) {
    return imageToBase64Url(image.base64);
  }
  throw new Error('이미지 업로드 실패: Base64 데이터가 없습니다.');
};
