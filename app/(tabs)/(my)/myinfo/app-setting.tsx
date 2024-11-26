import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import React from 'react';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import Icon from '@/components/atoms/Icon';
import { Href, router } from 'expo-router';
import { Switch } from '@/components/atoms/Switch';

const list = [
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
  return (
    <ManageView>
      <Typography variant="heading3">앱 설정</Typography>
      <ManageBoxView style={shadowStyles.shadow}>
        <SystemAlarm>
          <Typography variant="button">시스템 알림</Typography>
          <Switch value={alarm} onValueChange={() => setAlarm(!alarm)} />
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
