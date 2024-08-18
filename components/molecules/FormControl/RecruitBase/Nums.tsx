import React from 'react';
import { View } from 'react-native';
import FormModView from '@/components/atoms/View/FormMods';
import Typography from '@/components/atoms/Typography';
import { Radio } from '@/components/atoms/Radio';
import { Stepper } from '@/components/atoms/Stepper';

export const Nums = () => {
  const [selected, setSelected] = React.useState(false);
  const [step, setStep] = React.useState(1);
  return (
    <View>
      <FormModView>
        <Typography variant="button">모집 인원</Typography>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Radio selected={selected} onSelect={setSelected} />
          <Typography variant="body2" style={{ marginLeft: 8 }}>
            모집 인원 미정
          </Typography>
        </View>
      </FormModView>
      <Stepper active={!selected} step={step} stepConverter={setStep} />
    </View>
  );
};
