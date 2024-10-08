import React from 'react';
import ManageList from '@/components/molecules/StudyInfoSection/ManageList';
import { View } from 'react-native';
import NoList from '@/components/molecules/StudyInfoSection/NoList';
import JoinedStatus from '../JoinedStatus';

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

const StudyList: StudyList[] = [
  { title: '직장인 영어 회화 스터디 💬', id: 1, active: true },
  { title: '직장인 수학 스터디 💬', id: 2, active: false },
  { title: '직장인 과학 스터디 💬', id: 3, active: true },
];

const JoinedStudy = () => {
  return StudyList.length ? (
    <View style={{ gap: 20 }}>
      <JoinedStatus
        {...{
          ongoing: 2,
          completed: 1,
        }}
      />
      {StudyList.map((study, idx) => (
        <ManageList
          key={idx}
          {...{
            title: study.title,
            id: study.id,
            editHref: 'changename',
            studyLinks,
            active: study.active,
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
