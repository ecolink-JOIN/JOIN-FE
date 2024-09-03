import IconButton from '@/components/molecules/IconButton';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

type IconButtonGroupProps = {
  strokeColor: string;
  onBackPress: () => void;
  onEllipsisPress: () => void;
};

const IconButtonGroup: React.FC<IconButtonGroupProps> = ({ strokeColor, onBackPress, onEllipsisPress }) => (
  <SafeAreaView style={styles.iconButtonContainer}>
    <IconButton name="arrow-left" svgProps={{ stroke: strokeColor }} onPress={onBackPress} />
    <IconButton name="ellipsis" svgProps={{ stroke: strokeColor }} onPress={onEllipsisPress} />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  iconButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'space-between',
  },
});

export default IconButtonGroup;
