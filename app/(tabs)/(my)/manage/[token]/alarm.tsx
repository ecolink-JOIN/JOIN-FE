import { FlatList, ListRenderItem, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ManageBox, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import styled from 'styled-components/native';
import Icon from '@/components/atoms/Icon';
import { useLocalSearchParams, router, Href } from 'expo-router';
import { BatchJobService } from '@/apis';

const Alarm = () => {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [alarmList, setAlarmList] = useState<BatchJobResponse.BatchJob['data']>([]);

  useEffect(() => {
    BatchJobService()
      .getBatchJobs(token)
      .then((res) => {
        setAlarmList(res);
      });
  }, [token]);

  const renderItem: ListRenderItem<BatchJobResponse.Job> = ({ item }) => (
    <ManageBox>
      <ListComponent
        title={item.day}
        href={`/manage/${token}/alarm-edit?day=${item.day}&time=${item.time}&message=${item.content}`}
      >
        <Typography variant="body2" style={{ color: colors.gray[7] }}>
          {item.time}
        </Typography>
      </ListComponent>
      <AlarmMessage>
        <Typography variant="body2" style={{ color: colors.gray[9] }}>
          {item.content}
        </Typography>
      </AlarmMessage>
    </ManageBox>
  );

  return (
    <FlatList
      style={{ backgroundColor: colors.gray[2], flex: 1 }}
      data={alarmList}
      keyExtractor={(_, index) => index.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      contentContainerStyle={{ padding: 20 }}
      ListHeaderComponent={() => (
        <Typography variant="heading3" style={{ marginBottom: 20 }}>
          자동 알림 메세지 설정
        </Typography>
      )}
      ListFooterComponent={() => (
        <AddAlarm onPress={() => router.push(`/manage/${token}/alarm-add` as Href)}>
          <Icon name="plus-circle-outline" />
          <Typography variant="body2" style={{ color: colors.gray[7] }}>
            추가하기
          </Typography>
        </AddAlarm>
      )}
      renderItem={renderItem}
    />
  );
};

export default Alarm;

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
  margin-top: 20px;
`;
