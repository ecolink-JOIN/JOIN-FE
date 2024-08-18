import React from 'react';
import Typography from '@/components/atoms/Typography';
import FormModView from '@/components/atoms/View/FormMods';
import { DatePicker } from '@/components/atoms/DatePicker';
import dayjs from 'dayjs';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
interface EndDateProps {
  value: dayjs.Dayjs | null;
  setValue: any;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}
export const EndDate: React.FC<EndDateProps> = ({ value, setValue, bottomSheetModalRef }) => {
  return (
    <FormModView>
      <Typography variant="button">모집 종료일</Typography>
      <DatePicker placeholder="종료 일자" value={value} setValue={setValue} bottomSheetModalRef={bottomSheetModalRef} />
    </FormModView>
  );
};
