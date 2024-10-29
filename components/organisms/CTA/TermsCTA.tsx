import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import CTAView from '@/components/atoms/View/CTAView';
import Button from '@/components/atoms/Button';
import { TermsContext } from '@/context/TermsContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function TermsCTA() {
  const router = useRouter();
  const context = useContext(TermsContext);
  const [sessionId, setSessionId] = useState<string | null>(null);

  if (!context) {
    throw new Error('TermsContext must be used within a TermsProvider');
  }

  const { terms } = context;
  const allRequiredChecked = terms.filter((option) => option.required).every((option) => option.checked);

  useEffect(() => {
    const loadSessionId = async () => {
      try {
        const storedSessionId = await AsyncStorage.getItem('sessionId');
        if (storedSessionId) {
          setSessionId(storedSessionId);
          console.log('Loaded Session ID:', storedSessionId);
        }
      } catch (error) {
        console.error('Failed to load sessionId from AsyncStorage', error);
      }
    };

    loadSessionId();
  }, []);

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
