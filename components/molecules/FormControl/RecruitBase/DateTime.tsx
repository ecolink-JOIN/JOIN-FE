import Typography from '@/components/atoms/Typography';
import FormModView from '@/components/atoms/View/FormMods';
import React from 'react';
import { Radio } from '@/components/atoms/Radio';
import { DateTimeList } from '@/components/atoms/Form';
import RowView from '@/components/atoms/View/RowView';
import { useFormContext } from '@/context/FormContext';

export const DateTime = () => {
  const { watch, setValue } = useFormContext();
  return (
    <FormModView>
      <Typography variant="button">진행 요일 및 시간</Typography>
      <RowView style={{ alignItems: 'flex-end', gap: 40 }}>
        <RowView style={{ alignItems: 'flex-end' }}>
          <Radio
            selected={watch('regular')}
            onSelect={() => {
              setValue('regular', !watch('regular'));
            }}
          />
          <Typography variant="body2" style={{ marginLeft: 8 }} onPress={() => setValue('regular', true)}>
            정기 모임
          </Typography>
        </RowView>
        <RowView style={{ alignItems: 'flex-end' }}>
          <Radio
            selected={!watch('regular')}
            onSelect={() => {
              setValue('regular', false);
            }}
          />
          <Typography variant="body2" style={{ marginLeft: 8 }} onPress={() => setValue('regular', false)}>
            비정기 모임
          </Typography>
        </RowView>
      </RowView>
      {watch('regular') && <DateTimeList />}
    </FormModView>
  );
};
