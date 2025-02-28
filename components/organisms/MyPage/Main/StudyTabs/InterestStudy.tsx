import React, { useEffect, useState } from 'react';
import NoList from '@/components/molecules/StudyInfoSection/NoList';
import Card from '@/components/molecules/Card';
import RowView from '@/components/atoms/View/RowView';
import styled from 'styled-components/native';
import { MyPageService } from '@/apis';

const CardsContainer = styled(RowView)`
  gap: 12px;
  flex-wrap: wrap;
`;

const InterestStudy = () => {
  const [studyList, setStudyList] = useState<MyPageResponse.InterestStudyInfo[]>([]);

  useEffect(() => {
    MyPageService()
      .getInterestStudy()
      .then((data) => {
        setStudyList(data.interestStudyInfos);
      });
  }, []);

  return studyList.length ? (
    <CardsContainer>
      {/* {studyList.map((item, index) => (
        <Card
          key={index}
          title={item.studyName}
          leader={item.studyMemberInfos[0].nickname}
          leaderRating={item.studyMemberInfos[0].rating}
          member={item.studyMemberInfos[1].nickname}
          memberRating={item.studyMemberInfos[1].rating}
          views={item.viewCount}
          liked={item.liked}
          studyId={item.studyId}
        />
      ))} */}
    </CardsContainer>
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
