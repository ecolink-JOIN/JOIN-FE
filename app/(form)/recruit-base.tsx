import StaticView from '@/components/atoms/View/StaticView';
import React, { useEffect, useRef, useState } from 'react';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import {
  ActivateDuration,
  Category,
  DateTime,
  EndDate,
  MeetingLocation,
  MeetingWay,
  Nums,
} from '@/components/molecules/FormControl/RecruitBase';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import dayjs from 'dayjs';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import DateTimePicker from 'react-native-ui-datepicker';
import { View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import Button from '@/components/atoms/Button';
import { useFormContext } from '@/context/FormContext';
import Toast from 'react-native-toast-message';
interface DurationProps {
  start: dayjs.Dayjs | undefined;
  end: dayjs.Dayjs | undefined;
}

export default function RecruitBase() {
  const { watch, getValues, setValue } = useFormContext();
  const router = useRouter();
  const [duration, setDuration] = useState<DurationProps>({ start: undefined, end: undefined });
  const bottomSheetModalRef1 = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (duration.start && duration.end) {
      setValue('st_date', dayjs(duration.start).format('YYYY-MM-DD'));
      setValue('end_date', dayjs(duration.end).format('YYYY-MM-DD'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  useEffect(() => {
    console.log(watch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch()]);

  const showToast = ({ text1 }: { text1: string }) => {
    Toast.show({
      type: 'form',
      text1,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };
  const onSubmit = () => {
    if (watch('category_name') === null) {
      showToast({ text1: '카테고리를 선택해주세요' });
    } else if (watch('recruit_end_date') === undefined) {
      showToast({ text1: '모집 종료일을 입력해주세요' });
    } else if (watch('st_date') === undefined || watch('end_date') === undefined) {
      showToast({ text1: '스터디 기간을 입력해주세요' });
    } else if (watch('form') === 'OFFLINE' && watch('province') === null) {
      showToast({ text1: '지역을 선택해주세요' });
    } else if (watch('form') === 'OFFLINE' && watch('city') === null) {
      showToast({ text1: '시를 선택해주세요' });
    } else if (watch('regular') === true && (watch('schedules') === null || watch('schedules').length === 0)) {
      showToast({ text1: '진행 요일 및 시간을 입력해주세요' });
    } else {
      router.push('/(form)/recruit-add');
    }
  };

  const renderItem = () => (
    <StyledView>
      <Typography variant="heading4">스터디 기본 정보를 입력해주세요.</Typography>
      <Category
        setValue={(value) => {
          setValue('category_name', value);
        }}
      />
      <Nums value={getValues('capacity')} setValue={(value) => setValue('capacity', value)} />
      <EndDate value={dayjs(watch('recruit_end_date'))} bottomSheetModalRef={bottomSheetModalRef1} />
      <MeetingWay
        online={watch('form') !== 'OFFLINE'}
        setOnline={(value) => setValue('form', value ? 'ONLINE' : 'OFFLINE')}
      />
      {watch('form') === 'OFFLINE' && (
        <MeetingLocation
          province={watch('province')}
          setProvince={(value) => setValue('province', value)}
          state={watch('city')}
          setState={(value) => setValue('city', value)}
        />
      )}
      <ActivateDuration
        value={{
          start: dayjs(watch('st_date')),
          end: dayjs(watch('end_date')),
        }}
        bottomSheetModalRef={bottomSheetModalRef2}
      />
      <DateTime />
      <Button variant="contained" style={{ marginHorizontal: 'auto' }} onPress={onSubmit}>
        다음
      </Button>
    </StyledView>
  );

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <FlatList data={[null]} renderItem={renderItem} />
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef1}
        component={
          <>
            <DateTimePicker
              mode="single"
              selectedItemColor="#FF7F5F"
              date={dayjs(watch('recruit_end_date'))}
              onChange={(params: any) => {
                setValue('recruit_end_date', dayjs(params.date).format('YYYY-MM-DD'));
              }}
            />
            <Button
              variant="contained"
              style={{ marginHorizontal: 'auto' }}
              onPress={() => bottomSheetModalRef1.current?.dismiss()}
            >
              완료
            </Button>
          </>
        }
      />
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef2}
        component={
          <>
            <DateTimePicker
              mode="range"
              locale="ko"
              selectedItemColor="#FF7F5F"
              startDate={duration.start}
              endDate={duration.end}
              onChange={({ startDate, endDate }: any) => {
                if (duration.start !== startDate || duration.end !== endDate) {
                  setDuration({ start: startDate, end: endDate });
                }
              }}
            />
            <Button
              variant="contained"
              style={{ marginHorizontal: 'auto' }}
              onPress={() => bottomSheetModalRef2.current?.dismiss()}
            >
              완료
            </Button>
          </>
        }
      />
    </View>
  );
}
const StyledView = styled(StaticView)`
  margin: 20px 0;
  gap: 20px;
  height: 100%;
`;
