import React, { useCallback, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import IconButton from '@/components/molecules/IconButton';
import BottomSheet from '@/components/molecules/BottomSheet';
import Typography from '@/components/atoms/Typography';
import RowView from '@/components/atoms/View/RowView';
import Icon from '@/components/atoms/Icon';
import { colors } from '@/theme';
import Chip from '@/components/atoms/Badge';
import Slider from '@react-native-community/slider';
import CloseHeader from '@/components/molecules/BottomSheet/CloseHeader';
import SliderSection from '@/components/molecules/SliderSection';

const FilterBottomSheet = () => {
  const [value, setValue] = useState<number>(1);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <View style={styles.container}>
      <IconButton name="controller" onPress={handlePresentModalPress} />

      <BottomSheet
        snapPoints={['90%']}
        bottomSheetModalRef={bottomSheetModalRef}
        component={
          <View style={{ flex: 1 }}>
            <CloseHeader onPress={handleCloseModalPress} />

            <View style={{ flex: 1 }}>
              <ScrollView style={{ paddingHorizontal: 20, paddingTop: 16 }}>
                <View style={{ gap: 28, marginBottom: 32 }}>
                  <RowView style={{ justifyContent: 'space-between' }}>
                    <Typography variant="body1">스터디 설정</Typography>
                    <IconButton name="reset-outline" />
                  </RowView>

                  <View style={{ gap: 12 }}>
                    <Typography variant="body3">모임 형태</Typography>
                    <RowView style={{ gap: 8 }}>
                      <Chip variant="white" value="온라인" />
                      <Chip variant="primary" value="오프라인" />
                    </RowView>
                  </View>

                  <View style={{ gap: 12 }}>
                    <Typography variant="body3">관심 분야</Typography>
                    <RowView style={{ gap: 8 }}>
                      <Chip variant="white" value="TEST" />
                    </RowView>
                  </View>

                  <View style={{ gap: 12 }}>
                    <Typography variant="body3">참가 가능 요일</Typography>
                    <RowView style={{ gap: 8 }}>
                      <Chip variant="white" value="TEST" />
                    </RowView>
                  </View>
                  <View style={{ gap: 12 }}>
                    <Typography variant="body3">참가 가능 시간대</Typography>
                    <RowView style={{ gap: 8 }}>
                      <Chip variant="white" value="TEST" />
                      <Chip variant="white" value="TEST" />
                      <Chip variant="white" value="TEST" />
                      <Chip variant="white" value="TEST" />
                      <Chip variant="white" value="TEST" />
                      <Chip variant="white" value="TEST" />
                      <Chip variant="white" value="TEST" />
                    </RowView>
                  </View>
                  <SliderSection value={value} onValueChange={setValue} />
                </View>

                <RowView style={{ justifyContent: 'space-between' }}>
                  <Typography variant="body1">지역 선택</Typography>
                  <IconButton name="reset-outline" />
                </RowView>
                <Typography variant="body1">질문 답변 받으면 구현</Typography>
              </ScrollView>
            </View>
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

export default FilterBottomSheet;
