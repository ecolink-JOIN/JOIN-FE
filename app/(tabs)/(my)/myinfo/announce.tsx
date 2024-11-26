import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import React from 'react';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';

const list = [
  {
    title: '약관 변경 안내',
    date: '2024.08.15',
    content: '2024.09.02(월) 부터 변경 약관 적용',
  },
  {
    title: '약관 변경 안내',
    date: '2024.08.15',
    content: '2024.09.02(월) 부터 변경 약관 적용',
  },
  {
    title: '약관 변경 안내',
    date: '2024.08.15',
    content: '2024.09.02(월) 부터 변경 약관 적용',
  },
  {
    title: '약관 변경 안내',
    date: '2024.08.15',
    content: '2024.09.02(월) 부터 변경 약관 적용',
  },
];
const Index = () => {
  return (
    <ManageView>
      <Typography variant="heading3">공지사항</Typography>
      {list.map((item, index) => (
        <ManageBoxView style={shadowStyles.shadow} key={index}>
          <AlarmBox>
            <Header>
              <Typography variant="button">{item.title}</Typography>
              <Typography variant="button" style={{ color: colors.gray[8] }}>
                {item.date}
              </Typography>
            </Header>
            <Typography variant="button" style={{ color: colors.gray[8] }}>
              {item.content}
            </Typography>
          </AlarmBox>
        </ManageBoxView>
      ))}
    </ManageView>
  );
};

export default Index;

const AlarmBox = styled.Pressable`
  padding: 14px 20px;
  gap: 16px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
