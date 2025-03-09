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
  const [studyList, setStudyList] = useState<StudyResponse.StudyInfo[]>([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    MyPageService()
      .getInterestStudy()
      .then((data) => {
        setStudyList(data);
        setIsLoading(false);
      });
  }, []);

  return studyList.length ? (
    <CardsContainer>
      {studyList.map((item, index) => (
        <Card key={index} {...item} />
      ))}
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
