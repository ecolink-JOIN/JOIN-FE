import React, { useEffect, useState } from 'react';
import ManageList from '@/components/molecules/StudyInfoSection/ManageList';
import { View } from 'react-native';
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

  useEffect(() => {
    MyPageService()
      .getJoinStudy()
      .then((data) => {
        setStudyList(data.joinStudyInfos);
      });
  }, []);

  return studyList.length ? (
    <View style={{ gap: 20 }}>
      <JoinedStatus
        {...{
          ongoing: 2,
          completed: 1,
        }}
      />
      {studyList.map((study, idx) => (
        <ManageList
          key={idx}
          {...{
            title: study.name,
            id: 1,
            studyLinks,
            active: study.status !== 'COMPLETED',
          }}
        />
      ))}
    </View>
  ) : (
    <NoList
      {...{
        desc: '가입한 스터디가 없습니다.',
        buttonText: '스터디 둘러보기',
        buttonHref: '(home)',
      }}
    />
  );
};

export default JoinedStudy;
