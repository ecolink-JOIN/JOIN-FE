import { FlatList } from 'react-native';
import React from 'react';
import { ManageView, ManageBox, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import styled from 'styled-components/native';
import Icon from '@/components/atoms/Icon';
import { useLocalSearchParams, router, Href } from 'expo-router';

const AlarmList = [
  {
    day: '화요일',
    time: '19:50',
    message: '출석 인증이 시작되었습니다. 잊지 말고 출석 체크 진행해주세요 :)',
  },
  {
    day: '목요일',
    time: '22:50',
    message: '오늘 진행한 스터디 내용 정리한 것을 잊지 말고 사진 인증해주세요~',
  },
];

const Alarm = (id: string | string[] | undefined) => {
  return (
    <ManageView>
      <Typography variant="heading3">자동 알림 메세지 설정</Typography>
      {AlarmList.map((alarm, index) => (
        <ManageBox key={index}>
          <ListComponent
            title={alarm.day}
            href={`/manage/${id}/alarm-edit?day=${alarm.day}&time=${alarm.time}&message=${alarm.message}`}
          >
            <Typography variant="body2" style={{ color: colors.gray[7] }}>
              {alarm.time}
            </Typography>
          </ListComponent>
          <AlarmMessage>
            <Typography variant="body2" style={{ color: colors.gray[9] }}>
              {alarm.message}
            </Typography>
          </AlarmMessage>
        </ManageBox>
      ))}
      <AddAlarm onPress={() => router.push(`/manage/${id}/alarm-add` as Href)}>
        <Icon name="plus-circle-outline" />
        <Typography variant="body2" style={{ color: colors.gray[7] }}>
          추가하기
        </Typography>
      </AddAlarm>
    </ManageView>
  );
};

const AlarmWrapper = () => {
  const { id } = useLocalSearchParams();
  return <FlatList data={[null]} renderItem={() => Alarm(id)} />;
};
export default AlarmWrapper;

const AlarmMessage = styled.View`
  margin: 8px 0;
  padding: 12px 16px;
  background-color: ${colors.gray[2]};
  border-width: 1px;
  border-color: ${colors.gray[3]};
  min-height: 100px;
  border-radius: 8px;
`;
const AddAlarm = styled.Pressable`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
