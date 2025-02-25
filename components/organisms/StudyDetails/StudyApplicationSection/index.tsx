import { View } from 'react-native';
import StudyInfoSection from '@/components/molecules/StudyInfoSection';
import Button from '@/components/atoms/Button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';

const StudyApplicationSection = ({ props }: { props: StudyResponse.Detail['data'] | null }) => {
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const handlePress = () => {
    router.push(`/(tabs)/(home)/(study)/${slug}/application`);
  };

  return (
    <>
      <View style={{ paddingHorizontal: 28, gap: 10 }}>
        <StudyInfoSection title="지원 자격" content={props?.qualificationExp ?? ''} />
      </View>

      <View
        style={{
          padding: 20,
          paddingBottom: 40,
        }}
      >
        <Button variant="contained" fullWidth size="large" onPress={handlePress}>
          신청하기
        </Button>
      </View>
    </>
  );
};

export default StudyApplicationSection;
