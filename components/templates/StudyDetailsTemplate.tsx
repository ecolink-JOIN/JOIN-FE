import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Modal } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import ThemedView from '@/components/atoms/View/ThemedView';
import { useRouter } from 'expo-router';
import IconButtonGroup from '../molecules/IconButtonGroup';
import StudyHeaderInfo from '../organisms/StudyDetails/StudyHeaderInfo';
import { colors } from '@/theme';
import { useStudyDetailsHeaderAnimation } from '@/hooks/useStudyDetailsHeaderAnimation';
import Button from '../atoms/Button';

const HEADER_HEIGHT = 130;

const Container = styled(ThemedView)`
  flex: 1;
  position: relative;
`;

const Header = styled(Animated.View)`
  overflow: hidden;
`;

const Content = styled(ThemedView)`
  flex: 1;
  gap: 24px;
  padding-bottom: 20px;
  overflow: hidden;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const IconContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 8px 20px 8px 10px;
  z-index: 10;
  align-items: flex-start;
`;

const BackgroundContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${HEADER_HEIGHT + 100}px;
  z-index: -1;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.8);
  padding-horizontal: 20px;
  gap: 8px;
  padding-bottom: 40px;
`;

type Props = {
  children: React.ReactNode;
  title: string;
  leader: string;
  date: string;
  deadline: string;
};

const StudyDetailsTemplate: React.FC<Props> = ({ children, title, leader, date, deadline }) => {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    scrollHandler,
    headerAnimatedStyle,
    iconBackgroundStyle,
    scrollViewBackgroundStyle,
    whiteStrokeStyle,
    blackStrokeStyle,
  } = useStudyDetailsHeaderAnimation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Container>
      <BackgroundContainer style={scrollViewBackgroundStyle} />
      <IconContainer style={iconBackgroundStyle}>
        <Animated.View style={whiteStrokeStyle}>
          <IconButtonGroup strokeColor={colors.white} onBackPress={() => router.back()} onEllipsisPress={toggleModal} />
        </Animated.View>
        <Animated.View style={blackStrokeStyle}>
          <IconButtonGroup strokeColor={colors.black} onBackPress={() => router.back()} onEllipsisPress={toggleModal} />
        </Animated.View>
      </IconContainer>
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        style={[{ flex: 1 }, scrollViewBackgroundStyle]}
      >
        <Header style={[headerAnimatedStyle, styles.header]}>
          <StudyHeaderInfo title={title} leader={leader} date={date} deadline={deadline} />
        </Header>
        <Content>{children}</Content>
      </Animated.ScrollView>

      <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={toggleModal}>
        <ModalContainer>
          <Button variant="contained" fullWidth size="large" onPress={() => router.push('/(report)')}>
            신고하기
          </Button>
          <Button variant="default" fullWidth size="large" onPress={toggleModal}>
            취소
          </Button>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
  },
});

export default StudyDetailsTemplate;
