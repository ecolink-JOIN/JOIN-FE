import React, { useEffect, useState } from 'react';
import Typography from '@/components/atoms/Typography';
import { View } from 'react-native';
import RowView from '@/components/atoms/View/RowView';
import IconButton from '../IconButton';
import { CustomDropdown } from '@/components/atoms/Dropdown';
import { sgis } from '@/assets/data/sgis';
import Badge from '@/components/atoms/Badge';
import Chip from '@/components/atoms/Badge';

const InterestAreaSelectPane: React.FC = () => {
  const [province, setProvince] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [provinceitems] = useState(Object.keys(sgis).map((key) => ({ label: key, value: key })));
  const [stateitems, setStateitems] = useState([{ label: '', value: '' }]);

  useEffect(() => {
    if (province) {
      setStateitems(sgis[province].map((state) => ({ label: state, value: state })));
    }
  }, [province, state]);

  return (
    <>
      <Typography variant="heading3" style={{ textAlign: 'center' }}>
        모임이 가능한 지역을{'\n'}선택해주세요.
      </Typography>

      <View
        style={{
          flex: 1,
          width: '100%',
        }}
      >
        <RowView style={{ justifyContent: 'space-between', marginBottom: 17.5 }}>
          <Typography variant="body1">지역 선택</Typography>
          <IconButton name="reset-outline" />
        </RowView>

        <RowView style={{ justifyContent: 'space-between', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <CustomDropdown items={provinceitems} placeholder="시/도" onChangeValue={setProvince} />
          </View>
          <View style={{ flex: 1 }}>
            <CustomDropdown items={stateitems} placeholder="구/군" onChangeValue={setState} />
          </View>
        </RowView>

        <RowView style={{ marginTop: 36 }}>
          <Chip variant="white" size="large" value="서울 전체" icon="close-outline" />
        </RowView>
      </View>
    </>
  );
};

export default InterestAreaSelectPane;
