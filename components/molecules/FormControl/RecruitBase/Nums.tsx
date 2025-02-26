import React from 'react';
import { View } from 'react-native';
import Typography from '@/components/atoms/Typography';
import { Radio } from '@/components/atoms/Radio';
import { Stepper } from '@/components/atoms/Stepper';

export const Nums = ({ value, setValue }: { value: number; setValue: (value: number) => void }) => {
  const [selected, setSelected] = React.useState(false);
  return (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <Typography variant="button">모집 인원</Typography>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Radio selected={selected} onSelect={setSelected} />
          <Typography variant="body2" style={{ marginLeft: 8 }} onPress={() => setSelected(!selected)}>
            모집 인원 미정
          </Typography>
        </View>
        <Stepper active={!selected} step={value} stepConverter={setValue} />
      </View>
    </View>
  );
};
