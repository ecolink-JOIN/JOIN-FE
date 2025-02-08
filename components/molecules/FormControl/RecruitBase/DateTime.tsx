import Typography from '@/components/atoms/Typography';
import FormModView from '@/components/atoms/View/FormMods';
import React from 'react';
import { Radio } from '@/components/atoms/Radio';
import { DateTimeList } from '@/components/atoms/Form';
import RowView from '@/components/atoms/View/RowView';

export interface DateTimeProps {
  day: string | null;
  startTime: string | null;
  endTime: string | null;
}

export const DateTime = () => {
  const [regular, setregular] = React.useState(true);
  const [dayTime, setdayTime] = React.useState<DateTimeProps[]>([]);
  return (
    <FormModView>
      <Typography variant="button">진행 요일 및 시간</Typography>
      <RowView style={{ alignItems: 'flex-end', gap: 40 }}>
        <RowView style={{ alignItems: 'flex-end' }}>
          <Radio selected={regular} onSelect={() => setregular(true)} />
          <Typography variant="body2" style={{ marginLeft: 8 }} onPress={() => setregular(true)}>
            정기 모임
          </Typography>
        </RowView>
        <RowView style={{ alignItems: 'flex-end' }}>
          <Radio selected={!regular} onSelect={() => setregular(false)} />
          <Typography variant="body2" style={{ marginLeft: 8 }} onPress={() => setregular(false)}>
            비정기 모임
          </Typography>
        </RowView>
      </RowView>
      {regular && <DateTimeList dayTime={dayTime} setDayTime={setdayTime} />}
    </FormModView>
  );
};
