import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ManageView, ManageBoxView, shadowStyles } from '@/components/molecules/MyMolecules/ManageView';
import { FlatList, Pressable, View } from 'react-native';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import { Href, router, useLocalSearchParams } from 'expo-router';
import Button from '@/components/atoms/Button';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import { Dayjs } from 'dayjs';
import Toast from 'react-native-toast-message';
import { ModalWrapper } from '@/components/molecules/ModalViews';

const StudySchedule = ({
  id,
  bottomSheetModalRef,
}: {
  id: string | string[] | undefined;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
}) => {
  const [duration, setDuration] = useState<{ startDate: DateType; endDate: DateType }>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [is30day, setIs30day] = useState<boolean>(false);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const showToast = ({ text1 }: { text1: string }) => {
    Toast.show({
      type: 'form',
      text1,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };
  const showToastNobutton = ({ text1 }: { text1: string }) => {
    Toast.show({
      type: 'formNoButton',
      text1,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };
  const formattedDate = (date: string | undefined) => {
    return new Date(date || new Date())
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\./g, '.');
  };
  const showToastDate = (dates: any) => {
    setDuration({ startDate: dates.startDate, endDate: dates.endDate });
    if (dates.startDate && dates.endDate) {
      const startDate = dates.startDate instanceof Date ? dates.startDate : (dates.startDate as Dayjs).toDate();
      const endDate = dates.endDate instanceof Date ? dates.endDate : (dates.endDate as Dayjs).toDate();
      const diff = endDate.getTime() - startDate.getTime();
      if (diff < 30 * 24 * 60 * 60 * 1000) showToast({ text1: '스터디 기간은 최소 30일 이상으로 설정해주세요.' });
      else setIs30day(true);
    }
  };
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <ManageView>
      <Typography variant="heading3">스터디 스케쥴</Typography>
      <ManageBoxView style={shadowStyles.shadow}>
        <BoxTitle onPress={handlePresentModalPress}>
          <Typography variant="body3" style={{ color: colors.gray[9] }}>
            스터디 기간
          </Typography>
          <Icon name="arrow-right" />
        </BoxTitle>
        <BoxTitle>
          <Typography variant="button">
            {formattedDate(duration.startDate?.toString())} - {formattedDate(duration.endDate?.toString())}
          </Typography>
        </BoxTitle>
      </ManageBoxView>
      <ManageBoxView style={shadowStyles.shadow}>
        <BoxTitle>
          <Typography variant="body3" style={{ color: colors.gray[9] }}>
            진행 요일 및 시간
          </Typography>
        </BoxTitle>
        {dayAndTime.map((item, index) => (
          <View key={index}>
            <BoxTitle onPress={toggleModal}>
              <Typography variant="button" style={{ color: colors.black }}>
                {item.day}요일
              </Typography>
              <Typography variant="button" style={{ color: colors.gray[9], marginLeft: 'auto', marginRight: 8 }}>
                {item.time}
              </Typography>
              <Icon name="arrow-right" />
            </BoxTitle>
          </View>
        ))}
        <AddAlarm onPress={toggleModal}>
          <Icon name="plus-circle-outline" />
          <Typography variant="body2" style={{ color: colors.gray[7] }}>
            추가하기
          </Typography>
        </AddAlarm>
      </ManageBoxView>
      <Button variant="contained" onPress={() => {}} style={{ marginHorizontal: 'auto' }}>
        저장하기
      </Button>
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef}
        component={
          <DateView>
            <DateTimePicker
              mode="range"
              locale="ko"
              calendarTextStyle={{ fontFamily: 'Pretendard-Medium' }}
              headerButtonColor={colors.primary}
              selectedItemColor={colors.primary}
              startDate={duration.startDate}
              endDate={duration.endDate}
              onChange={(dates) => {
                showToastDate(dates);
              }}
            />
            <ButtonWrapper>
              <Button
                variant="outlined"
                style={{ marginHorizontal: 'auto', width: 85 }}
                onPress={() => bottomSheetModalRef.current?.dismiss()}
              >
                취소
              </Button>
              <Button
                variant="contained"
                disabled={!is30day}
                style={{ marginHorizontal: 'auto' }}
                onPress={() => {
                  bottomSheetModalRef.current?.dismiss();
                  showToastNobutton({ text1: '수정 사항이 성공적으로 반영되었습니다.' });
                }}
              >
                수정하기
              </Button>
            </ButtonWrapper>
          </DateView>
        }
      />
      <ModalWrapper isModalVisible={isModalVisible} toggleModal={toggleModal}>
        <ModalContents>
          <View style={{ paddingHorizontal: 60, width: '100%', alignItems: 'center' }}>
            <Typography variant="subtitle2" style={{ color: colors.gray[9] }}>
              요일
            </Typography>
            <TimeWrapper>
              <TimeBox placeholder="요일" />
            </TimeWrapper>
            <Typography variant="subtitle2" style={{ color: colors.gray[9], marginTop: 20 }}>
              시작 시간
            </Typography>
            <TimeWrapper>
              <TimeBox placeholder="20" />
              <Typography variant="heading1" style={{ margin: 0 }}>
                :
              </Typography>
              <TimeBox placeholder="00" />
            </TimeWrapper>
            <Typography variant="subtitle2" style={{ color: colors.gray[9], marginTop: 20 }}>
              종료 시간
            </Typography>
            <TimeWrapper>
              <TimeBox placeholder="20" />
              <Typography variant="heading1" style={{ margin: 0 }}>
                :
              </Typography>
              <TimeBox placeholder="00" />
            </TimeWrapper>
          </View>
          <ButtonWrapper>
            <Button variant="outlined" onPress={toggleModal} style={{ marginHorizontal: 'auto' }}>
              취소
            </Button>
            <Button variant="contained" onPress={toggleModal} style={{ marginHorizontal: 'auto' }}>
              수정하기
            </Button>
          </ButtonWrapper>
        </ModalContents>
      </ModalWrapper>
    </ManageView>
  );
};

const RuleWrapper = () => {
  const { id } = useLocalSearchParams();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  return <FlatList data={[null]} renderItem={() => <StudySchedule {...{ id, bottomSheetModalRef }} />} />;
};
export default RuleWrapper;

const BoxTitle = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
`;
const AddAlarm = styled.Pressable`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
`;

const dayAndTime = [
  { day: '월', time: '19:00 - 21:00' },
  { day: '수', time: '19:00 - 21:00' },
  { day: '금', time: '19:00 - 21:00' },
  { day: '일', time: '19:00 - 21:00' },
];

const DateView = styled.View`
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const ModalContents = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const TimeWrapper = styled.View`
  flex-direction: row;
  gap: 5px;
  margin-top: 8px;
`;

const TimeBox = styled.TextInput`
  flex: 1;
  background: ${colors.gray[2]};
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 4px;
  text-align: center;
  font-family: 'Pretendard-Medium';
  font-size: 22px;
  color: ${colors.black};
  focus {
    outline: none;
  }
`;
