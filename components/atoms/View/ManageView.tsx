import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import { StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';

export const ManageView = styled.View`
  background-color: ${colors.gray[2]};
  height: 100%;
  padding: 25px 20px;
  gap: 20px;
`;

export const ManageBoxView = styled.View`
  background-color: ${colors.white};
  padding: 20px;
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

export const ManageBox = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return (
    <ManageBoxView style={shadowStyles.shadow}>
      {title}
      {children}
    </ManageBoxView>
  );
};
