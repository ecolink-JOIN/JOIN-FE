import { View, Text } from 'react-native';
import TabScreen from '@/components/CustomTab/TabScreen';

const Screen = () => {
  return (
    <TabScreen
      menus={['메뉴1', '메뉴2', '메뉴3']}
      contents={[
        <View style={{ backgroundColor: '#C6DBDA', flex: 1 }}>
          <Text>Content1</Text>
        </View>,
        <View style={{ backgroundColor: '#FED7C3', flex: 1 }}>
          <Text>Content2</Text>
        </View>,
        <View style={{ backgroundColor: '#ECD5E3', flex: 1 }}>
          <Text>Content3</Text>
        </View>,
      ]}
    ></TabScreen>
  );
};

export default Screen;
