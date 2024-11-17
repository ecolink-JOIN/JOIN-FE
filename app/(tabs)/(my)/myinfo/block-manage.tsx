import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import React from 'react';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import Icon from '@/components/atoms/Icon';

const list = [
  {
    title: '계정 정보',
    href: '/tabs/my/myinfo/account',
  },
  {
    title: '앱 설정',
    href: '/tabs/my/myinfo/notification',
  },
  {
    title: '차단 관리',
    href: '/tabs/my/myinfo/policy',
  },
  {
    title: '로그아웃',
    href: '/tabs/my/myinfo/version',
  },
];
const Index = () => {
  return (
    <ManageView>
      <Typography variant="heading3">차단 관리</Typography>
      {/* <ManageBoxView style={shadowStyles.shadow}>
        {list.map((item, index) => (
          <LinkView key={index} last={index === list.length - 1}>
            <Typography variant="button">{item.title}</Typography>
            <Icon name="arrow-right" />
          </LinkView>
        ))}
      </ManageBoxView> */}
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
