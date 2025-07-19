import React, { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import { CustomDropdown } from '../Dropdown';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import TimePicker from './TimePicker';
import Hyphen from '@/assets/images/hyphen.svg';
import Plus from '@/assets/images/plus-circle-style-outline.svg';
import CloseIcon from '@/assets/images/CloseIcon';
import { colors } from '@/theme';
import Typography from '../Typography';
import RowView from '../View/RowView';
import { useFormContext } from '@/context/FormContext';

interface DateTimeProps {
  weekOfDay: SharedStudy.PossibleDays | null;
  stTime: string | undefined;
  endTime: string | undefined;
}

const DateTimeList = () => {
  const { setValue } = useFormContext();
  const [dayTime, setDayTime] = useState<DateTimeProps[]>([]);
  const [time, setTime] = useState<Date>(new Date());
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(true);
  const [idx, setIdx] = useState(0);
  const items: { label: string; value: SharedStudy.PossibleDays }[] = [
    { label: '월', value: 'MON' },
    { label: '화', value: 'TUE' },
    { label: '수', value: 'WED' },
    { label: '목', value: 'THU' },
    { label: '금', value: 'FRI' },
    { label: '토', value: 'SAT' },
    { label: '일', value: 'SUN' },
  ];

  useEffect(() => {
    const schedules: StudyRequest.Schedule[] = [];
    dayTime.forEach((item) => {
      if (item.weekOfDay !== null && item.stTime !== undefined && item.endTime !== undefined) {
        schedules.push({ weekOfDay: item.weekOfDay, stTime: item.stTime, endTime: item.endTime });
      }
    });
    setValue('schedules', schedules);
  }, [dayTime]);

  const addDayTime = () => {
    setDayTime([...dayTime, { weekOfDay: null, stTime: undefined, endTime: undefined }]);
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
    const Time = Hour + ':' + Min;
    const newDayTime = [...dayTime];
    if (start) newDayTime[idx].stTime = Time;
    else newDayTime[idx].endTime = Time;
    setDayTime(newDayTime);
    setShow(false);
    setTime(new Date());
  };

  const onChangeDay = (value: string | null, idx?: number) => {
    const newDayTime = [...dayTime];
    idx !== undefined && (newDayTime[idx].weekOfDay = value as SharedStudy.PossibleDays);
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
              style={{ height: 44 }}
            >
              <TimePicker
                time={item.stTime === undefined ? '' : item.stTime?.split(':')[0] + ' : ' + item.stTime?.split(':')[1]}
              />
            </Pressable>
            <Hyphen style={{ marginVertical: 'auto' }} />
            <Pressable
              onPress={() => {
                setStart(false);
                setIdx(idx);
                showTimepicker();
              }}
              style={{ height: 44 }}
            >
              <TimePicker
                time={
                  item.endTime === undefined ? '' : item.endTime?.split(':')[0] + ' : ' + item.endTime?.split(':')[1]
                }
              />
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
