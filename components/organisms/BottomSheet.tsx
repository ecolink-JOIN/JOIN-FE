import React, { useMemo } from 'react';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';

interface DateProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  component?: React.ReactNode;
}

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [0, 1], [0, 1], Extrapolation.CLAMP),
  }));

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

const App: React.FC<DateProps> = ({ bottomSheetModalRef, component }) => {
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={bottomSheetModalRef} snapPoints={['70%']} backdropComponent={CustomBackdrop}>
        <BottomSheetView>{component}</BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default App;
