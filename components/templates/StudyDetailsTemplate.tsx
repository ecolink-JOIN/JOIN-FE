import React, { useState } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import { useRouter } from 'expo-router';
import IconButtonGroup from '../molecules/IconButtonGroup';
import StudyHeaderInfo from '../organisms/StudyDetails/StudyHeaderInfo';
import { colors } from '@/theme';
import { useStudyDetailsHeaderAnimation } from '@/hooks/useStudyDetailsHeaderAnimation';
import Button from '../atoms/Button';
import SafeAreaView from '../atoms/View/SafeAreaView';

const Container = styled(SafeAreaView)`
  flex: 1;
  position: relative;
`;

const Header = styled(Animated.View)`
  overflow: hidden;
`;

const Content = styled(View)`
  flex: 1;
  gap: 24px;
  background-color: ${colors.white};
  overflow: hidden;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

const IconContainer = styled(Animated.View)`
  flex: 1;
  background-color: ${colors.primary};
  position: absolute;
  top: -40px;
  left: 0;
  width: 100%;
  padding: 16px 20px 16px 10px;
  z-index: 10;
  align-items: flex-start;
`;

const BackgroundContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -1;
`;

const BodyContainer = styled(View)`
  flex: 1;
  padding-top: 20px;
  background-color: ${colors.primary};
`;

const ModalContainer = styled.Pressable`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.8);
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
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
    haderBackgroundStyle,
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
      <BackgroundContainer style={haderBackgroundStyle} />
      <IconContainer style={iconBackgroundStyle}>
        <Animated.View style={whiteStrokeStyle}>
          <IconButtonGroup strokeColor={colors.white} onBackPress={() => router.back()} onEllipsisPress={toggleModal} />
        </Animated.View>
        <Animated.View style={blackStrokeStyle}>
          <IconButtonGroup strokeColor={colors.black} onBackPress={() => router.back()} onEllipsisPress={toggleModal} />
        </Animated.View>
      </IconContainer>
      <BodyContainer>
        <Animated.ScrollView scrollEventThrottle={16} onScroll={scrollHandler} style={[scrollViewBackgroundStyle]}>
          <Header style={[headerAnimatedStyle]}>
            <StudyHeaderInfo title={title} leader={leader} date={date} deadline={deadline} />
          </Header>
          <Content>{children}</Content>
        </Animated.ScrollView>
      </BodyContainer>

      {isModalVisible && (
        <ModalContainer onPress={toggleModal}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onPress={() => {
              toggleModal();
              router.push(`/(report)/${123456}`);
            }}
          >
            신고하기
          </Button>
          <Button variant="default" fullWidth size="large" onPress={toggleModal}>
            취소
          </Button>
        </ModalContainer>
      )}
    </Container>
  );
};
export default StudyDetailsTemplate;
