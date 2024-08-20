import React, { Dispatch, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { DateTimeProps } from '@/components/molecules/FormControl/RecruitBase/DateTime';
import { CustomDropdown } from '../Dropdown';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Button from '@/components/atoms/Button';
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
    newDayTime.push({ day: '', startTime: '', endTime: '' });
    setDayTime(newDayTime);
  };

  const onChangeTime = (event: DateTimePickerEvent, selectedTime: Date | undefined) => {
    const Time = selectedTime?.getHours() + ':' + selectedTime?.getMinutes();
    const newDayTime = [...dayTime];
    if (start) newDayTime[idx].startTime = Time;
    else newDayTime[idx].endTime = Time;
    setDayTime(newDayTime);
    setShow(false);
    setTime(new Date());
  };

  const onChangeDay = (value: string | null) => {
    const newDayTime = [...dayTime];
    newDayTime[idx].day = value || '';
    setDayTime(newDayTime);
  };

  // useEffect(() => {
  //   const newDayTime = [...dayTime];
  //   newDayTime[idx].day = value || '';
  //   setDayTime(newDayTime);
  // }, [value]);

  const showTimepicker = () => {
    setShow(true);
  };
  return (
    <View>
      <View style={{ height: 100, gap: 5 }}>
        {dayTime.map((item, idx) => {
          return (
            <View style={{ flexDirection: 'row', gap: 40, height: 50 }} key={idx}>
              <View style={{ width: 150 }}>
                <CustomDropdown items={items} placeholder="요일" value={dayTime[idx].day} setValue={onChangeDay} />
              </View>
              <Pressable
                onPress={() => {
                  setStart(true);
                  setIdx(idx);
                  showTimepicker();
                }}
                style={{ borderColor: 'black', borderWidth: 1, width: 50, height: 50 }}
              >
                <Text>{item.startTime}시작</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setStart(false);
                  setIdx(idx);
                  showTimepicker();
                }}
                style={{ borderColor: 'black', borderWidth: 1, width: 50, height: 50 }}
              >
                <Text>{item.endTime}종료</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
      <Button variant="contained" onPress={addDayTime} style={{ margin: 10 }}>
        +
      </Button>
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
