import { View } from 'react-native';
import StudyInfoSection from '@/components/molecules/StudyInfoSection';
import Button from '@/components/atoms/Button';

const StudyApplicationSection: React.FC = () => {
  return (
    <>
      <View style={{ paddingHorizontal: 28, gap: 10 }}>
        <StudyInfoSection title="지원 자격" content="키 140이상" />
      </View>

      <View
        style={{
          padding: 20,
        }}
      >
        <Button variant="contained" fullWidth size="large">
          신청하기
        </Button>
      </View>
    </>
  );
};

export default StudyApplicationSection;
