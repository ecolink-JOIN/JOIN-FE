import React from 'react';
import NoList from '@/components/molecules/StudyInfoSection/NoList';
import Card from '@/components/molecules/Card';
import RowView from '@/components/atoms/View/RowView';
import styled from 'styled-components/native';

const cardData = new Array(4).fill(0).map(() => ({
  title: '원어민 선생님과 함께 공부하실 스터디원ㅁㅇㄹㅁㅇㄴㄹㅁㄴ',
  leader: '스터디장 닉네임',
  leaderRating: 4.5,
  member: '스터디원',
  memberRating: 3.8,
  views: 100,
  liked: true,
  studyId: 0,
}));

const CardsContainer = styled(RowView)`
  padding: 20px;
  gap: 12px;
  flex-wrap: wrap;
`;

const InterestStudy = () => {
  return cardData.length ? (
    <CardsContainer>
      {cardData.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          leader={item.leader}
          leaderRating={item.leaderRating}
          member={item.member}
          memberRating={item.memberRating}
          views={item.views}
          liked={item.liked}
          studyId={item.studyId}
        />
      ))}
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
