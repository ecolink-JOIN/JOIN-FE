import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import React from 'react';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import Icon from '@/components/atoms/Icon';
import { Href, router } from 'expo-router';
import { AvatarsService } from '@/apis';
import { TokenStorage } from '@/apis/axios';
type List = {
  title: string;
  href: string;
}[];

const list: List = [
  {
    title: '계정 정보',
    href: '/myinfo/account-info',
  },
  {
    title: '앱 설정',
    href: '/myinfo/app-setting',
  },
  {
    title: '차단 관리',
    href: '/myinfo/block-manage',
  },
  {
    title: '로그아웃',
    href: '/myinfo/app-setting',
  },
];

const Index = () => {
  return (
    <ManageView>
      <Typography variant="heading3">내 정보</Typography>
      <ManageBoxView style={shadowStyles.shadow}>
        {list.map((item, index) => (
          <LinkView
            key={index}
            last={index === list.length - 1}
            onPress={() => {
              if (index !== list.length - 1) {
                router.push(item.href as unknown as Href);
              } else {
                AvatarsService()
                  .logout()
                  .then(() => {
                    TokenStorage.clear();
                    router.replace('/(auth)');
                  });
              }
            }}
          >
            <Typography variant="button">{item.title}</Typography>
            {index === list.length - 1 || <Icon name="arrow-right" />}
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
