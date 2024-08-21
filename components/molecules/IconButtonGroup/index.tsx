import IconButton from '@/components/atoms/IconButton';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

type IconButtonGroupProps = {
  strokeColor: string;
  onBackPress: () => void;
};

const IconButtonGroup: React.FC<IconButtonGroupProps> = ({ strokeColor, onBackPress }) => (
  <SafeAreaView style={styles.iconButtonContainer}>
    <IconButton name="arrow-left" svgProps={{ stroke: strokeColor }} onPress={onBackPress} />
    <IconButton name="ellipsis" svgProps={{ stroke: strokeColor }} />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  iconButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default IconButtonGroup;
