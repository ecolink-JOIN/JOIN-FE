import React from 'react';
import { useRouter } from 'expo-router';
import Button from '@/components/atoms/Button';
import CTAView from '@/components/atoms/View/CTAView';
import { useNickNameContext } from '@/context/NickNameContext';
import { AvatarsService } from '@/apis';
import FormData from 'form-data';
import axios from 'axios';

function NickNameCTA() {
  const { profileImage, isNickNameValid, nickname } = useNickNameContext();
  const router = useRouter();
  const handleButtonClick = async () => {
    // if (nickname) {
    var body = new FormData();
    // body.append('file', null);
    var request = new Blob([JSON.stringify({ defaultPhoto: true })], { type: 'application/json' });
    body.append('request', request);
    const res = await AvatarsService().photos(body);
    console.log(res);
    // router.replace('/(tabs)');
    // }
  };

  return (
    <CTAView>
      <Button
        variant="contained"
        size="large"
        fullWidth
        onPress={handleButtonClick}
        // disabled={isNickNameValid !== true}
      >
        스터디 둘러보기
      </Button>
    </CTAView>
  );
}

export default NickNameCTA;
