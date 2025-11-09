import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import React from 'react';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import Icon from '@/components/atoms/Icon';
import { Href, router } from 'expo-router';
import { Switch } from '@/components/atoms/Switch';
import { AvatarsService } from '@/apis';
import { Alert, ActivityIndicator } from 'react-native';

const list = [
  {
    title: '선호 설정',
    href: '/myinfo/preference',
  },
  {
    title: '공지사항',
    href: '/myinfo/announce',
  },
  {
    title: '이용약관',
    href: '/myinfo/terms',
  },
];
const Index = () => {
  const [alarm, setAlarm] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePushToggle = async (value: boolean) => {
    try {
      setIsLoading(true);
      const { updatePushConsent } = AvatarsService();

      // FCM 토큰은 실제 구현에서 가져와야 하지만, 일단 빈 문자열로 처리
      // TODO: FCM 토큰 가져오기 로직 추가
      await updatePushConsent({
        consent: value,
        fcmToken: '', // FCM 토큰 필요
      });

      setAlarm(value);
      Alert.alert('알림', value ? '시스템 알림이 활성화되었습니다.' : '시스템 알림이 비활성화되었습니다.');
    } catch (error) {
      console.error('푸시 알림 설정 실패:', error);
      Alert.alert('오류', '푸시 알림 설정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ManageView>
      <Typography variant="heading3">앱 설정</Typography>
      <ManageBoxView style={shadowStyles.shadow}>
        <SystemAlarm>
          <Typography variant="button">시스템 알림</Typography>
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.primary[5]} />
          ) : (
            <Switch value={alarm} onValueChange={handlePushToggle} />
          )}
        </SystemAlarm>
        {list.map((item, index) => (
          <LinkView
            key={index}
            last={index === list.length - 1}
            onPress={() => {
              router.push(item.href as unknown as Href);
            }}
          >
            <Typography variant="button">{item.title}</Typography>
            <Icon name="arrow-right" />
          </LinkView>
        ))}
      </ManageBoxView>
    </ManageView>
  );
};

export default Index;

const LinkView = styled.Pressable<{ last: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  border-bottom-color: ${colors.gray[2]};
  border-bottom-width: ${({ last }) => (last ? 0 : 2)}px;
  align-items: center;
`;

const SystemAlarm = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 14px 20px;
  border-bottom-color: ${colors.gray[2]};
  border-bottom-width: 2px;
  align-items: center;
`;
