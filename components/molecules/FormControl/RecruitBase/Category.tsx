import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import Typography from '@/components/atoms/Typography';
import FormModView from '@/components/atoms/View/FormMods';
import ArrowDown from '@/assets/images/ArrowDown.svg';
import { colors } from '@/theme';

export const Category = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'eng', value: '영어' },
    { label: 'math', value: '수학' },
  ]);
  return (
    <FormModView>
      <Typography variant="button">카테고리</Typography>
      <DropDownPicker
        placeholder="카테고리를 선택해주세요."
        open={open}
        value={value}
        items={items}
        stickyHeader={true}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        showTickIcon={true}
        ArrowDownIconComponent={() => <ArrowDown style={{ margin: 12 }} />}
        ArrowUpIconComponent={() => <ArrowDown style={{ transform: [{ rotate: '180deg' }], margin: 12 }} />}
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
        }}
        dropDownContainerStyle={{
          borderColor: '#E8EAEB',
        }}
      />
    </FormModView>
  );
};
