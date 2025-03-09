import { View } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ManageView, shadowStyles, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import { styled } from 'styled-components/native';
import Button from '@/components/atoms/Button';
import { CircleCheckbox } from '@/components/atoms/Checkbox';

const Certify = () => {
  const params = useLocalSearchParams<{ user: string }>();
  const [selected, setSelected] = React.useState([false, false, false, false, false, false, false, false, false]);

  const selectedToggle = (index: number) => {
    const newSelected = [...selected];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);
  };

  const approvals = [
    { approve: true, date: '2021-09-01' },
    { approve: false, date: '2021-09-02' },
    { approve: true, date: '2021-09-03' },
    { approve: false, date: '2021-09-04' },
    { approve: true, date: '2021-09-05' },
    { approve: false, date: '2021-09-06' },
    { approve: true, date: '2021-09-07' },
    { approve: false, date: '2021-09-08' },
    { approve: true, date: '2021-09-09' },
    { approve: false, date: '2021-09-10' },
    { approve: true, date: '2021-09-11' },
    { approve: false, date: '2021-09-12' },
    { approve: true, date: '2021-09-13' },
    { approve: false, date: '2021-09-14' },
  ];
  return (
    <ManageView>
      <Typography variant="heading3">스터디 인증 승인</Typography>
      <ManageBox style={[shadowStyles.shadow]}>
        <ProfileImage
          source={require('@/assets/images/profile.png')}
          style={{ width: 80, height: 80, borderRadius: 100 }}
        />
        <Typography variant="heading4" style={{ marginTop: 8 }}>
          닉네임{params.user}
        </Typography>
        <ContentBox>
          {approvals.slice(0, 9).map((approval, index) => {
            const isSelected = selected[index];
            return (
              <ContentView
                key={index}
                onPress={() => selectedToggle(index)}
                style={{ borderColor: isSelected ? colors.primary : colors.gray[2] }}
              >
                {approval.approve || (
                  <View style={{ position: 'absolute', right: 0, top: 0, padding: 8 }}>
                    <CircleCheckbox selected={isSelected} />
                  </View>
                )}
                <Typography variant="gnb">{approval.approve ? '승인 완료' : '미승인'}</Typography>
                <Typography variant="caption2" style={{ color: colors.gray[9] }}>
                  2021-09-01
                </Typography>
              </ContentView>
            );
          })}
          <ButtonBox>
            <Button variant="contained" style={{ flex: 1 }}>
              인증 승인하기
            </Button>
            <Button variant="outlined" style={{ flex: 1 }}>
              인증 반려하기
            </Button>
          </ButtonBox>
        </ContentBox>
      </ManageBox>
    </ManageView>
  );
};

export default Certify;

const ManageBox = styled(ManageBoxView)`
  align-items: center;
  padding: 28px 20px;
`;
const ContentBox = styled(ManageBoxView)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ProfileImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
`;

const ContentView = styled.Pressable`
  border-width: 2px;
  position: relative;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
  height: 92px;
  width: 32%;
  background-color: ${colors.gray[2]};
  border-radius: 12px;
  margin-top: 8px;
`;
const ButtonBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  margin-top: 26px;
`;
