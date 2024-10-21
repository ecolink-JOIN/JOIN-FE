import React from 'react';
import { useRouter } from 'expo-router';
import Button from '@/components/atoms/Button';
import CTAView from '@/components/atoms/View/CTAView';
import { useNickNameContext } from '@/context/NickNameContext';
import { Avatars } from '@/agent/avatars';

function NickNameCTA() {
  const { isNickNameValid, nickname } = useNickNameContext();
  const router = useRouter();

  const handleButtonClick = async () => {
    if (nickname) {
      const res = await Avatars.changeNickname({ nickname });
      console.log(res);
      router.replace('/(tabs)');
    }
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
