import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { UserService } from '@/apis';
import { useGlobalContext } from '@/context/GlobalContext';

const Index = () => {
  const { setUserinfo } = useGlobalContext();
  useEffect(() => {
    UserService()
      .avatars()
      .then((res) => {
        setUserinfo({ nickname: res.nickname, profileImage: res.image.url });
      });
  }, [setUserinfo]);

  return <Redirect href="/(tabs)/(home)" />;
};

export default Index;
