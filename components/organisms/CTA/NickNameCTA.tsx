import React from 'react';
import { useRouter } from 'expo-router';
import Button from '@/components/atoms/Button';
import CTAView from '@/components/atoms/View/CTAView';
import { useNickNameContext } from '@/context/NickNameContext';
import { Avatars } from '@/agent/avatars';
import { usePhotoContext } from '@/context/PhotoContext';

function NickNameCTA() {
  const { isNickNameValid, nickname } = useNickNameContext();
  const { photoUri } = usePhotoContext();
  const router = useRouter();

  const handleButtonClick = async () => {
    if (nickname) {
      try {
        const profileImagePayload = {
          file: photoUri ?? undefined,
          request: {
            defaultPhoto: !!photoUri,
          },
        };

        // TODO: 현재 서버 500오류 표출
        const res = await Avatars.changeNickname({ nickname });
        const res2 = await Avatars.changeProfileImage(profileImagePayload);

        console.log(res);
        console.log(res2);

        router.replace('/(tabs)');
      } catch (err) {
        throw err;
      }
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
