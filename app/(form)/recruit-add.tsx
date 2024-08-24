import StaticView from '@/components/atoms/View/StaticView';
import React from 'react';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import NormalTextInput from '@/components/organisms/Form/NormalTextInput';
import { View, FlatList } from 'react-native';
import Button from '@/components/atoms/Button';
import { useForm, Controller } from 'react-hook-form';

export default function RecruitAdd() {
  const { control, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => console.log(data));
  const renderItem = () => (
    <StyledView>
      <Typography variant="heading4">스터디에 대해 소개해주세요.</Typography>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <NormalTextInput title={'제목'} value={value} onChangeText={onChange} placeholder="글 제목을 입력해주세요." />
        )}
        name="title"
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <NormalTextInput
            title={'스터디 소개'}
            value={value}
            onChangeText={onChange}
            placeholder="스터디에 대해 소개해주세요!"
            height={88}
          />
        )}
        name="desc"
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <NormalTextInput
            title={'활동 내용'}
            value={value}
            onChangeText={onChange}
            placeholder="어떤 활동을 하게 되나요?"
            height={88}
          />
        )}
        name="content"
      />
      <Button variant="contained" style={{ marginHorizontal: 'auto' }} onPress={onSubmit}>
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
