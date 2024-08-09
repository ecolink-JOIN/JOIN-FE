import { Alert } from 'react-native';
import Chip from '../molecules/Badge';
import HorizontalScrollView from '../molecules/View/HorizontalScrollView';

function BadgeComponentList() {
  return (
    <HorizontalScrollView height="40px">
      <Chip
        variant="contained"
        size="small"
        value="Label"
        onPress={() => {
          Alert.alert('알림', '테스트');
        }}
      />
      <Chip variant="outlined" size="small" value="Label" />
      <Chip variant="default" size="small" value="Label" />
      <Chip variant="contained" size="medium" value="Label" />
      <Chip variant="outlined" size="medium" value="Label" />
      <Chip variant="default" size="medium" value="Label" />
      <Chip variant="contained" size="large" value="Label" />
      <Chip variant="outlined" size="large" value="Label" />
      <Chip variant="default" size="large" value="Label" />
      <Chip icon="home" variant="contained" size="medium" value="Label" />
      <Chip icon="home" variant="outlined" size="medium" value="Label" />
      <Chip icon="home-outline" variant="default" size="medium" value="Label" />
      <Chip icon="chevron-down" variant="contained" size="large" value="Label" />
      <Chip icon="chevron-down" variant="outlined" size="large" value="Label" />
      <Chip icon="chevron-down-outline" variant="mixed" size="large" value="Label" />
      <Chip icon="close" variant="contained" size="large" value="Label" />
      <Chip icon="close" variant="outlined" size="large" value="Label" />
      <Chip icon="close-outline" variant="default" size="large" value="Label" />
    </HorizontalScrollView>
  );
}

export default BadgeComponentList;
