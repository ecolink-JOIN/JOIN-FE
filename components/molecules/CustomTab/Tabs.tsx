import React, { useRef, useEffect } from 'react';
import { View, Pressable, Animated, Dimensions } from 'react-native';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';

interface Props {
  selectedIndex: number;
  onSelectHandler: (selectedIndex: number) => void;
  menus: string[];
}

const Tabs = ({ selectedIndex, onSelectHandler, menus }: Props) => {
  const length = menus.length;
  const windowWidth = Dimensions.get('window').width;
  const gap = windowWidth * 0.06;
  const animatedValue = useRef(new Animated.Value(0)).current;
  const tabWidth = (windowWidth - gap * (length + 1)) / length;

  useEffect(() => {
    let toValue = 0;
    toValue = selectedIndex * (tabWidth + gap);
    Animated.timing(animatedValue, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [selectedIndex, tabWidth, animatedValue, gap]);

  const renderTabIndicator = () => (
    <Animated.View
      style={{
        position: 'absolute',
        transform: [{ translateX: animatedValue }],
        width: tabWidth,
        borderBottomWidth: 3,
        borderBottomColor: colors.primary,
        bottom: 0,
        height: 42,
      }}
    />
  );

  const renderTab = (menu: string, index: number) => (
    <Pressable
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingVertical: 10,
      }}
      key={menu}
      onPress={() => onSelectHandler(index)}
    >
      <Typography variant="body3" style={{ color: selectedIndex === index ? colors.primary : colors.gray[7] }}>
        {menu}
      </Typography>
    </Pressable>
  );

  return (
    <View style={{ backgroundColor: 'white' }}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: gap,
          justifyContent: 'space-around',
          gap: gap,
        }}
      >
        {menus.map(renderTab)}
        {renderTabIndicator()}
      </View>
      <View
        style={{
          position: 'absolute',
          backgroundColor: colors.gray[3],
          width: '100%',
          height: 3,
          top: 37,
          zIndex: -1,
        }}
      />
    </View>
  );
};
export default Tabs;
