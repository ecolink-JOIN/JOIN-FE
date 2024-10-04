import { ScrollView, View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ManageView, shadowStyles, ManageBoxView, ListComponent } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import { styled } from 'styled-components/native';
import Button from '@/components/atoms/Button';
import { CircleCheckbox } from '@/components/atoms/Checkbox';

const Member = () => {
  const params = useLocalSearchParams<{ user: string }>();
  const [selected, setSelected] = React.useState([false, false, false, false, false, false, false, false, false]);

  const selectedToggle = (index: number) => {
    const newSelected = [...selected];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);
  };
  const memebers = [
    {
      id: 1,
      nickname: '닉네임1',
      profile: require('@/assets/images/profile.png'),
      attendance: '98%',
      certify: '100%',
      fine: 5000,
    },
    {
      id: 2,
      nickname: '닉네임2',
      profile: require('@/assets/images/profile.png'),
      attendance: '98%',
      certify: '100%',
      fine: 5000,
    },
    {
      id: 3,
      nickname: '닉네임3',
      profile: require('@/assets/images/profile.png'),
      attendance: '98%',
      certify: '100%',
      fine: 5000,
    },
    {
      id: 4,
      nickname: '닉네임4',
      profile: require('@/assets/images/profile.png'),
      attendance: '98%',
      certify: '100%',
      fine: 5000,
    },
    {
      id: 5,
      nickname: '닉네임5',
      profile: require('@/assets/images/profile.png'),
      attendance: '98%',
      certify: '100%',
      fine: 5000,
    },
    {
      id: 6,
      nickname: '닉네임6',
      profile: require('@/assets/images/profile.png'),
      attendance: '98%',
      certify: '100%',
      fine: 5000,
    },
    {
      id: 7,
      nickname: '닉네임7',
      profile: require('@/assets/images/profile.png'),
      attendance: '98%',
      certify: '100%',
      fine: 5000,
    },
  ];

  return (
    <ScrollView>
      <ManageView>
        <Typography variant="heading3">스터디원 관리</Typography>
        <ManageBoxView style={[shadowStyles.shadow]}>
          <Typography
            variant="body3"
            style={{
              color: colors.gray[9],
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}
          >
            스터디 출석 및 인증 현황
          </Typography>
          {memebers.map((member, index) => {
            return (
              <ContentsWrapper key={index}>
                <ContentViewTop>
                  <ProfileImage source={member.profile} style={{ width: 28, height: 28, borderRadius: 100 }} />
                  <Typography variant="body3">{member.nickname}</Typography>
                </ContentViewTop>
                <ContentViewBottom>
                  <Typography variant="body3" style={{ color: colors.gray[9] }}>
                    출석 {member.attendance}
                  </Typography>
                  <Typography variant="body3" style={{ color: colors.gray[9] }}>
                    인증 {member.certify}
                  </Typography>
                  <Typography variant="body3" style={{ color: colors.gray[9] }}>
                    벌금 {member.fine}원
                  </Typography>
                </ContentViewBottom>
              </ContentsWrapper>
            );
          })}
        </ManageBoxView>
        <ManageBox style={shadowStyles.shadow}>
          <ListComponent title="탈퇴 요청 승인" />
        </ManageBox>
      </ManageView>
    </ScrollView>
  );
};

export default Member;

const ContentsWrapper = styled.View`
  border-top-width: 2px;
  border-top-color: ${colors.gray[2]};
  padding: 10px 20px;
  gap: 10px;
`;

const ContentViewTop = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  margin-right: 20px;
`;

const ContentViewBottom = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ManageBox = styled(ManageBoxView)`
  padding: 12px 20px;
`;
