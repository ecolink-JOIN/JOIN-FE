import { Image, Pressable, View } from 'react-native';
import { colors } from '@/theme';
import Typography from '@/components/atoms/Typography';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Switch } from '@/components/atoms/Switch';
import { InfoViewBox } from '@/components/molecules/MyMolecules/InfoView';
import Badge from '@/components/atoms/Badge';
import Icon from '@/components/atoms/Icon';
import { Href, router, useLocalSearchParams } from 'expo-router';
import RowView from '@/components/atoms/View/RowView';
import Divider from '@/components/atoms/Divider';
import Evaluator from '@/components/molecules/Evaluator';
import Button from '@/components/atoms/Button';

// 스터디 공지
export const StudyAnnouncement = () => {
  return (
    <View style={{ paddingTop: 16, paddingBottom: 12 }}>
      <Typography variant="button" numberOfLines={4} ellipsizeMode="tail" style={{ textAlign: 'left' }}>
        {`오늘은 지난주에 공지드렸듯이\n쉬어가도록 하겠습니다~\n모두 컨디션 회복하시고 목요일에 뵈어요!\n* 다음 시간까지 29페이지까지 예습해오시면 됩니다1234123`}
      </Typography>
    </View>
  );
};

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

interface MyAttendanceProps {
  id: string;
}
export const MyAttendance = ({ id }: MyAttendanceProps) => {
  const handlePress = () => {
    router.push(`/member/${id}/my-attendance` as Href);
  };

  return (
    <View style={{ marginTop: 16, marginBottom: 10 }}>
      <InfoViewBox
        InfoList={[
          { title: '나의 출석률', value: '100%' },
          { title: '나의 인증률', value: '97%' },
        ]}
      />
      <Divider style={{ height: 2, marginHorizontal: -20, width: 'auto', marginTop: 16 }} />
      <Pressable onPress={handlePress}>
        <RowView style={{ paddingTop: 16, justifyContent: 'space-between' }}>
          <Typography variant="button" style={{ color: colors.gray[8] }}>
            자세히 보기
          </Typography>
          <Icon name="arrow-right-outline" width={24} height={24} stroke={colors.gray[8]} />
        </RowView>
      </Pressable>
    </View>
  );
};

// 스터디 스케쥴
export const StudySchedule = () => {
  return (
    <View style={{ marginVertical: 16 }}>
      <RowView style={{ justifyContent: 'space-between' }}>
        <Typography variant="button">스터디 기간</Typography>
        <Typography variant="button" style={{ color: colors.gray[8] }}>
          2024.06.04 - 2024.10.31
        </Typography>
      </RowView>
      <Divider style={{ height: 2, marginHorizontal: -20, width: 'auto', marginTop: 16 }} />
      <View style={{ paddingTop: 16, gap: 16 }}>
        <Typography variant="button">진행 요일 및 시간</Typography>
        <LineView>
          <Typography variant="button" style={{ color: colors.gray[8] }}>
            화요일
          </Typography>
          <Typography variant="button" style={{ color: colors.gray[8] }}>
            20:00 - 22:00
          </Typography>
        </LineView>
        <RowView style={{ justifyContent: 'space-between' }}>
          <Typography variant="button" style={{ color: colors.gray[8] }}>
            목요일
          </Typography>
          <Typography variant="button" style={{ color: colors.gray[8] }}>
            20:00 - 22:00
          </Typography>
        </RowView>
      </View>
    </View>
  );
};

export const MemberEvaluation = () => {
  const [selectedScores, setSelectedScores] = useState<{ [key: string]: number | null }>({
    diligence: null,
    programKnowledge: null,
    learningAtmosphereInfluence: null,
  });

  const handleScoreChange = (badgeValue: string, score: number) => {
    setSelectedScores((prev) => ({
      ...prev,
      [badgeValue]: score,
    }));
  };

  const evaluations = [
    {
      badgeValue: '성실도',
      question: '스터디원은 얼마나 성실하게 스터디에 임했나요?',
    },
    {
      badgeValue: '프로그램 숙지도',
      question: '스터디원은 스터디 프로그램을 잘 숙지하고 있었나요?',
    },
    {
      badgeValue: '학습 분위기 영향',
      question: '스터디원은 학습 분위기에 긍정적인 영향을 주었나요?',
    },
  ];

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        paddingTop: 24,
        paddingBottom: 20,
      }}
    >
      <Image
        source={require('@/assets/images/profile.png')}
        style={{
          width: 80,
          height: 80,
        }}
      />
      <Typography variant="heading4">닉네임</Typography>
      <InfoViewBox
        center
        InfoList={[
          { title: '출석률', value: '95%' },
          { title: '인증률', value: '100%' },
        ]}
      />

      {evaluations.map((evalItem) => (
        <Evaluator
          key={evalItem.badgeValue}
          badgeValue={evalItem.badgeValue}
          question={evalItem.question}
          selectedValue={selectedScores[evalItem.badgeValue]}
          onValueChange={(score: number) => handleScoreChange(evalItem.badgeValue, score)}
        />
      ))}

      <View
        style={{
          justifyContent: 'center',
          padding: 16,
        }}
      >
        <Button variant="contained" onPress={() => router.back()}>
          제출하기
        </Button>
      </View>
    </View>
  );
};

// 평가할 스터디원 선택
export const StudyEvaluation = () => {
  const memberInfo = [
    {
      name: '김지수',
      leader: true,
      id: 1,
      profile: require('@/assets/images/profile.png'),
    },
    {
      name: '박지수',
      leader: false,
      id: 2,
      profile: require('@/assets/images/profile.png'),
    },
    {
      name: '이지수',
      leader: false,
      id: 3,
      profile: require('@/assets/images/profile.png'),
    },
    {
      name: '홍지수',
      leader: false,
      id: 4,
      profile: require('@/assets/images/profile.png'),
    },
    {
      name: '미지수',
      leader: false,
      id: 5,
      profile: require('@/assets/images/profile.png'),
    },
  ];

  const handleEvaluationPress = (memberId: string | number) => {
    router.push(`/member/evaluation?user=${memberId}` as Href);
  };

  return (
    <View style={{ marginVertical: 16 }}>
      {memberInfo.map((member) => (
        <View
          key={member.id}
          style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 6, gap: 8 }}>
            <Image source={member.profile} style={{ width: 24, height: 24 }} />
            <Typography
              variant="body3"
              style={{ color: colors.gray[9], fontWeight: member.leader ? 'bold' : 'normal' }}
            >
              {member.name}
              {member.leader ? ' (스터디장)' : ''}
            </Typography>
          </View>
          <Pressable
            onPress={() => handleEvaluationPress(member.id)}
            style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 }}
          >
            <Typography variant="body3" style={{ color: colors.gray[9] }}>
              평가하기
            </Typography>
            <Icon name="arrow-right" />
          </Pressable>
        </View>
      ))}
    </View>
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
  const { id } = useLocalSearchParams();
  const memberInfo = [
    { name: '김지수', approve: false, profile: require('@/assets/images/profile.png'), user_id: 1 },
    { name: '박지수', approve: true, profile: require('@/assets/images/profile.png'), user_id: 2 },
    { name: '이지수', approve: false, profile: require('@/assets/images/profile.png'), user_id: 3 },
    { name: '홍지수', approve: true, profile: require('@/assets/images/profile.png'), user_id: 4 },
    { name: '미지수', approve: false, profile: require('@/assets/images/profile.png'), user_id: 5 },
  ];
  return (
    <View style={{ marginVertical: 8 }}>
      {memberInfo.map((member, index) => (
        <Pressable
          key={index}
          style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => router.push(`/manage/${id}/certify?user=${member.user_id}`)}
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
            <Icon name="arrow-right-outline" width={24} height={24} stroke={colors.gray[7]} />
          </View>
        </Pressable>
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
