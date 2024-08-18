import React, { useMemo } from 'react';
import { View } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface DateProps {
  value: dayjs.Dayjs | null;
  setValue: any;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolate.CLAMP),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: '#000a31',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );
  return <Animated.View style={containerStyle} />;
};

const App: React.FC<DateProps> = ({ value, setValue, bottomSheetModalRef }) => {
  return (
    <BottomSheetModalProvider>
      <View>
        <BottomSheetModal ref={bottomSheetModalRef} snapPoints={['70%']} backdropComponent={CustomBackdrop}>
          <BottomSheetView>
            <DateTimePicker
              mode="single"
              date={value || new Date()}
              onChange={(params) => {
                setValue(params.date);
                bottomSheetModalRef.current?.dismiss();
              }}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

export default App;
