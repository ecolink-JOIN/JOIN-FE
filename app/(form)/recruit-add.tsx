import StaticView from '@/components/atoms/View/StaticView';
import React, { useState } from 'react';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import { Category, DateTime, MeetingLocation, MeetingWay, Nums } from '@/components/molecules/FormControl/RecruitBase';
import NormalTextInput from '@/components/organisms/Form/NormalTextInput';
import { View, FlatList } from 'react-native';
import Button from '@/components/atoms/Button';

export default function RecruitAdd() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [content, setContent] = useState('');

  const renderItem = () => (
    <StyledView>
      <Typography variant="heading4">스터디에 대해 소개해주세요.</Typography>
      <NormalTextInput title={'제목'} value={title} onChangeText={setTitle} placeholder="글 제목을 입력해주세요." />
      <NormalTextInput
        title={'스터디 소개'}
        value={desc}
        onChangeText={setDesc}
        placeholder="스터디에 대해 소개해주세요!"
        height={88}
      />
      <NormalTextInput
        title={'활동 내용'}
        value={content}
        onChangeText={setContent}
        placeholder="어떤 활동을 하게 되나요?"
        height={88}
      />
      <Button variant="contained" style={{ marginHorizontal: 'auto' }}>
        다음
      </Button>
    </StyledView>
  );

  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <FlatList data={[null]} renderItem={renderItem} />
    </View>
  );
}
const StyledView = styled(StaticView)`
  margin: 20px 0;
  gap: 24px;
  height: 100%;
`;
