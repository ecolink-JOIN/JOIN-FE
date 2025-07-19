import React, { useState } from 'react';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import { View } from 'react-native';
import RowView from '@/components/atoms/View/RowView';

const WeeklyParticipationCountSelectPane: React.FC = () => {
  const [value, setValue] = useState<number>(1);

  // TODO: Slider는 확정되면 수정 예정
  return (
    <>
      <Typography variant="heading3">주 몇 회 참석 가능하신가요?</Typography>
      <View style={{ width: '100%', marginTop: 32 }}>
        {/* <Slider
          minimumValue={1}
          maximumValue={7}
          step={1}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.gray[6]}
          thumbTintColor={colors.primary}
        /> */}
        <View style={{ position: 'relative', paddingRight: 20 }}>
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
    </>
  );
};

export default WeeklyParticipationCountSelectPane;
