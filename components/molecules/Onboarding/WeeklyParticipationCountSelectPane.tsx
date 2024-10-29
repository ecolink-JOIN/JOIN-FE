import React, { Fragment, useState } from 'react';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import { View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import RowView from '@/components/atoms/View/RowView';
import { Range } from '../SliderSection';

const WeeklyParticipationCountSelectPane: React.FC = () => {
  const [value, setValue] = useState<Range>([1, 2]);
  const minimumValue = 1;
  const maximumValue = 7;

  const isMin = value[0] === minimumValue;
  const isMax = value[1] === maximumValue;
  return (
    <Fragment>
      <Typography variant="heading3">주 몇 회 참석 가능하신가요?</Typography>
      <View style={{ width: '100%', marginTop: 32 }}>
        <Slider
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={1}
          value={value}
          onValueChange={([low, high]) => {
            setValue([+low, +high]);
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
    </Fragment>
  );
};

export default WeeklyParticipationCountSelectPane;
