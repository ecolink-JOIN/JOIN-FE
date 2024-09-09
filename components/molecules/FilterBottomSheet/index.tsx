import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import IconButton from '@/components/molecules/IconButton';
import BottomSheet from '../BottomSheet';

const FilterBottomSheet = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View style={styles.container}>
      <IconButton name="controller" onPress={handlePresentModalPress} />

      <BottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        component={
          <View style={styles.contentContainer}>
            <Text>상세 검색창 아직 디자인 작업중이라고 함</Text>
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
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default FilterBottomSheet;
