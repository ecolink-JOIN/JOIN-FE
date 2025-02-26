import React from 'react';
import Icon from '@/components/atoms/Icon';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import RowView from '@/components/atoms/View/RowView';
import IconButton from '@/components/molecules/IconButton';
import SafeAreaView from '@/components/atoms/View/SafeAreaView';
import { StudyService } from '@/apis';
import { useRouter } from 'expo-router';
import Logo from '@/assets/icons/appbar_logo.svg';

const HeaderContainer = styled(RowView)`
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${colors.white};
`;

const IconContainer = styled(RowView)`
  gap: 12px;
`;

const HomeHeader: React.FC = () => {
  const router = useRouter();

  const openModal = () => {
    router.push('/(tabs)/(home)/search');
  };

  const handleWrite = () => {
    router.push('/(form)/recruit-base');
  };

  // TODO: API 테스트용 코드입니다. 추후 삭제 예정
  const handleSearch = async () => {
    const req = await StudyService().recruit({
      capacity: 10,
      recruit_end_date: '2025-02-27',
      st_date: '2025-02-28',
      end_date: '2025-07-27',
      province: '서울특별시',
      city: '동작구',
      category_name: '고시',
      study_name: '신학기 학점올리기 프로젝트',
      title: '신학기 학점올리기 프로젝트 모집중',
      introduction:
        '신학기 학점올리기 프로젝트 모집중신학기 학점올리기 프로젝트 모집중신학기 학점올리기 프로젝트 모집중신학기 학점올리기 프로젝트 모집중',
      content: '매일 1시간씩 공부하고 서로 도와주는 스터디입니다.',
      rule_exp: '매일 1시간 이상 공부',
      qualification_exp: '학점 올리기를 원하는 학생',
      schedules: [
        {
          weekOfDay: 'MON',
          stTime: '18:00',
          endTime: '19:00',
        },
        {
          weekOfDay: 'TUE',
          stTime: '18:00',
          endTime: '19:00',
        },
        {
          weekOfDay: 'WED',
          stTime: '18:00',
          endTime: '19:00',
        },
        {
          weekOfDay: 'THU',
          stTime: '18:00',
          endTime: '19:00',
        },
        {
          weekOfDay: 'FRI',
          stTime: '18:00',
          endTime: '19:00',
        },
      ],
      regular: true,
      form: 'ONLINE',
    });
    console.log(req);
  };

  return (
    <SafeAreaView>
      <HeaderContainer>
        <Logo />
        <IconContainer>
          <Icon name="write" onPress={handleWrite} />
          <IconButton name="alarm" onPress={handleSearch} />
          <IconButton name="search" onPress={openModal} />
        </IconContainer>
      </HeaderContainer>
    </SafeAreaView>
  );
};

export default HomeHeader;
