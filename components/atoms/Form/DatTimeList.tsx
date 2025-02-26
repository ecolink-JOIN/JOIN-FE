import React, { Dispatch, useState } from 'react';
import { View, Pressable } from 'react-native';
import { DateTimeProps } from '@/components/molecules/FormControl/RecruitBase/DateTime';
import { CustomDropdown } from '../Dropdown';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import TimePicker from './TimePicker';
import Hyphen from '@/assets/images/hyphen.svg';
import Plus from '@/assets/images/plus-circle-style-outline.svg';
import CloseIcon from '@/assets/images/CloseIcon';
import { colors } from '@/theme';
import Typography from '../Typography';
import RowView from '../View/RowView';
interface DateTimeListProps {
  dayTime: DateTimeProps[];
  setDayTime: Dispatch<DateTimeProps[]>;
}

const DateTimeList = ({ dayTime, setDayTime }: DateTimeListProps) => {
  const [time, setTime] = useState<Date>(new Date());
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(true);
  const [idx, setIdx] = useState(0);
  const items = [
    { label: '월', value: '월' },
    { label: '화', value: '화' },
    { label: '수', value: '수' },
    { label: '목', value: '목' },
    { label: '금', value: '금' },
    { label: '토', value: '토' },
    { label: '일', value: '일' },
  ];

  const addDayTime = () => {
    const newDayTime = [...dayTime];
    newDayTime.push({ day: null, startTime: null, endTime: null });
    setDayTime(newDayTime);
  };

  const deleteDayTime = (idx: number) => {
    const newDayTime = [...dayTime];
    newDayTime.splice(idx, 1);
    setDayTime(newDayTime);
  };

  const onChangeTime = (event: DateTimePickerEvent, selectedTime: Date | undefined) => {
    if (event.type === 'dismissed' || selectedTime === undefined) {
      setShow(false);
      return;
    }
    const Hour = selectedTime.getHours().toString().padStart(2, '0');
    const Min = selectedTime.getMinutes().toString().padStart(2, '0');
    const Time = Hour + ' : ' + Min;
    const newDayTime = [...dayTime];
    if (start) newDayTime[idx].startTime = Time;
    else newDayTime[idx].endTime = Time;
    setDayTime(newDayTime);
    setShow(false);
    setTime(new Date());
  };

  const onChangeDay = (value: string | null, idx?: number) => {
    const newDayTime = [...dayTime];
    idx !== undefined && (newDayTime[idx].day = value || null);
    setDayTime(newDayTime);
  };

  const showTimepicker = () => {
    setShow(true);
  };
  return (
    <View style={{ gap: 12 }}>
      {dayTime.map((item, idx) => {
        return (
          <RowView style={{ gap: 8, height: 44, alignItems: 'center' }} key={idx}>
            <View style={{ width: 84, height: 44 }}>
              <CustomDropdown items={items} placeholder="요일" onChangeValue={onChangeDay} idx={idx} />
            </View>
            <Pressable
              onPress={() => {
                setStart(true);
                setIdx(idx);
                showTimepicker();
              }}
            >
              <TimePicker time={item.startTime} />
            </Pressable>
            <Hyphen style={{ marginVertical: 'auto' }} />
            <Pressable
              onPress={() => {
                setStart(false);
                setIdx(idx);
                showTimepicker();
              }}
            >
              <TimePicker time={item.endTime} />
            </Pressable>
            <Pressable onPress={() => deleteDayTime(idx)}>
              <CloseIcon stroke={colors.gray[9]} style={{ marginVertical: 'auto' }} width={24} height={24} />
            </Pressable>
          </RowView>
        );
      })}
      {dayTime.length < 7 && (
        <Pressable onPress={addDayTime} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 }}>
          <Plus />
          <Typography variant="body2" style={{ color: colors.gray[7] }}>
            추가하기
          </Typography>
        </Pressable>
      )}
      {show && (
        <DateTimePicker
          key={'key'}
          value={time}
          mode={'time'}
          is24Hour={true}
          onChange={(event: DateTimePickerEvent, selectedTime: Date | undefined) => {
            onChangeTime(event, selectedTime);
          }}
        />
      )}
    </View>
  );
};

export default DateTimeList;
