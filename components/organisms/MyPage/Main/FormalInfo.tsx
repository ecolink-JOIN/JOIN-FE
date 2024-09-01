import { View } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import Typography from '@/components/atoms/Typography';
import Chip from '@/components/atoms/Badge';
import { colors } from '@/theme';

const FormalInfo = () => {
  const InfoList = [
    { title: '평균 출석률', value: '100%' },
    { title: '평균 인증률', value: '97%' },
    { title: '평점', value: '5.0' },
  ];
  return (
    <StyledView>
      <NicknameView>
        <ProfileImage source={require('@/assets/images/profile.png')} />
        <View style={{ gap: 12, alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Typography variant="heading4">닉네임닉네임</Typography>
          <Chip
            variant="simple"
            size="large"
            value="내 정보"
            style={{ backgroundColor: colors.gray[2], width: 75, height: 36 }}
          />
        </View>
      </NicknameView>
      <InfoView>
        {InfoList.map((info) => (
          <View key={info.title} style={{ alignItems: 'center', gap: 11 }}>
            <Typography variant="body3" style={{ color: colors.primary }}>
              {info.title}
            </Typography>
            <Typography variant="heading3">{info.value}</Typography>
          </View>
        ))}
      </InfoView>
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

const InfoView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background-color: ${colors.primary + '30'};
  border-radius: 16px;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
`;
