import React from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { StudyService } from '@/apis';

/**
 * 스터디 관리 공통 로직 (진행 중, 준비 중 화면 공통)
 */
export const useStudyManagement = (token: string) => {
  const [kakaolink, setKakaoLink] = React.useState('https://open.kakao.com/o/joinjoinjoi');
  const [isClosing, setIsClosing] = React.useState(false);
  const [isSavingKakao, setIsSavingKakao] = React.useState(false);
  const [studyDetail, setStudyDetail] = React.useState<any>(null);

  // 스터디 상세 정보 조회
  React.useEffect(() => {
    const fetchStudyDetail = async () => {
      try {
        const detail = await StudyService().detail(token);
        setStudyDetail(detail);
      } catch (error) {
        console.error('스터디 상세 조회 실패:', error);
      }
    };

    if (token) {
      fetchStudyDetail();
    }
  }, [token]);

  // 카카오톡 링크 수정
  const handleKakaoLinkUpdate = async (onSuccess?: () => void) => {
    if (!kakaolink.trim()) {
      Alert.alert('알림', '카카오톡 링크를 입력해주세요.');
      return;
    }

    try {
      setIsSavingKakao(true);

      // TODO: 카카오톡 링크 수정 API가 백엔드에 구현되면 연동 필요
      // 예상 API: await StudyService().updateKakaoLink(token, { kakaoUrl: kakaolink });

      Alert.alert('준비 중', '카카오톡 링크 수정 기능은 백엔드 API 구현 후 사용 가능합니다.', [
        {
          text: '확인',
          onPress: onSuccess,
        },
      ]);

      // API 연동 후 주석 해제:
      // Alert.alert('성공', '카카오톡 링크가 수정되었습니다.');
      // onSuccess?.();
    } catch (error) {
      console.error('카카오톡 링크 수정 실패:', error);
      Alert.alert('오류', '링크 수정에 실패했습니다.\n잠시 후 다시 시도해주세요.');
    } finally {
      setIsSavingKakao(false);
    }
  };

  // 스터디 종료 (Alert 2단계 확인 - progress.tsx용)
  const handleCloseStudyWithConfirm = async (onSuccess?: () => void) => {
    Alert.alert('스터디 종료', '정말 스터디를 종료하시겠습니까?\n종료된 스터디는 되돌릴 수 없습니다.', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '종료하기',
        style: 'destructive',
        onPress: async () => {
          await executeCloseStudy(onSuccess);
        },
      },
    ]);
  };

  // 스터디 종료 (직접 실행 - progress-ready.tsx용)
  const handleCloseStudy = async (onSuccess?: () => void) => {
    await executeCloseStudy(onSuccess);
  };

  // 스터디 종료 실행 로직
  const executeCloseStudy = async (onSuccess?: () => void) => {
    try {
      setIsClosing(true);
      const today = new Date().toISOString().split('T')[0];

      await StudyService().closeStudy(token, {
        actualEndDate: today,
      });

      Alert.alert('스터디 종료', '스터디가 성공적으로 종료되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            onSuccess?.();
            router.push('/(tabs)/(my)');
          },
        },
      ]);
    } catch (error) {
      console.error('❌ 스터디 종료 실패:', error);
      Alert.alert('오류', '스터디 종료에 실패했습니다.\n잠시 후 다시 시도해주세요.');
    } finally {
      setIsClosing(false);
    }
  };

  return {
    // State
    kakaolink,
    setKakaoLink,
    isClosing,
    isSavingKakao,
    studyDetail,

    // Handlers
    handleKakaoLinkUpdate,
    handleCloseStudy,
    handleCloseStudyWithConfirm,
  };
};
