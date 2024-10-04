import React from 'react';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';
import Typography from '@/components/atoms/Typography';
import RowView from '@/components/atoms/View/RowView';
import { colors } from '@/theme';

interface SliderSectionProps {
  value: number;
  onValueChange: (value: number) => void;
}

const SliderSection: React.FC<SliderSectionProps> = ({ value, onValueChange }) => (
  <View style={{ gap: 12 }}>
    <Typography variant="body3">참석 횟수</Typography>
    <Slider
      minimumValue={1}
      maximumValue={7}
      step={1}
      value={value}
      onValueChange={onValueChange}
      minimumTrackTintColor={colors.primary}
      maximumTrackTintColor={colors.gray[6]}
      thumbTintColor={colors.primary}
    />
    <View style={{ position: 'relative', paddingRight: 20, bottom: 8 }}>
      <RowView style={{ justifyContent: 'space-between' }}>
        <Typography variant="body3" style={{ color: colors.gray[7] }}>
          1회
        </Typography>
        <Typography variant="body3" style={{ marginRight: -20, color: colors.gray[7] }}>
          7회
        </Typography>
      </RowView>
      <Typography
        variant="body3"
        style={{
          position: 'absolute',
          top: 0,
          left: `${((value - 1) / 6) * 100}%`,
        }}
      >
        {value}회
      </Typography>
    </View>
  </View>
);

export default SliderSection;
