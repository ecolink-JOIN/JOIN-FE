import React from 'react';
import { useRouter } from 'expo-router';
import Button from '@/components/atoms/Button';
import CTAView from '@/components/atoms/View/CTAView';
import { useNickNameContext } from '@/context/NickNameContext';

function NickNameCTA() {
  const { isNickNameValid } = useNickNameContext();
  const router = useRouter();

  const handleButtonClick = async () => {
    router.replace('/(tabs)');
  };

  return (
    <CTAView>
      <Button
        variant="contained"
        size="large"
        fullWidth
        onPress={handleButtonClick}
        disabled={isNickNameValid !== true}
      >
        스터디 둘러보기
      </Button>
    </CTAView>
  );
}

export default NickNameCTA;
