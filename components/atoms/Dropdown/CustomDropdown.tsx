import React, { Dispatch, SetStateAction, useState } from 'react';
import { colors } from '@/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import ArrowDown from '@/assets/images/ArrowDown.svg';

interface CustomStepperProps {
  items: { label: string; value: string }[];
  placeholder: string;
  showArrow?: boolean;
  value: string | null;
  setValue: Dispatch<SetStateAction<string | null>> | any;
}

const CustomDropdown: React.FC<CustomStepperProps> = ({ items, placeholder, showArrow = true, value, setValue }) => {
  const [open, setOpen] = useState(false);
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
  );
};

export default CustomDropdown;
