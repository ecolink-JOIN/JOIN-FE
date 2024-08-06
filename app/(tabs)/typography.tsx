import TypographySection from '@/components/organisms/TypographySection';
import ButtonSection from '@/components/organisms/ButtonSection';
import BadgeComponentList from '@/components/organisms/BadgeComponentList';
import FormList from '@/components/organisms/FormList';
import { ScrollView } from 'react-native';

function TypographyScreen() {
  return (
    <>
      <TypographySection />
      <ScrollView style={{ maxHeight: 300 }}>
        <BadgeComponentList />
        <ButtonSection />
        <FormList />
      </ScrollView>
    </>
  );
}

export default TypographyScreen;
