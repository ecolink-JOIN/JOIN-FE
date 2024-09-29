import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';
import { router } from 'expo-router';

interface ManageListProps {
  title: string;
  id: number;
  active?: boolean;
  editHref?: string;
  studyLinks: StudyLinkList[];
}

const ManageList: FC<ManageListProps> = ({ title, id, editHref, active, studyLinks }) => {
  const href = `/manage/${id}/progress`;
  return active ? (
    <Container style={styles.shadow}>
      <TitleView>
        <Typography variant="subtitle1">{title}</Typography>
        {editHref && <Icon name="pencil" onPress={() => router.push(editHref)} />}
      </TitleView>
      {studyLinks.map((list, idx) => (
        <ListView
          key={idx}
          onPress={() => router.push(list.href.replace('[id]', id.toString()))}
          last={idx === studyLinks.length - 1}
        >
          <Typography variant="button">{list.title}</Typography>
          <Icon
            name="arrow-left"
            stroke={colors.primary}
            style={{
              transform: [{ rotate: '180deg' }],
            }}
          />
        </ListView>
      ))}
    </Container>
  ) : (
    <ContainerUnactive>
      <Typography variant="subtitle1" style={{ color: colors.gray[8] }}>
        {title}
      </Typography>
      <Typography variant="body3" style={{ color: colors.gray[7] }}>
        해당 스터디는 종료되었습니다.
      </Typography>
    </ContainerUnactive>
  );
};

export default ManageList;

const Container = styled.View`
  background-color: ${colors.white};
  padding: 20px 20px 8px 20px;
  border-radius: 16px;
`;

const ContainerUnactive = styled.View`
  background-color: ${colors.gray[4] + '60'};
  padding: 20px;
  border-radius: 16px;
  gap: 16px;
`;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.12)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
});

const TitleView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  margin-bottom: 8px;
`;

const ListView = styled.Pressable<{ last?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom-width: ${(props) => (props.last ? '0px' : '1.5px')};
  border-bottom-color: ${colors.gray[3]};
`;
