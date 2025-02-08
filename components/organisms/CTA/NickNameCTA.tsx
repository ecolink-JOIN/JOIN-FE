import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Button from '@/components/atoms/Button';
import CTAView from '@/components/atoms/View/CTAView';
import { useNickNameContext } from '@/context/NickNameContext';
import { AvatarsService } from '@/apis';
import FormData from 'form-data';

function NickNameCTA() {
  const { profileImage, isNickNameValid, nickname } = useNickNameContext();
  const [isNicknameValid, setisNicknameValid] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isNickNameValid === true) {
      setisNicknameValid(true);
    }
  }, [isNickNameValid]);
  const handleButtonClick = async () => {
    var body = new FormData();
    body.append('file', profileImage);
    body.append('request', {
      string: JSON.stringify({ defaultPhoto: profileImage ? false : true }),
      type: 'application/json',
    });
    AvatarsService()
      .nickname(nickname)
      .then(() => {
        AvatarsService()
          .photos(body)
          .then(() => {
            alert('회원가입이 완료되었습니다.');
            router.replace('/(tabs)');
          })
          .catch(() => {
            alert('프로필 사진 변경 에러');
          });
      })
      .catch(() => {
        alert('닉네임 변경 에러');
      });
  };

  return (
    <CTAView>
      <Button variant="contained" size="large" fullWidth onPress={handleButtonClick} disabled={!isNicknameValid}>
        스터디 둘러보기
      </Button>
    </CTAView>
  );
}

export default NickNameCTA;
