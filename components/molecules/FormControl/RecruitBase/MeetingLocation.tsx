import React, { useState } from 'react';
import FormModView from '@/components/atoms/View/FormMods';
import Typography from '@/components/atoms/Typography';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors } from '@/theme';

export const MeetingLocation = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'eng', value: '영어' },
    { label: 'math', value: '수학' },
  ]);
  return (
    <FormModView>
      <Typography variant="button">모임 장소</Typography>
      <DropDownPicker
        placeholder="시/도"
        open={open}
        value={value}
        items={items}
        stickyHeader={true}
        showArrowIcon={false}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        showTickIcon={true}
        textStyle={{
          fontFamily: 'Pretendard-Medium',
          fontSize: 16,
          fontWeight: 500,
          padding: 8,
        }}
        style={{
          borderColor: colors.gray[3],
          borderRadius: 8,
          height: 44,
          zIndex: 0,
        }}
        dropDownContainerStyle={{
          borderColor: '#E8EAEB',
        }}
      />
    </FormModView>
  );
};
