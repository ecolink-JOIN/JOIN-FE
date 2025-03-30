import React, { useEffect, useRef, useState } from 'react';
import ManageList from '@/components/molecules/StudyInfoSection/ManageList';
import { View, ActivityIndicator } from 'react-native';
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
            <TextField placeholder="카카오톡 링크를 입력해주세요." value={studyName} onChangeText={setStudyName} />
            <Button
              variant="contained"
              style={{ marginHorizontal: 'auto' }}
              onPress={() => {
                // TODO: 스터디명 변경 API 호출
                bottomSheetModalRef.current?.dismiss();
              }}
            >
              완료
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
