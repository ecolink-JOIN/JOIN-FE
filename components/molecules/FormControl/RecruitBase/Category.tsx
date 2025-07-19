import React, { useState } from 'react';
import Typography from '@/components/atoms/Typography';
import FormModView from '@/components/atoms/View/FormMods';
import { CustomDropdown } from '@/components/atoms/Dropdown';

export const Category = ({ setValue }: { setValue: (value: SharedStudy.Category) => void }) => {
  const [items] = useState<{ label: string; value: SharedStudy.Category }[]>([
    { label: '입시', value: '입시' },
    { label: '고시', value: '고시' },
    { label: '취업', value: '취업' },
    { label: '자격증', value: '자격증' },
    { label: '사이드프로젝트', value: '사이드프로젝트' },
    { label: '기타', value: '기타' },
  ]);
  return (
    <FormModView>
      <Typography variant="button">카테고리</Typography>
      <CustomDropdown
        items={items}
        placeholder="카테고리를 선택해주세요."
        onChangeValue={(value) => setValue(value as SharedStudy.Category)}
      />
    </FormModView>
  );
};
