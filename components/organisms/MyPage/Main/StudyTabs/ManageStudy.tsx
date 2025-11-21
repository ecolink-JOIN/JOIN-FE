import React, { useEffect, useRef, useState } from 'react';
import ManageList from '@/components/molecules/StudyInfoSection/ManageList';
import { View, ActivityIndicator, Alert } from 'react-native';
import NoList from '@/components/molecules/StudyInfoSection/NoList';
import { MyPageService } from '@/apis';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import TextField from '@/components/atoms/TextField';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';

const studyLinks: StudyLinkList[] = [
  {
    title: '진행 관리',
    href: '/(tabs)/(my)/manage/[token]/progress',
  },
  {
    title: '스터디원 관리',
    href: '/(tabs)/(my)/manage/[token]/member',
  },
  {
    title: '운영 규칙 관리',
    href: '/(tabs)/(my)/manage/[token]/rule',
  },
];

const ManageStudy = () => {
  const [studyList, setStudyList] = useState<MyPageResponse.StudyInfo[]>([]);
  const [isloading, setIsLoading] = useState(true);
  const [studyName, setStudyName] = useState('');
  const [currentStudyToken, setCurrentStudyToken] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    setIsLoading(true);
    MyPageService()
      .getManageStudy()
      .then((data) => {
        setStudyList(data);
        setIsLoading(false);
      });
  }, []);

  const loadStudyList = async () => {
    setIsLoading(true);
    try {
      const data = await MyPageService().getManageStudy();
      setStudyList(data);
    } catch (error) {
      console.error('스터디 목록 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudyNameUpdate = async () => {
    if (!studyName.trim()) {
      Alert.alert('알림', '스터디명을 입력해주세요.');
      return;
    }

    try {
      setIsSaving(true);

      // TODO: 스터디명 변경 API가 백엔드에 구현되면 연동 필요
      // 예상 API: await StudyService().updateStudyName(currentStudyToken, { name: studyName });

      Alert.alert('준비 중', '스터디명 변경 기능은 백엔드 API 구현 후 사용 가능합니다.', [
        {
          text: '확인',
          onPress: () => bottomSheetModalRef.current?.dismiss(),
        },
      ]);

      // API 연동 후 활성화:
      // await loadStudyList();
      // Alert.alert('성공', '스터디명이 변경되었습니다.');
      // bottomSheetModalRef.current?.dismiss();
    } catch (error) {
      console.error('스터디명 변경 실패:', error);
      Alert.alert('오류', '스터디명 변경에 실패했습니다.\n잠시 후 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  return studyList.length ? (
    <View style={{ gap: 20 }}>
      {studyList.map((study, idx) => (
        <ManageList
          key={idx}
          {...{
            title: study.name,
            studyToken: study.studyToken,
            status: study.status,
            editHref: 'changename',
            studyLinks,
            active: study.status !== 'COMPLETED',
            openBottomSheet: (studyName: string) => {
              setStudyName(studyName);
              setCurrentStudyToken(study.studyToken);
              bottomSheetModalRef.current?.present();
            },
          }}
        />
      ))}
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef}
        component={
          <View style={{ padding: 20, gap: 12 }}>
            <Typography variant="subtitle1">스터디명 변경</Typography>
            <TextField placeholder="스터디명을 입력해주세요." value={studyName} onChangeText={setStudyName} />
            <Button
              variant="contained"
              style={{ marginHorizontal: 'auto' }}
              onPress={handleStudyNameUpdate}
              disabled={isSaving}
            >
              {isSaving ? <ActivityIndicator size="small" /> : '완료'}
            </Button>
          </View>
        }
      />
    </View>
  ) : (
    <>
      {isloading ? (
        <ActivityIndicator size="large" />
      ) : (
        <NoList
          {...{
            desc: '운영 중인 스터디가 없습니다.',
            buttonText: '스터디 모집하기',
            buttonHref: '(form)/recruit-base',
          }}
        />
      )}
    </>
  );
};

export default ManageStudy;
