import React, { useCallback } from 'react';
import { BottomSheetModal, BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

interface BottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  component: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ bottomSheetModalRef, component }) => {
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />,
    [],
  );
  return (
    <BottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={['70%']} backdropComponent={renderBackdrop}>
      <BottomSheetView>{component}</BottomSheetView>
    </BottomSheetModal>
  );
};

export default BottomSheet;
