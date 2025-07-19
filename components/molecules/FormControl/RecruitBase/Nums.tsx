import React from 'react';
import { View } from 'react-native';
import Typography from '@/components/atoms/Typography';
import { Radio } from '@/components/atoms/Radio';
import { Stepper } from '@/components/atoms/Stepper';

export const Nums = ({ value, setValue }: { value: number | null; setValue: (value: number | null) => void }) => {
  const [selected, setSelected] = React.useState(false);
  return (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <Typography variant="button">모집 인원</Typography>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <Radio
            selected={selected}
            onSelect={() => {
              if (!selected) {
                setValue(null);
              } else {
                setValue(value ?? 1);
              }
              setSelected(!selected);
            }}
          />
          <Typography
            variant="body2"
            style={{ marginLeft: 8 }}
            onPress={() => {
              if (!selected) {
                setValue(null);
              } else {
                setValue(value ?? 1);
              }
              setSelected(!selected);
            }}
          >
            모집 인원 미정
          </Typography>
        </View>
        <Stepper active={!selected} step={value ?? 0} stepConverter={setValue} />
      </View>
    </View>
  );
};
