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

      <Button variant="contained" fullWidth>
        버튼
      </Button>
      <Button variant="contained" size="small">
        버튼
      </Button>
      <Button variant="outlined" size="small">
        버튼
      </Button>
      <Button variant="contained" disabled size="small">
        버튼
      </Button>
    </View>
  );
}

export default ButtonSection;
