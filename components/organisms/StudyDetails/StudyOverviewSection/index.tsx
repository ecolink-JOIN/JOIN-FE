import React from 'react';
import { View } from 'react-native';
import Badge from '@/components/atoms/Badge';
import InfoWithRating from '@/components/molecules/Card/InfoWithRating';
import StudyInfoSection from '@/components/molecules/StudyInfoSection';
import { colors } from '@/theme';

const StudyOverviewSection: React.FC = () => {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingTop: 28,
          paddingBottom: 28,
          paddingRight: 8,
        }}
      >
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Badge variant="outlined" value="오프라인" />
          <Badge variant="contained" value="모집중" />
        </View>
        <View style={{ gap: 4 }}>
          <InfoWithRating name="스터디장" rating={4.5} />
          <InfoWithRating name="스터디원" rating={3.8} />
        </View>
      </View>

      <View
        style={{
          backgroundColor: colors.sub2,
          borderRadius: 12,
          padding: 20,
          gap: 10,
        }}
      >
        <StudyInfoSection title="스터디 소개" content="안녕하세요. 영어 일기쓰기 모임 함께 하실 스터디원 모집해요!" />
      </View>

      <View style={{ gap: 4, paddingTop: 24, paddingHorizontal: 8 }}>
        <StudyInfoSection row title="모집인원" content="2명" />
        <StudyInfoSection row title="활동기간" content="2024.08.01 - 2024.10.31" />
        <StudyInfoSection
          row
          title="일시"
          content={`화요일 20:00 - 22:00
수요일 20:00 - 22:00
목요일 20:00 - 22:00`}
        />
      </View>
    </View>
  );
};

export default StudyOverviewSection;
