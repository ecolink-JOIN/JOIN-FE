import React from 'react';
import ManageList from '@/components/molecules/StudyInfoSection/ManageList';
import { View } from 'react-native';
import NoList from '@/components/molecules/StudyInfoSection/NoList';

const studyLinks: StudyLinkList[] = [
  {
    title: '진행 관리',
    href: '(manage)/progress',
  },
  {
    title: '스터디원 관리',
    href: '(manage)/member',
  },
  {
    title: '운영 규칙 관리',
    href: '(manage)/rule',
  },
];

const StudyList: StudyList[] = [
  { title: '직장인 영어 회화 스터디 💬', id: 1, active: true },
  { title: '직장인 수학 스터디 💬', id: 2, active: false },
  { title: '직장인 과학 스터디 💬', id: 3, active: true },
];

const InterestStudy = () => {
  return StudyList.length ? (
    <View style={{ gap: 20 }}>
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
        desc: '운영 중인 스터디가 없습니다.',
        buttonText: '스터디 모집하기',
        buttonHref: '(form)/recruit-base',
      }}
    />
  );
};

export default InterestStudy;
