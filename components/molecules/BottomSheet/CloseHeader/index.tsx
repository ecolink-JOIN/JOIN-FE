import React from 'react';
import { Pressable, View } from 'react-native';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';
import { colors } from '@/theme';

interface CloseHeaderProps {
  onPress: () => void;
}

const CloseHeader: React.FC<CloseHeaderProps> = ({ onPress }) => (
  <View
    style={{
      borderBottomWidth: 2,
      borderBottomColor: colors.gray[2],
    }}
  >
    <Pressable
      onPress={onPress}
      style={{
        height: 56,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Icon name="double-down" />
      <Typography variant="body3" style={{ color: colors.primary }}>
        저장 및 상세 검색창 닫기
      </Typography>
    </Pressable>
  </View>
);

export default CloseHeader;
