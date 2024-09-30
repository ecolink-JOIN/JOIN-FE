import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import IconButton from '@/components/molecules/IconButton';
import BottomSheet from '@/components/molecules/BottomSheet';
import Typography from '@/components/atoms/Typography';
import RowView from '@/components/atoms/View/RowView';
import Chip from '@/components/atoms/Badge';
import CloseHeader from '@/components/molecules/BottomSheet/CloseHeader';
import SliderSection from '@/components/molecules/SliderSection';
import { CustomDropdown } from '@/components/atoms/Dropdown';
import { sgis } from '@/assets/data/sgis';

const FilterBottomSheet = () => {
  const [province, setProvince] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [provinceitems] = useState(Object.keys(sgis).map((key) => ({ label: key, value: key })));
  const [stateitems, setStateitems] = useState([{ label: '', value: '' }]);
  const [value, setValue] = useState<number>(1);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  useEffect(() => {
    if (province) {
      setStateitems(sgis[province].map((state) => ({ label: state, value: state })));
    }
  }, [province, state]);

  return (
    <View style={styles.container}>
      <IconButton name="controller" onPress={handlePresentModalPress} />

      <BottomSheet
        snapPoints={['90%']}
        bottomSheetModalRef={bottomSheetModalRef}
        enableContentPanningGesture={false}
        component={
          <View style={{ flex: 1 }}>
            <CloseHeader onPress={handleCloseModalPress} />

            <View style={{ flex: 1 }}>
              <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 16 }}>
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

                <RowView style={{ justifyContent: 'space-between', marginBottom: 17.5 }}>
                  <Typography variant="body1">지역 선택</Typography>
                  <IconButton name="reset-outline" />
                </RowView>

                <RowView style={{ justifyContent: 'space-between', gap: 12, paddingBottom: 56 }}>
                  <View style={{ flex: 1 }}>
                    <CustomDropdown items={provinceitems} placeholder="시/도" onChangeValue={setProvince} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomDropdown items={stateitems} placeholder="구/군" onChangeValue={setState} />
                  </View>
                </RowView>
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
