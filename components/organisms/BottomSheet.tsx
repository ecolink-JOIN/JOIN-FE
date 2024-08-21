import React, { useCallback } from 'react';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

interface DateProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  component: React.ReactNode;
}

const App: React.FC<DateProps> = ({ bottomSheetModalRef, component }) => {
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} pressBehavior="close" appearsOnIndex={0} disappearsOnIndex={-1} />,
    [],
  );
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal ref={bottomSheetModalRef} snapPoints={['70%']} backdropComponent={renderBackdrop}>
        <BottomSheetView>{component}</BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default App;
