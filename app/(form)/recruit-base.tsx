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
import { useForm } from 'react-hook-form';

interface DurationProps {
  start: dayjs.Dayjs | null;
  end: dayjs.Dayjs | null;
}

export default function RecruitBase() {
  const { watch, getValues, setValue } = useForm<StudyRequest.Recruit>({
    defaultValues: {
      capacity: 1,
    },
  });
  const router = useRouter();
  const [duration, setDuration] = useState<DurationProps>({ start: null, end: null });
  const bottomSheetModalRef1 = useRef<BottomSheetModal>(null);
  const bottomSheetModalRef2 = useRef<BottomSheetModal>(null);

  useEffect(() => {
    setValue('st_date', dayjs(duration.start).format('YYYY-MM-DD'));
    setValue('end_date', dayjs(duration.end).format('YYYY-MM-DD'));
  }, [duration]);

  useEffect(() => {
    console.log(watch());
  }, [watch()]);

  const onSubmit = () => {
    router.push('/(form)/recruit-add');
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
