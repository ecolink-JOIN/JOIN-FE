import React, { useEffect, useState } from 'react';
import FormModView from '@/components/atoms/View/FormMods';
import Typography from '@/components/atoms/Typography';
import { View } from 'react-native';
import { CustomDropdown } from '@/components/atoms/Dropdown';
import { sgis } from '@/assets/data/sgis';
import RowView from '@/components/atoms/View/RowView';

export const MeetingLocation = ({
  province,
  setProvince,
  state,
  setState,
}: {
  province: string;
  setProvince: (value: string) => void;
  state: string;
  setState: (value: string) => void;
}) => {
  const [provinceitems] = useState(Object.keys(sgis).map((key) => ({ label: key, value: key })));
  const [stateitems, setStateitems] = useState([{ label: '', value: '' }]);

  useEffect(() => {
    if (province) {
      setStateitems(sgis[province].map((state) => ({ label: state, value: state })));
    }
  }, [province, state]);

  return (
    <FormModView>
      <Typography variant="button">모임 장소</Typography>
      <RowView style={{ justifyContent: 'space-around', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <CustomDropdown
            items={provinceitems}
            placeholder="시/도"
            onChangeValue={(value) => setProvince(value as string)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CustomDropdown items={stateitems} placeholder="구/군" onChangeValue={(value) => setState(value as string)} />
        </View>
      </RowView>
    </FormModView>
  );
};
