import { Alert, Image, ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ManageBoxView, ManageView } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { colors } from '@/theme';
import { usePostProof } from '@/hooks/useProof';
import { getCurrentISOString } from '@/utils/dateFormatter';
import { pickImage, takePhoto } from '@/utils/imageUpload';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

function ProofScreen() {
  const { studyToken, meetingNo } = useLocalSearchParams<{ studyToken: string; meetingNo: string }>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const postProof = usePostProof();

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

  const handleSubmit = async () => {
    if (!studyToken || !meetingNo) {
      Alert.alert('오류', '스터디 정보가 없습니다.');
      return;
    }

    if (!selectedImage) {
      Alert.alert('오류', '인증 사진을 선택해주세요.');
      return;
    }

    try {
      // TODO: S3 업로드 구현 필요
      // 현재는 로컬 URI를 그대로 사용
      const photoUrl = selectedImage;

      const provenDate = getCurrentISOString();

      postProof.mutate(
        {
          studyToken,
          meetingNo: parseInt(meetingNo),
          proofType: 'PHOTO',
          proofPhotoUrl: photoUrl,
          provenDate,
        },
        {
          onSuccess: () => {
            Alert.alert('인증 완료', '인증이 제출되었습니다. 스터디장의 승인을 기다려주세요.', [
              { text: '확인', onPress: () => router.back() },
            ]);
          },
          onError: (error: any) => {
            Alert.alert('인증 실패', error.response?.data?.message || '인증 제출에 실패했습니다.');
          },
        },
      );
    } catch (error) {
      Alert.alert('오류', '인증 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <ManageView>
      <ScrollView contentContainerStyle={styles.container}>
        <ManageBoxView style={styles.box}>
          <View style={styles.content}>
            <Typography variant="subtitle1" style={styles.title}>
              사진 인증하기
            </Typography>

            <Typography variant="body2" style={styles.description}>
              스터디 활동을 인증할 수 있는 사진을 업로드해주세요.
            </Typography>

            {/* 사진 업로드 버튼 */}
            <Pressable onPress={handlePickImage} disabled={postProof.isPending}>
              {selectedImage ? (
                <View style={styles.imageContainer}>
                  <Image source={{ uri: selectedImage }} style={styles.image} />
                  <Pressable
                    style={styles.removeButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      setSelectedImage(null);
                    }}
                  >
                    <Ionicons name="close-circle" size={32} color={colors.gray[8]} />
                  </Pressable>
                </View>
              ) : (
                <View style={styles.uploadButton}>
                  <Ionicons name="add" size={80} color="white" />
                </View>
              )}
            </Pressable>

            <View style={styles.buttonGroup}>
              <Button
                variant="outlined"
                onPress={handlePickImage}
                disabled={postProof.isPending}
                style={styles.imageButton}
              >
                갤러리에서 선택
              </Button>

              <Button
                variant="outlined"
                onPress={handleTakePhoto}
                disabled={postProof.isPending}
                style={styles.imageButton}
              >
                사진 촬영
              </Button>
            </View>

            <Typography variant="body4" style={styles.notice}>
              • 스터디 활동을 확인할 수 있는 사진을 업로드해주세요.{'\n'}• 제출된 인증은 스터디장의 승인이 필요합니다.
              {'\n'}• 부적절한 인증은 반려될 수 있습니다.
            </Typography>

            <Button
              variant="contained"
              onPress={handleSubmit}
              disabled={!selectedImage || postProof.isPending}
              style={styles.submitButton}
            >
              {postProof.isPending ? '제출 중...' : '인증 제출하기'}
            </Button>

            <Button variant="outlined" onPress={() => router.back()} disabled={postProof.isPending}>
              취소
            </Button>
          </View>
        </ManageBoxView>
      </ScrollView>
    </ManageView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  box: {
    padding: 20,
  },
  content: {
    gap: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    color: colors.gray[7],
  },
  uploadButton: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.gray[4],
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.gray[2],
    borderWidth: 1,
    borderColor: colors.gray[3],
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  imageButton: {
    flex: 1,
  },
  notice: {
    color: colors.gray[6],
    lineHeight: 20,
  },
  submitButton: {
    marginTop: 10,
  },
});

export default ProofScreen;
