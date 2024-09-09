import { Image, View } from 'react-native';
import { colors } from '@/theme';
import Typography from '@/components/atoms/Typography';
import React from 'react';
import styled from 'styled-components/native';
import { Switch } from '@/components/atoms/Switch';
import JoinedStatus from './Main/JoinedStatus';
import { InfoViewBox } from '@/components/molecules/MyMolecules/InfoView';
import Badge from '@/components/atoms/Badge';
import Icon from '@/components/atoms/Icon';

// 진행 현황
export const Status = ({ value }: { value: boolean }) => {
  const [toggle, setToggle] = React.useState(value);

  return (
    <LineView>
      <Typography variant="button">모집 상태</Typography>
      <LineView>
        <Typography variant="button" style={{ color: colors.gray[7], paddingRight: 12 }}>
          모집 완료
        </Typography>
        <Switch value={toggle} onValueChange={setToggle} />
      </LineView>
    </LineView>
  );
};

// 스터디 출석 및 인증 현황
export const Attendance = () => {
  const memberInfo = [
    { name: '김지수', attendance: '100%', certification: '100%', profile: require('@/assets/images/profile.png') },
    { name: '박지수', attendance: '100%', certification: '100%', profile: require('@/assets/images/profile.png') },
    { name: '이지수', attendance: '100%', certification: '100%', profile: require('@/assets/images/profile.png') },
    { name: '홍지수', attendance: '100%', certification: '100%', profile: require('@/assets/images/profile.png') },
    { name: '미지수', attendance: '100%', certification: '100%', profile: require('@/assets/images/profile.png') },
  ];
  return (
    <View style={{ marginVertical: 16 }}>
      <InfoViewBox
        InfoList={[
          { title: '평균 출석률', value: '100%' },
          { title: '평균 인증률', value: '97%' },
        ]}
      />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginTop: 24,
          marginBottom: 8,
          width: 130,
          marginLeft: 'auto',
        }}
      >
        <Badge value="출석" variant="outlined" />
        <Badge value="인증" variant="outlined" />
      </View>
      {memberInfo.map((member, index) => (
        <View
          key={index}
          style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Image source={member.profile} style={{ width: 24, height: 24 }} />
            <Typography variant="body3" style={{ color: colors.gray[9] }}>
              {member.name}
            </Typography>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 130,
              justifyContent: 'space-between',
              paddingHorizontal: 5,
            }}
          >
            <Typography variant="body3" style={{ color: colors.gray[9] }}>
              {member.attendance}
            </Typography>
            <Typography variant="body3" style={{ color: colors.gray[9] }}>
              {member.certification}
            </Typography>
          </View>
        </View>
      ))}
    </View>
  );
};

//스터디 인증 승인
export const Approval = () => {
  const memberInfo = [
    { name: '김지수', approve: false, profile: require('@/assets/images/profile.png') },
    { name: '박지수', approve: true, profile: require('@/assets/images/profile.png') },
    { name: '이지수', approve: false, profile: require('@/assets/images/profile.png') },
    { name: '홍지수', approve: true, profile: require('@/assets/images/profile.png') },
    { name: '미지수', approve: false, profile: require('@/assets/images/profile.png') },
  ];
  return (
    <View style={{ marginVertical: 8 }}>
      {memberInfo.map((member, index) => (
        <View
          key={index}
          style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Image source={member.profile} style={{ width: 24, height: 24 }} />
            <Typography variant="body3" style={{ color: colors.gray[9] }}>
              {member.name}
            </Typography>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Typography variant="body3" style={{ color: member.approve ? colors.gray[9] : colors.primary }}>
              {member.approve ? '승인 완료' : '승인 미완료'}
            </Typography>
            <Icon name="arrow-right" width={24} height={24} stroke={colors.gray[7]} />
          </View>
        </View>
      ))}
    </View>
  );
};

//스터디 카카오톡 링크
export const KakaoLink = () => {
  return (
    <Typography variant="button" style={{ marginVertical: 8 }}>
      https://open.kakao.com/dkfjadfksd
    </Typography>
  );
};

const LineView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;
