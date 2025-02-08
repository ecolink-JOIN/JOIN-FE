import React, { useContext } from 'react';
import { useRouter } from 'expo-router';
import CTAView from '@/components/atoms/View/CTAView';
import Button from '@/components/atoms/Button';
import { TermsContext } from '@/context/TermsContext';
import { TermsService } from '@/apis';

function TermsCTA() {
  const router = useRouter();
  const context = useContext(TermsContext);

  if (!context) {
    throw new Error('TermsContext must be used within a TermsProvider');
  }

  const { terms } = context;
  const allRequiredChecked = terms.filter((option) => option.required).every((option) => option.checked);

  const handleStartPress = async () => {
    const body: Terms.AgreeRequest = {
      terms: terms.map((term) => ({
        id: term.id,
        version: term.version,
        status: term.checked ? 'Y' : 'N',
      })),
    };
    await TermsService().agree(body);
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
