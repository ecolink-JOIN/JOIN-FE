import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

import ThemedView from '@/components/atoms/View/ThemedView';
import { useRouter } from 'expo-router';
import IconButtonGroup from '../molecules/IconButtonGroup';
import StudyHeaderInfo from '../organisms/StudyDetails/StudyHeaderInfo';
import { colors } from '@/theme';
import { useStudyDetailsHeaderAnimation } from '@/hooks/useStudyDetailsHeaderAnimation';

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

type Props = {
  children: React.ReactNode;
  title: string;
  leader: string;
  date: string;
  deadline: string;
};

const StudyDetailsTemplate: React.FC<Props> = ({ children, title, leader, date, deadline }) => {
  const router = useRouter();
  const {
    scrollHandler,
    headerAnimatedStyle,
    iconBackgroundStyle,
    scrollViewBackgroundStyle,
    whiteStrokeStyle,
    blackStrokeStyle,
  } = useStudyDetailsHeaderAnimation();

  return (
    <Container>
      <BackgroundContainer style={scrollViewBackgroundStyle} />
      <IconContainer style={iconBackgroundStyle}>
        <Animated.View style={whiteStrokeStyle}>
          <IconButtonGroup strokeColor={colors.white} onBackPress={() => router.back()} />
        </Animated.View>
        <Animated.View style={blackStrokeStyle}>
          <IconButtonGroup strokeColor={colors.black} onBackPress={() => router.back()} />
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
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
  },
});

export default StudyDetailsTemplate;
