import React, { useCallback } from 'react';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

interface BottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  component: React.ReactNode;
  snapPoints?: string[];
}

const BottomSheet: React.FC<BottomSheetProps> = ({ bottomSheetModalRef, component, snapPoints = ['70%'] }) => {
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />,
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
    >
      <BottomSheetView style={{ flex: 1 }}>{component}</BottomSheetView>
    </BottomSheetModal>
  );
};

export default BottomSheet;
