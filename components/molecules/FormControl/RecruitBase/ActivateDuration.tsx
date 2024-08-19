import { DatePicker } from '@/components/atoms/DatePicker';
import Typography from '@/components/atoms/Typography';
import FormModView from '@/components/atoms/View/FormMods';
import React from 'react';
import dayjs from 'dayjs';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { View } from 'react-native';

interface durationProps {
  start: dayjs.Dayjs | null;
  end: dayjs.Dayjs | null;
}
interface EndDateProps {
  value: durationProps;
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}

export const ActivateDuration: React.FC<EndDateProps> = ({ value, bottomSheetModalRef }) => {
  return (
    <FormModView>
      <Typography variant="button">활동 기간</Typography>
      <View style={{ flexDirection: 'row', gap: 13 }}>
        <DatePicker placeholder="시작 일자" value={value.start} bottomSheetModalRef={bottomSheetModalRef} />
        <DatePicker placeholder="종료 일자" value={value.end} bottomSheetModalRef={bottomSheetModalRef} />
      </View>
    </FormModView>
  );
};
