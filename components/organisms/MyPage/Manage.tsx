import { Image, Pressable, View } from 'react-native';
import { colors } from '@/theme';
import Typography from '@/components/atoms/Typography';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Switch } from '@/components/atoms/Switch';
import { InfoViewBox } from '@/components/molecules/MyMolecules/InfoView';
import Badge from '@/components/atoms/Badge';
import Icon from '@/components/atoms/Icon';
import { Href, RelativePathString, router, useLocalSearchParams } from 'expo-router';
import RowView from '@/components/atoms/View/RowView';
import Divider from '@/components/atoms/Divider';
import Evaluator from '@/components/molecules/Evaluator';
import Button from '@/components/atoms/Button';
import FineOptions from '@/components/molecules/FineOption';
import { ApplicationsService, MyPageService, StudyService } from '@/apis';

// 스터디 모임 방법
export const MeetingType = ({ studyToken }: { studyToken: string }) => {
  const [form, setForm] = React.useState<SharedStudy.Form | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMeetingType = async () => {
      try {
        setLoading(true);
        const response = await StudyService().getRules(studyToken);
        setForm(response.form);
      } catch (error) {
        console.error('Failed to fetch meeting type:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetingType();
  }, [studyToken]);

  if (loading) {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 12 }}>
        <Typography variant="caption1" style={{ textAlign: 'left' }}>
          로딩 중...
        </Typography>
      </View>
    );
  }

  return (
    <View style={{ paddingTop: 16, paddingBottom: 12 }}>
      <Typography variant="button" numberOfLines={4} ellipsizeMode="tail" style={{ textAlign: 'left' }}>
        {form === 'ONLINE' ? '온라인' : form === 'OFFLINE' ? '오프라인' : '정보 없음'}
      </Typography>
    </View>
  );
};

// 스터디 운영 상세 규칙
export const StudyRuleDetails = ({ studyToken }: { studyToken: string }) => {
  const [ruleData, setRuleData] = React.useState<StudyResponse.Rule | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRuleDetails = async () => {
      try {
        setLoading(true);
        const response = await StudyService().getRules(studyToken);
        setRuleData(response);
      } catch (error) {
        console.error('Failed to fetch rule details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRuleDetails();
  }, [studyToken]);

  if (loading) {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 12 }}>
        <Typography variant="caption1" style={{ textAlign: 'left' }}>
          로딩 중...
        </Typography>
      </View>
    );
  }

  if (!ruleData) {
    return (
      <View style={{ paddingTop: 16, paddingBottom: 12 }}>
        <Typography variant="caption1" style={{ textAlign: 'left' }}>
          규칙 정보를 불러올 수 없습니다.
        </Typography>
      </View>
    );
  }

  const options = [
    {
      name: '지각',
      fine: ruleData.fineReasonAmounts.tardiness || 0,
    },
    {
      name: '결석',
      fine: ruleData.fineReasonAmounts.absence || 0,
    },
    {
      name: '미인증',
      fine: ruleData.fineReasonAmounts.nonProof || 0,
    },
  ];

  return (
    <View style={{ paddingTop: 16, paddingBottom: 12 }}>
      <Typography variant="button" numberOfLines={4} ellipsizeMode="tail" style={{ textAlign: 'left' }}>
        벌금
      </Typography>

      <FineOptions options={options} />

      <Divider style={{ height: 2, marginHorizontal: -20, width: 'auto', marginTop: 8 }} />

      <Typography
        variant="button"
        numberOfLines={4}
        ellipsizeMode="tail"
        style={{ textAlign: 'left', paddingVertical: 16 }}
      >
        규칙 안내 메세지
      </Typography>

      <View
        style={{
          backgroundColor: colors.sub2,
          borderRadius: 12,
          padding: 20,
          gap: 10,
        }}
      >
        <Typography variant="button">{ruleData.ruleExp || '규칙 안내 메시지가 없습니다.'}</Typography>
      </View>
    </View>
  );
};

// 스터디 공지
// TODO: 백엔드 API 추가 필요
// API Endpoint: GET /study/{studyToken}/notice
// Request: { studyToken: string }
// Response: { noticeId: number, content: string, createdAt: string }
// Priority: 낮음
// Description: 스터디 공지를 조회하는 API (현재는 POST만 존재)
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
export const Status = ({ value, onToggle }: { value: boolean; onToggle?: () => void }) => {
  const [toggle, setToggle] = React.useState(value);

  return (
    <LineView>
      <Typography variant="button">모집 상태</Typography>
      <LineView>
        <Typography variant="button" style={{ color: colors.gray[7], paddingRight: 12 }}>
          {value ? '모집 중' : '모집 완료'}
        </Typography>
        <Switch
          value={toggle}
          onValueChange={() => {
            // setToggle(!toggle);
            if (onToggle) onToggle();
          }}
        />
      </LineView>
    </LineView>
  );
};

interface MyAttendanceProps {
  id: string;
}
// TODO: 백엔드 API 추가 필요
// API Endpoint: GET /study/{studyToken}/my-attendance
// Request: { studyToken: string }
// Response: { myAttendanceRate: number, myProofRate: number }
// Priority: 중간
// Description: 개인의 출석률과 인증률을 조회하는 API
export const MyAttendance = ({ id }: MyAttendanceProps) => {
  const handlePress = () => {
    router.push(`/member/${id}/my-attendance` as Href);
  };

  return (
    <View style={{ marginTop: 16, marginBottom: 10 }}>
      <InfoViewBox
        InfoList={[
          { title: '나의 출석률', value: '100' },
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
export const StudySchedule = ({ studyToken }: { studyToken: string }) => {
  const [ruleData, setRuleData] = React.useState<StudyResponse.Rule | null>(null);
  const [loading, setLoading] = React.useState(true);

  const WeekofDay: Record<SharedStudy.PossibleDays, string> = {
    MON: '월요일',
    TUE: '화요일',
    WED: '수요일',
    THU: '목요일',
    FRI: '금요일',
    SAT: '토요일',
    SUN: '일요일',
  };

  React.useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true);
        const response = await StudyService().getRules(studyToken);
        setRuleData(response);
      } catch (error) {
        console.error('Failed to fetch schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [studyToken]);

  if (loading) {
    return (
      <View style={{ marginVertical: 16 }}>
        <Typography variant="caption1" style={{ textAlign: 'center' }}>
          로딩 중...
        </Typography>
      </View>
    );
  }

  if (!ruleData) {
    return (
      <View style={{ marginVertical: 16 }}>
        <Typography variant="caption1" style={{ textAlign: 'center' }}>
          스케줄 정보를 불러올 수 없습니다.
        </Typography>
      </View>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.');
  };

  const formatTime = (timeStr: string) => {
    return timeStr.replace(/:\d{2}$/, ''); // 초 제거
  };

  return (
    <View style={{ marginVertical: 16 }}>
      <RowView style={{ justifyContent: 'space-between' }}>
        <Typography variant="button">스터디 기간</Typography>
        <Typography variant="button" style={{ color: colors.gray[8] }}>
          {formatDate(ruleData.startDate)} - {formatDate(ruleData.endDate)}
        </Typography>
      </RowView>
      <Divider style={{ height: 2, marginHorizontal: -20, width: 'auto', marginTop: 16 }} />
      <View style={{ paddingTop: 16, gap: 16 }}>
        <Typography variant="button">진행 요일 및 시간</Typography>
        {ruleData.schedules.map((schedule, index) => (
          <LineView key={index}>
            <Typography variant="button" style={{ color: colors.gray[8] }}>
              {WeekofDay[schedule.weekOfDay]}
            </Typography>
            <Typography variant="button" style={{ color: colors.gray[8] }}>
              {formatTime(schedule.stTime)} - {formatTime(schedule.endTime)}
            </Typography>
          </LineView>
        ))}
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

//출석 및 인증 현황
export const Attendance = ({ studyToken }: { studyToken: string }) => {
  const [studyInfo, setStudyInfo] = React.useState<MyPageResponse.StudyInfo | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const response = await MyPageService().getManageStudy();
        const currentStudy = response.find((study: MyPageResponse.StudyInfo) => study.studyToken === studyToken);
        setStudyInfo(currentStudy || null);
      } catch (error) {
        console.error('Failed to fetch attendance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [studyToken]);

  if (loading) {
    return (
      <View style={{ padding: 16 }}>
        <Typography variant="caption1" style={{ textAlign: 'center' }}>
          로딩 중...
        </Typography>
      </View>
    );
  }

  if (!studyInfo) {
    return (
      <View style={{ padding: 16 }}>
        <Typography variant="caption1" style={{ textAlign: 'center' }}>
          출석 정보를 불러올 수 없습니다.
        </Typography>
      </View>
    );
  }

  return (
    <View style={{ gap: 16 }}>
      <LineView>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Typography variant="button">평균 출석률</Typography>
          <Typography variant="caption1">{studyInfo.teamAverageAttendanceRate.toFixed(0)}%</Typography>
        </View>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Typography variant="button">평균 인증률</Typography>
          <Typography variant="caption1">{studyInfo.teamAverageProofRate.toFixed(0)}%</Typography>
        </View>
      </LineView>
      {studyInfo.studyMembersInfos.map((member, index) => (
        <LineView key={index}>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Image
              source={require('@/assets/images/profile.png')}
              style={{ width: 32, height: 32, borderRadius: 16 }}
            />
            <Typography variant="button">{member.nickname}</Typography>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <Typography variant="caption1">{member.averageAttendanceRate.toFixed(0)}%</Typography>
            <Typography variant="caption1">{member.averageProofRate.toFixed(0)}%</Typography>
          </View>
        </LineView>
      ))}
    </View>
  );
};

//스터디 인증 승인
export const Approval = ({ studyToken }: { studyToken: string }) => {
  const { id } = useLocalSearchParams();
  const [studyInfo, setStudyInfo] = React.useState<MyPageResponse.StudyInfo | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchApproval = async () => {
      try {
        setLoading(true);
        const response = await MyPageService().getManageStudy();
        const currentStudy = response.find((study: MyPageResponse.StudyInfo) => study.studyToken === studyToken);
        setStudyInfo(currentStudy || null);
      } catch (error) {
        console.error('Failed to fetch approval:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApproval();
  }, [studyToken]);

  if (loading) {
    return (
      <View style={{ padding: 16 }}>
        <Typography variant="caption1" style={{ textAlign: 'center' }}>
          로딩 중...
        </Typography>
      </View>
    );
  }

  if (!studyInfo) {
    return (
      <View style={{ padding: 16 }}>
        <Typography variant="caption1" style={{ textAlign: 'center' }}>
          승인 정보를 불러올 수 없습니다.
        </Typography>
      </View>
    );
  }

  return (
    <View style={{ marginVertical: 8 }}>
      {studyInfo.studyMembersInfos.map((member, index) => (
        <Pressable
          key={index}
          style={{
            flexDirection: 'row',
            paddingVertical: 8,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={() => router.push(`/manage/${id}/certify?user=${member.nickname}`)}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Image source={require('@/assets/images/profile.png')} style={{ width: 24, height: 24 }} />
            <Typography variant="body3" style={{ color: colors.gray[9] }}>
              {member.nickname}
            </Typography>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Typography
              variant="body3"
              style={{
                color: member.isFullyApproved ? colors.gray[9] : colors.primary,
              }}
            >
              {member.isFullyApproved ? '승인 완료' : '승인 미완료'}
            </Typography>
            <Icon name="arrow-right-outline" width={24} height={24} stroke={colors.gray[7]} />
          </View>
        </Pressable>
      ))}
    </View>
  );
};

//스터디 신청 승인
export const ApplicationApproval = () => {
  const { token } = useLocalSearchParams<{ token: string }>();
  const [applicationList, setApplicationList] = React.useState<ApplicationsResponse.GetApplicationsResult[]>([]);

  useEffect(() => {
    ApplicationsService()
      .getApplications(token)
      .then((res) => {
        setApplicationList(res);
      });
  }, [token]);

  return (
    <View style={{ marginVertical: 8 }}>
      {applicationList.map((member, index) => (
        <Pressable
          key={index}
          disabled={member.applicationStatus === '승인 완료' || member.applicationStatus === '거절 완료'}
          style={{ flexDirection: 'row', paddingVertical: 8, alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() =>
            router.push({
              pathname: `/manage/${token}/recruiting-member` as RelativePathString,
              params: { member: JSON.stringify(member) },
            })
          }
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Image source={{ uri: member.profileImage.url }} style={{ width: 24, height: 24, borderRadius: 12 }} />
            <Typography variant="body3" style={{ color: colors.gray[9] }}>
              {member.nickname}
            </Typography>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Typography
              variant="body3"
              style={{ color: member.applicationStatus === '승인 완료' ? colors.gray[9] : colors.primary }}
            >
              {member.applicationStatus}
            </Typography>
            {member.applicationStatus === '승인 대기중' && (
              <Icon name="arrow-right-outline" width={24} height={24} stroke={colors.gray[7]} />
            )}
          </View>
        </Pressable>
      ))}
    </View>
  );
};

//스터디 카카오톡 링크
export const KakaoLink = ({ studyToken }: { studyToken: string }) => {
  const [studyInfo, setStudyInfo] = React.useState<MyPageResponse.StudyInfo | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchKakaoLink = async () => {
      try {
        setLoading(true);
        const response = await MyPageService().getManageStudy();
        const currentStudy = response.find((study: MyPageResponse.StudyInfo) => study.studyToken === studyToken);
        setStudyInfo(currentStudy || null);
      } catch (error) {
        console.error('Failed to fetch kakao link:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKakaoLink();
  }, [studyToken]);

  if (loading) {
    return (
      <Typography variant="button" style={{ marginVertical: 8 }}>
        로딩 중...
      </Typography>
    );
  }

  if (!studyInfo || !studyInfo.kakaoUrl) {
    return (
      <Typography variant="button" style={{ marginVertical: 8, color: colors.gray[6] }}>
        카카오톡 링크가 없습니다.
      </Typography>
    );
  }

  return (
    <Typography variant="button" style={{ marginVertical: 8 }}>
      {studyInfo.kakaoUrl}
    </Typography>
  );
};

const LineView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
`;
