import { View } from 'react-native';

import Button from '@/components/atoms/Button';

function ButtonSection() {
  return (
    <View>
      <Button variant="contained">버튼</Button>
      <Button variant="outlined">버튼</Button>
      <Button variant="contained" disabled>
        버튼
      </Button>
    </View>
  );
}

export default ButtonSection;
