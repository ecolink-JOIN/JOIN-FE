import React, { useEffect, useState } from 'react';
import ManageList from '@/components/molecules/StudyInfoSection/ManageList';
import { ActivityIndicator, View } from 'react-native';
import NoList from '@/components/molecules/StudyInfoSection/NoList';
import JoinedStatus from '../JoinedStatus';
import { MyPageService } from '@/apis';

const studyLinks: StudyLinkList[] = [
  {
    title: '스터디 현황',
    href: '/member/[id]/study-status',
  },
  {
    title: '스터디원 평가',
    href: '/member/[id]/evaluation',
  },
  {
    title: '운영 규칙 확인',
    href: '/member/[id]/rule',
  },
];

const JoinedStudy = () => {
  const [studyList, setStudyList] = useState<MyPageResponse.JoinStudyInfo[]>([]);
  const [ongoingCount, setOngoingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    MyPageService()
      .getJoinStudy()
      .then((data) => {
        setStudyList(data.joinStudyInfos);
        setOngoingCount(data.ongoingStudyCount);
        setCompletedCount(data.completedStudyCount);
        setIsLoading(false);
      });
  }, []);

  return studyList.length ? (
    <View style={{ gap: 20 }}>
      <JoinedStatus
        {...{
          ongoing: ongoingCount,
          completed: completedCount,
        }}
      />
      {studyList.map((study, idx) => (
        <ManageList
          key={idx}
          {...{
            title: study.name,
            studyToken: study.studyToken,
            studyLinks,
            active: study.status !== 'COMPLETED',
          }}
        />
      ))}
    </View>
  ) : (
    <>
      {isloading ? (
        <ActivityIndicator size="large" />
      ) : (
        <NoList
          {...{
            desc: '가입한 스터디가 없습니다.',
            buttonText: '스터디 둘러보기',
            buttonHref: '(home)',
          }}
        />
      )}
    </>
  );
};

export default JoinedStudy;
