import React from 'react';
import { View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import Typography from '@/components/atoms/Typography';
import RowView from '@/components/atoms/View/RowView';
import { colors } from '@/theme';

export type Range = [number, number];
interface SliderSectionProps {
  value: Range;
  onValueChange: (value: Range) => void;
}

const SliderSection: React.FC<SliderSectionProps> = ({ value, onValueChange }) => {
  const minimumValue = 1;
  const maximumValue = 7;

  const isMin = value[0] === minimumValue;
  const isMax = value[1] === maximumValue;

  return (
    <View style={{ gap: 12 }}>
      <Typography variant="body3">참석 횟수</Typography>
      <Slider
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={1}
        value={value}
        onValueChange={([low, high]) => {
          onValueChange([+low, +high]);
        }}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.gray[6]}
        thumbTintColor={colors.primary}
      />
      <View style={{ position: 'relative', paddingRight: 20, bottom: 8 }}>
        <RowView style={{ justifyContent: 'space-between' }}>
          <Typography variant="body3" style={{ color: isMin ? colors.black : colors.gray[7] }}>
            {minimumValue}회
          </Typography>
          <Typography variant="body3" style={{ marginRight: -20, color: isMax ? colors.black : colors.gray[7] }}>
            {maximumValue}회
          </Typography>
        </RowView>
        {!isMin && (
          <Typography
            variant="body3"
            style={{
              position: 'absolute',
              top: 0,
              left: `${((value[0] - 1) / 6) * 100}%`,
            }}
          >
            {value[0]}회
          </Typography>
        )}
        {!isMax && (
          <Typography
            variant="body3"
            style={{
              position: 'absolute',
              top: 0,
              left: `${((value[1] - 1) / 6) * 100}%`,
            }}
          >
            {value[1]}회
          </Typography>
        )}
      </View>
    </View>
  );
};

export default SliderSection;
