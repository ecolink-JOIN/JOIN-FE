import StaticView from '@/components/atoms/View/StaticView';
import React from 'react';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import NormalTextInput from '@/components/organisms/Form/NormalTextInput';
import { View, FlatList } from 'react-native';
import Button from '@/components/atoms/Button';
import { useForm, Controller } from 'react-hook-form';
import StudyRule from '@/components/organisms/Form/StudyRule';
import StyledTextInput from '@/components/atoms/TextField';

export default function RecruitAdd() {
  const { control, formState } = useForm({
    defaultValues: { title: '', desc: '', rules: [], content: '', eligibility: '' },
  });
  const { title, desc, content, eligibility } = formState.dirtyFields;
  const onSubmit = () => {
    if (title && desc && content && eligibility) {
      console.log('submit');
    } else {
      console.log('fail');
    }
  };
  const renderItem = () => (
    <StyledView>
      <Typography variant="heading4">스터디에 대해 소개해주세요.</Typography>
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <NormalTextInput title={'제목'} value={value} onChangeText={onChange} placeholder="글 제목을 입력해주세요." />
        )}
      />
      <Controller
        name="desc"
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
      />
      <Controller
        name="content"
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
      />
      <View>
        <Controller
          name="rules"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => <StudyRule value={value} onChange={onChange} />}
        />
        <Controller
          name="content"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <ReasonInput
              onChangeText={onChange}
              value={value}
              placeholder={'스터디 규칙에 대해 안내해주세요!'}
              style={{ height: 88 }}
              multiline={true}
            />
          )}
        />
      </View>
      <Controller
        name="eligibility"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <NormalTextInput
            title={'지원 자격'}
            value={value}
            onChangeText={onChange}
            placeholder="어떤 분을 모집하고 싶은지 알려주세요!"
            height={88}
          />
        )}
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

const ReasonInput = styled(StyledTextInput)`
  text-align-vertical: top;
  font-size: 16px;
  font-family: 'Pretendard-Medium';
  padding: 12px 16px;
  border-radius: 12px;
`;
