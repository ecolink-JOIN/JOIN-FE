import React from 'react';
import Typography from '@/components/atoms/Typography';
import RowView from '@/components/atoms/View/RowView';
import { colors } from '@/theme';
import { formatNumberWithCommas } from '@/utils/formatNumber';
import { View } from 'react-native';

interface Option {
  name: string;
  fine: number;
}

interface FineOptionsProps {
  options: Option[];
}

const FineOptions: React.FC<FineOptionsProps> = ({ options }) => {
  return (
    <View
      style={{
        marginTop: 14,
      }}
    >
      {options.map((option, index) => (
        <RowView key={index} style={{ justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 }}>
          <Typography variant="body3" style={{ color: colors.gray[9] }}>
            {option.name}
          </Typography>
          <Typography variant="body3">{formatNumberWithCommas(option.fine)}원</Typography>
        </RowView>
      ))}
    </View>
  );
};

export default FineOptions;
