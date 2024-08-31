import React, { useRef, useState, useEffect } from 'react';
import { View, Pressable, Text, Animated, Dimensions, ScrollView, LayoutChangeEvent } from 'react-native';
// import Color from '../../constants/color';
// import TYPOS from './typo';

interface Props {
  selectedIndex: number;
  onSelectHandler: (selectedIndex: number) => void;
  menus: string[];
  type?: 'fixed' | 'dynamic';
}

interface TabLayout {
  x: number;
  width: number;
}

const Tabs = ({ selectedIndex, onSelectHandler, menus, type = 'fixed' }: Props) => {
  const [tabLayouts, setTabLayouts] = useState<TabLayout[]>([]);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const windowWidth = Dimensions.get('window').width;
  const tabWidth = type === 'fixed' ? windowWidth / menus.length : (tabLayouts[selectedIndex]?.width ?? 0);

  useEffect(() => {
    let toValue = 0;

    if (type === 'dynamic' && tabLayouts[selectedIndex]) {
      toValue = tabLayouts[selectedIndex].x;
    } else if (type === 'fixed') {
      toValue = selectedIndex * tabWidth;
    }

    Animated.timing(animatedValue, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [selectedIndex, tabLayouts, type, tabWidth]);

  const onTabLayout = (event: LayoutChangeEvent, index: number) => {
    if (type === 'dynamic') {
      const { x, width } = event.nativeEvent.layout;
      setTabLayouts((currentLayouts) => {
        const newLayouts = [...currentLayouts];
        newLayouts[index] = { x, width };
        return newLayouts;
      });
    }
  };

  const renderTabIndicator = () => (
    <Animated.View
      style={{
        position: 'absolute',
        transform: [{ translateX: animatedValue }],
        width: tabWidth,
        borderBottomWidth: 1,
        // borderBottomColor: Color.primary700,
        bottom: 0,
      }}
    />
  );

  const renderTab = (menu: string, index: number) => (
    <Pressable
      style={{
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        flex: type === 'fixed' ? 1 : undefined,
      }}
      key={menu}
      onLayout={(event) => onTabLayout(event, index)}
      onPress={() => onSelectHandler(index)}
    >
      <Text
      // style={[
      //   TYPOS.normal,
      //   {
      //     color: selectedIndex === index ? Color.primary700 : Color.neutral1,
      //   },
      // ]}
      >
        {menu}
      </Text>
    </Pressable>
  );

  return type === 'fixed' ? (
    <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
      {renderTabIndicator()}
      {menus.map(renderTab)}
    </View>
  ) : (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        maxHeight: 32,
      }}
    >
      {renderTabIndicator()}
      {menus.map(renderTab)}
    </ScrollView>
  );
};

export default Tabs;
