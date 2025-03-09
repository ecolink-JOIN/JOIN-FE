import React, { useEffect, useState } from 'react';
import NoList from '@/components/molecules/StudyInfoSection/NoList';
import Card from '@/components/molecules/Card';
import RowView from '@/components/atoms/View/RowView';
import styled from 'styled-components/native';
import { MyPageService } from '@/apis';
import { ActivityIndicator } from 'react-native';

const CardsContainer = styled(RowView)`
  gap: 12px;
  flex-wrap: wrap;
`;

const InterestStudy = () => {
  const [studyList, setStudyList] = useState<MyPageResponse.InterestStudyInfo[]>([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    MyPageService()
      .getInterestStudy()
      .then((data) => {
        setStudyList(data.interestStudyInfos);
        setIsLoading(false);
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
    <>
      {isloading ? (
        <ActivityIndicator size="large" />
      ) : (
        <NoList
          {...{
            desc: '관심있는 스터디가 없습니다.',
            buttonText: '스터디 둘러보기',
            buttonHref: '(tabs)/(home)/(explore)/custom',
          }}
        />
      )}
    </>
  );
};

export default InterestStudy;
