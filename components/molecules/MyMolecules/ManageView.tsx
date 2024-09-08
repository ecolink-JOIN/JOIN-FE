import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import { StyleSheet, View } from 'react-native';
import { PropsWithChildren } from 'react';
import Typography from '../../atoms/Typography';
import { router } from 'expo-router';
import Icon from '../../atoms/Icon';

export const ManageView = styled.View`
  background-color: ${colors.gray[2]};
  height: 100%;
  padding: 25px 20px;
  gap: 20px;
`;

export const ManageBoxView = styled.View`
  background-color: ${colors.white};
  padding: 8px 0;
  border-radius: 16px;
`;

export const shadowStyles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
});

const ManageBoxTitle = styled(Typography)`
  color: ${colors.gray[9]};
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray[2]};
  padding: 8px 20px;
`;

export const ManageBox = ({ title, children }: PropsWithChildren<{ title?: string }>) => {
  return (
    <ManageBoxView style={shadowStyles.shadow}>
      {title && <ManageBoxTitle variant="body3">{title}</ManageBoxTitle>}
      <View style={{ paddingHorizontal: 20 }}>{children}</View>
    </ManageBoxView>
  );
};
const ListView = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom-color: ${colors.gray[3]};
`;

export const ListComponent = ({ title, href }: { title: string; href: string }) => {
  return (
    <ListView onPress={() => router.push(href)}>
      <Typography variant="button">{title}</Typography>
      <Icon
        name="arrow-left"
        stroke={colors.primary}
        style={{
          transform: [{ rotate: '180deg' }],
        }}
      />
    </ListView>
  );
};
