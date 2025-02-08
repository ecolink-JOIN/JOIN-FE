import React, { useEffect, useState } from 'react';
import { colors } from '@/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import ArrowDown from '@/assets/images/ArrowDown.svg';

interface CustomStepperProps {
  items: { label: string; value: string }[];
  placeholder: string;
  showArrow?: boolean;
  onChangeValue: (value: string | null, idx?: number) => void;
  idx?: number;
  defaultValue?: string | null;
}

const CustomDropdown: React.FC<CustomStepperProps> = ({
  items,
  placeholder,
  showArrow = true,
  onChangeValue,
  idx,
  defaultValue,
}) => {
  const [value, setValue] = useState<string | null>(defaultValue || null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onChangeValue(value, idx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <DropDownPicker
      placeholder={placeholder}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      showTickIcon={true}
      showArrowIcon={showArrow}
      listMode="SCROLLVIEW"
      ArrowDownIconComponent={() => <ArrowDown style={{ margin: 0 }} />}
      ArrowUpIconComponent={() => <ArrowDown style={{ transform: [{ rotate: '180deg' }], margin: 0 }} />}
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
  );
};

export default CustomDropdown;
