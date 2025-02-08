import TabScreen from '@/components/molecules/CustomTab/TabScreen';
import { ManageStudy, JoinedStudy, InterestStudy } from '@/components/organisms/MyPage/Main/StudyTabs';
import FormalInfo from '@/components/organisms/MyPage/Main/FormalInfo';
import React from 'react';

const Screen = () => {
  return (
    <>
      <FormalInfo />
      <TabScreen
        menus={['운영 스터디', '가입 스터디', '관심 스터디']}
        contents={[<ManageStudy />, <JoinedStudy />, <InterestStudy />]}
      />
    </>
  );
};

export default Screen;
