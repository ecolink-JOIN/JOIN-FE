import { Alert, Image, Pressable, View } from 'react-native';
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
  useEffect(() => {
    Alert.alert(
      '기능 준비 중',
      '스터디 공지 조회 기능은 백엔드 API 개발 중입니다.\n\nAPI: GET /api/v1/study/{studyToken}/notice',
      [{ text: '확인' }],
    );
  }, []);

  return (
    <View style={{ paddingTop: 16, paddingBottom: 12 }}>
      <View
        style={{
          padding: 16,
          backgroundColor: colors.gray[1],
          borderRadius: 8,
          opacity: 0.6,
        }}
      >
        <Typography variant="body2" style={{ color: colors.gray[6], textAlign: 'center' }}>
          스터디 공지
        </Typography>
        <Typography variant="caption1" style={{ color: colors.gray[5], marginTop: 8, textAlign: 'center' }}>
          (백엔드 API 개발 중)
        </Typography>
      </View>
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
    Alert.alert(
      '기능 준비 중',
      '나의 출석 및 인증 현황 상세 조회는 백엔드 API 개발 중입니다.\n\nAPI: GET /api/v1/study/{studyToken}/my-attendance',
      [{ text: '확인' }],
    );
  };

  useEffect(() => {
    Alert.alert(
      '기능 준비 중',
      '나의 출석률/인증률 조회 기능은 백엔드 API 개발 중입니다.\n\nAPI: GET /api/v1/study/{studyToken}/my-attendance',
      [{ text: '확인' }],
    );
  }, []);

  return (
    <View style={{ marginTop: 16, marginBottom: 10 }}>
      <View
        style={{
          alignItems: 'center',
          paddingVertical: 20,
          backgroundColor: colors.gray[1],
          borderRadius: 8,
          opacity: 0.6,
        }}
      >
        <Typography variant="body2" style={{ color: colors.gray[6], textAlign: 'center' }}>
          나의 출석률 / 인증률
        </Typography>
        <Typography variant="caption1" style={{ color: colors.gray[5], marginTop: 8, textAlign: 'center' }}>
          (백엔드 API 개발 중)
        </Typography>
      </View>
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

// TODO: 백엔드 API 연동 필요
// API Endpoint:
//   1. GET /api/v1/avatars/{avatarToken} - 평가 대상 회원 정보 조회
//   2. POST /api/v1/evaluation - 평가 제출 (이미 존재)
// Request: { targetAvatarToken, evaluations: [{ evaluationCategory, point }] }
// Response: { avatarToken, nickname, profileUrl, attendanceRate, proofRate }
// Priority: 중간
// Description:
//   - 평가 대상 회원 상세 정보 조회 (닉네임, 프로필, 출석률, 인증률)
//   - 평가 제출 시 실제 API 호출
// Current Issue:
//   - 닉네임, 출석률, 인증률 하드코딩
// TODO: 백엔드 API 연동 필요
// API Endpoint:
//   1. GET /api/v1/avatars/{avatarToken} - 평가 대상 회원 정보 조회
//   2. POST /api/v1/evaluation - 평가 제출 (이미 존재)
// Request: { targetAvatarToken, evaluations: [{ evaluationCategory, point }] }
// Response: { avatarToken, nickname, profileUrl, attendanceRate, proofRate }
// Priority: 중간
// Description:
//   - 평가 대상 회원 상세 정보 조회 (닉네임, 프로필, 출석률, 인증률)
//   - 평가 제출 시 실제 API 호출
// Current Issue:
//   - 닉네임, 출석률, 인증률 하드코딩
//   - 제출 버튼에서 API 호출 없음
export const MemberEvaluation = () => {
  const [selectedScores, setSelectedScores] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    Alert.alert(
      '기능 준비 중',
      '스터디원 평가 기능은 현재 백엔드 API 개발 중입니다.\n\n필요한 API:\n1. GET /api/v1/avatars/{avatarToken}\n   (평가 대상 회원 정보 조회)\n2. POST /api/v1/evaluation\n   (평가 제출)',
      [{ text: '확인' }],
    );
  }, []);

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

  const handleSubmit = () => {
    Alert.alert('기능 준비 중', '평가 제출 기능은 백엔드 API 연동 후 사용 가능합니다.', [
      { text: '확인', onPress: () => router.back() },
    ]);
  };

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
      <View style={{ alignItems: 'center', opacity: 0.5 }}>
        <Image
          source={require('@/assets/images/profile.png')}
          style={{
            width: 80,
            height: 80,
          }}
        />
        <Typography variant="heading4" style={{ marginTop: 10 }}>
          평가 대상 회원
        </Typography>
        <Typography variant="caption1" style={{ color: colors.gray[6], marginTop: 4 }}>
          (API 연동 후 실제 데이터 표시)
        </Typography>
      </View>

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
        <Button variant="contained" onPress={handleSubmit}>
          제출하기
        </Button>
      </View>
    </View>
  );
};

// 평가할 스터디원 선택
// TODO: 백엔드 API 연동 필요
// API Endpoint: GET /api/v1/study/{studyToken}/enrollments/members
// Request: { studyToken: string }
// Response: { members: [{ avatarToken, nickname, profileUrl, isLeader }] }
// Priority: 중간
// Description: 평가 가능한 스터디원 목록 조회 (자신 제외)
// Current Issue: Mock 데이터 5명 하드코딩 (김지수, 박지수, 이지수, 홍지수, 미지수)
export const StudyEvaluation = () => {
  useEffect(() => {
    Alert.alert(
      '기능 준비 중',
      '스터디원 목록 조회 기능은 현재 백엔드 API 개발 중입니다.\n\n필요한 API:\nGET /api/v1/study/{studyToken}/enrollments/members\n(평가 가능한 스터디원 목록 조회)',
      [{ text: '확인' }],
    );
  }, []);

  const handleEvaluationPress = () => {
    Alert.alert('기능 준비 중', '스터디원 평가 기능은 백엔드 API 연동 후 사용 가능합니다.', [{ text: '확인' }]);
  };

  return (
    <View style={{ marginVertical: 16, alignItems: 'center', paddingVertical: 40 }}>
      <Typography variant="body2" style={{ color: colors.gray[6], textAlign: 'center' }}>
        스터디원 목록 조회 기능은{'\n'}백엔드 API 개발 중입니다.
      </Typography>
      <Typography variant="caption1" style={{ color: colors.gray[5], marginTop: 8, textAlign: 'center' }}>
        API: GET /api/v1/study/{'{studyToken}'}/enrollments/members
      </Typography>
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
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    ApplicationsService()
      .getApplications(token)
      .then((res) => {
        setApplicationList(res);
      })
      .catch((err) => {
        console.error('Failed to fetch applications:', err);
        setError(true);
        setApplicationList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <View style={{ marginVertical: 8, paddingVertical: 20, alignItems: 'center' }}>
        <Typography variant="body3" style={{ color: colors.gray[6] }}>
          로딩 중...
        </Typography>
      </View>
    );
  }

  if (error || applicationList.length === 0) {
    return (
      <View style={{ marginVertical: 8, paddingVertical: 20, alignItems: 'center' }}>
        <Typography variant="body3" style={{ color: colors.gray[6] }}>
          신청한 스터디원이 없습니다
        </Typography>
      </View>
    );
  }

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
