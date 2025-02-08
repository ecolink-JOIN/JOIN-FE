import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import Typography from '@/components/atoms/Typography';
import RowView from '@/components/atoms/View/RowView';
import { colors } from '@/theme';

interface RangeSliderSectionProps {
  minValue: number;
  maxValue: number;
  onValueChange: (min: number, max: number) => void;
  min: number;
  max: number;
}

const RangeSliderSection: React.FC<RangeSliderSectionProps> = ({ minValue, maxValue, onValueChange, min, max }) => {
  return (
    <View style={styles.container}>
      <Typography variant="body3">참석 횟수 범위</Typography>

      <View>
        <Slider
          step={1}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.gray[6]}
          minimumValue={min}
          maximumValue={max}
          thumbTintColor={colors.primary}
          value={[minValue, maxValue]} // 범위 값 지정
          onValueChange={([newMin, newMax]) => {
            onValueChange(newMin, newMax); // 범위 변경 시 부모 컴포넌트로 값 전달
          }}
        />
      </View>

      {/* 선택된 범위 표시 */}

      {/* 범위 표시 */}
      <View style={styles.rangeDisplay}>
        <RowView style={{ justifyContent: 'space-between' }}>
          <Typography variant="body3" style={{ color: colors.gray[7] }}>
            {min}회
          </Typography>
          <Typography variant="body3" style={{ color: colors.gray[7] }}>
            {max}회
          </Typography>
        </RowView>
        <Typography
          variant="body3"
          style={{
            position: 'absolute',
            top: 0,
            left: `${((minValue - min) / (max - min + 1)) * 100}%`, // minValue 위치
          }}
        >
          {minValue}회
        </Typography>
        <Typography
          variant="body3"
          style={{
            position: 'absolute',
            top: 0,
            right: `${((max - maxValue) / (max - min + 1)) * 100}%`, // minValue 위치
          }}
        >
          {maxValue}회
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  rangeDisplay: {
    position: 'relative',
  },
});

export default RangeSliderSection;
