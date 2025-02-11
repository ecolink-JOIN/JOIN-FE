import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import Chip from '@/components/atoms/Badge';
import { colors } from '@/theme';
import { InfoViewBox } from '@/components/molecules/MyMolecules/InfoView';
import { Href, router } from 'expo-router';
import { UserService } from '@/apis';
export interface InfoProps {
  title: string;
  value: number;
  extraString: string;
}
const FormalInfo = () => {
  const [infoList, setInfoList] = useState<InfoProps[]>([]);
  const [nickname, setNickname] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string>('');

  const fetchInfo = async () => {
    UserService()
      .myPage()
      .then((data) => {
        const { averageAttendanceRate, averageProofRate, averageRating } = data;
        setInfoList([
          { title: '평균 출석률', value: averageAttendanceRate, extraString: '%' },
          { title: '평균 인증률', value: averageProofRate, extraString: '%' },
          { title: '평점', value: averageRating, extraString: '점' },
        ]);
        setNickname(data.nickname);
        setProfileImage(data.image.url);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          router.replace('/(auth)');
        }
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <StyledView>
      <NicknameView>
        <ProfileImage source={profileImage !== '' ? { uri: profileImage } : require('@/assets/images/profile.png')} />
        <View style={{ gap: 12, alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Typography variant="heading4">{nickname}</Typography>
          <Chip
            variant="simple"
            size="large"
            value="내 정보"
            style={{ backgroundColor: colors.gray[2], width: 75, height: 36 }}
            onPress={() => {
              router.push(`myinfo` as Href);
            }}
          />
        </View>
      </NicknameView>
      <InfoViewBox InfoList={infoList} center />
    </StyledView>
  );
};

export default FormalInfo;

const StyledView = styled.View`
  padding: 24px 20px;
  background-color: white;
  gap: 20px;
`;

const NicknameView = styled.View`
  width: 100%;
  padding: 12px;
  flex-direction: row;
  gap: 24px;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 999px;
`;
