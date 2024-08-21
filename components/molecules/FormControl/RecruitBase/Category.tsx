import React, { useState } from 'react';
import Typography from '@/components/atoms/Typography';
import FormModView from '@/components/atoms/View/FormMods';
import { CustomDropdown } from '@/components/atoms/Dropdown';

export const Category = () => {
  const [value, setValue] = useState<string | null>(null);
  const [items] = useState([
    { label: 'eng', value: '영어' },
    { label: 'math', value: '수학' },
  ]);
  return (
    <FormModView>
      <Typography variant="button">카테고리</Typography>
      <CustomDropdown items={items} placeholder="카테고리를 선택해주세요." onChangeValue={setValue} />
    </FormModView>
  );
};
