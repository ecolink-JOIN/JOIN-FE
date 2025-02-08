import React, { useCallback } from 'react';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

interface BottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  component: React.ReactNode;
  snapPoints?: string[];
  [key: string]: any;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  bottomSheetModalRef,
  component,
  snapPoints = ['70%'],
  ...props
}) => {
  const renderBackdrop = useCallback(
    (backdropProps: any) => (
      <BottomSheetBackdrop {...backdropProps} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      style={{
        zIndex: 10,
        elevation: 10,
      }}
      backdropComponent={renderBackdrop}
      handleComponent={null}
      enablePanDownToClose={false}
      {...props}
    >
      <BottomSheetView style={{ flex: 1 }}>{component}</BottomSheetView>
    </BottomSheetModal>
  );
};

export default BottomSheet;
