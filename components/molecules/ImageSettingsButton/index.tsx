import React, { useCallback, useRef } from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { BottomSheetHandle, BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from '@/components/molecules/BottomSheet';
import Typography from '@/components/atoms/Typography';
import RowView from '@/components/atoms/View/RowView';
import styled from 'styled-components/native';
import Icon from '@/components/atoms/Icon';
import { colors } from '@/theme';

const ImageSettingsButton = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

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
                <Row>
                  <Typography variant="subtitle2">프로필 사진 설정</Typography>
                </Row>

                <Row>
                  <Icon name="library-outline" />
                  <Typography variant="body2" style={{ color: colors.gray[10] }}>
                    라이브러리에서 선택
                  </Typography>
                </Row>

                <Row>
                  <Icon name="camera-outline" />
                  <Typography variant="body2" style={{ color: colors.gray[10] }}>
                    사진 촬영
                  </Typography>
                </Row>

                <Row>
                  <Icon name="delete-outline" />
                  <Typography variant="body2" style={{ color: colors.red[6] }}>
                    프로필 사진 제거
                  </Typography>
                </Row>
              </View>
            </ScrollView>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default ImageSettingsButton;

const Row = styled(RowView)`
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
