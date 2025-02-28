import React, { useEffect, useState } from 'react';
import ManageList from '@/components/molecules/StudyInfoSection/ManageList';
import { View } from 'react-native';
import NoList from '@/components/molecules/StudyInfoSection/NoList';
import { MyPageService } from '@/apis';

const studyLinks: StudyLinkList[] = [
  {
    title: '진행 관리',
    href: '/manage/[id]/progress',
  },
  {
    title: '스터디원 관리',
    href: '/manage/[id]/member',
  },
  {
    title: '운영 규칙 관리',
    href: '/manage/[id]/rule',
  },
];

const ManageStudy = () => {
  const [studyList, setStudyList] = useState<MyPageResponse.StudyInfo[]>([]);

  useEffect(() => {
    MyPageService()
      .getManageStudy()
      .then((data) => {
        setStudyList(data);
      });
  }, []);

  return studyList.length ? (
    <View style={{ gap: 20 }}>
      {studyList.map((study, idx) => (
        <ManageList
          key={idx}
          {...{
            title: study.name,
            // TODO: 스터디 토큰 정보 추가
            id: 1,
            editHref: 'changename',
            studyLinks,
            active: study.status !== 'COMPLETED',
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

export default ManageStudy;
