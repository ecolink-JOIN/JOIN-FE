import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
import CTAView from '@/components/atoms/View/CTAView';
import Button from '@/components/atoms/Button';
import { TermsContext } from '@/context/TermsContext';

function TermsCTA() {
  const router = useRouter();
  const context = useContext(TermsContext);

  if (!context) {
    throw new Error('TermsContext must be used within a TermsProvider');
  }

  const { terms } = context;
  const allRequiredChecked = terms.filter((option) => option.required).every((option) => option.checked);

  const handleStartPress = () => {
    router.push('/(auth)/nickname');
  };

  return (
    <CTAView>
      <Button size="large" fullWidth onPress={handleStartPress} variant="contained" disabled={!allRequiredChecked}>
        회원가입
      </Button>
    </CTAView>
  );
}

export default TermsCTA;
