import { View, Text, Dimensions } from 'react-native';
import { useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import styled from 'styled-components/native';
import { colors } from '@/theme';

const DotsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 16px;
`;

const Dot = styled.View<{ active: boolean }>`
  width: ${({ active }) => (active ? '16px' : '8px')};
  height: 8px;
  border-radius: 4px;
  background-color: ${colors.white};
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  margin-horizontal: 4px;
`;

function AdsCarousel() {
  const carouselWidth = Dimensions.get('window').width - 40;
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = 5;

  return (
    <View style={{ paddingVertical: 16, paddingHorizontal: 20, position: 'relative' }}>
      <Carousel
        loop
        width={carouselWidth}
        height={(carouselWidth * 116) / 320}
        autoPlay={true}
        data={[...new Array(totalSlides).keys()]}
        autoPlayInterval={5000}
        scrollAnimationDuration={1000}
        style={{
          backgroundColor: colors.sub1,
          borderRadius: 16,
        }}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 30 }}>{index + 1}</Text>
          </View>
        )}
        onProgressChange={(_, absoluteProgress) => {
          setActiveIndex(Math.round(absoluteProgress));
        }}
      />

      <DotsContainer
        style={{
          position: 'absolute',
          bottom: 24,
          alignSelf: 'center',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {Array.from({ length: totalSlides }).map((_, i) => (
          <Dot key={i} active={i === activeIndex} />
        ))}
      </DotsContainer>
    </View>
  );
}

export default AdsCarousel;
