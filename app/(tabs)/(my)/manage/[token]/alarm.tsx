import { FlatList, ListRenderItem, View, ActivityIndicator, Alert } from 'react-native';
import React from 'react';
import { ManageBox, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import styled from 'styled-components/native';
import Icon from '@/components/atoms/Icon';
import { useLocalSearchParams, router, Href } from 'expo-router';
import { BatchJobService } from '@/apis';
import { useQuery } from '@tanstack/react-query';

const Alarm = () => {
  const { token } = useLocalSearchParams<{ token: string }>();

  const {
    data: alarmList,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['batchJobs', token],
    queryFn: () => BatchJobService().getBatchJobs(token),
    enabled: !!token,
  });

  if (error) {
    Alert.alert('오류', '자동 알림 목록을 불러오는데 실패했습니다.');
  }

  const getDayLabel = (day: string) => {
    const dayMap: Record<string, string> = {
      MON: '월요일',
      TUE: '화요일',
      WED: '수요일',
      THU: '목요일',
      FRI: '금요일',
      SAT: '토요일',
      SUN: '일요일',
    };
    return dayMap[day] || day;
  };

  const renderItem: ListRenderItem<BatchJobResponse.Job> = ({ item }) => (
    <ManageBox>
      <ListComponent
        title={getDayLabel(item.day)}
        href={`/manage/${token}/alarm-edit?batchJobId=${item.batchJobId}&day=${item.day}&time=${item.time}&message=${item.content}`}
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

  if (isLoading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={colors.primary} />
      </LoadingContainer>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: colors.gray[2], flex: 1 }}
      data={alarmList || []}
      keyExtractor={(item) => item.batchJobId.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      contentContainerStyle={{ padding: 20 }}
      ListHeaderComponent={() => (
        <Typography variant="heading3" style={{ marginBottom: 20 }}>
          자동 알림 메세지 설정
        </Typography>
      )}
      ListEmptyComponent={() => (
        <EmptyContainer>
          <Typography variant="body3" style={{ color: colors.gray[8], textAlign: 'center' }}>
            등록된 자동 알림이 없습니다.{' \n'}아래 버튼을 눌러 알림을 추가해보세요.
          </Typography>
        </EmptyContainer>
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

const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray[2]};
`;

const EmptyContainer = styled.View`
  padding: 60px 20px;
  align-items: center;
  justify-content: center;
`;

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
  gap: 8px;
  margin-top: 20px;
`;
