import React from 'react';
import Typography from '@/components/atoms/Typography';
import FormModView from '@/components/atoms/View/FormMods';
import { DatePicker } from '@/components/atoms/DatePicker';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
interface EndDateProps {
  value: string | null;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}
export const EndDate: React.FC<EndDateProps> = ({ value, bottomSheetModalRef }) => {
  return (
    <FormModView>
      <Typography variant="button">모집 종료일</Typography>
      <DatePicker placeholder="종료 일자" value={value} bottomSheetModalRef={bottomSheetModalRef} />
    </FormModView>
  );
};
