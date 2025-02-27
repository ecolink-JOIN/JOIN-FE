import StaticView from '@/components/atoms/View/StaticView';
import React from 'react';
import Typography from '@/components/atoms/Typography';
import styled from 'styled-components/native';
import NormalTextInput from '@/components/organisms/Form/NormalTextInput';
import { View, ScrollView } from 'react-native';
import Button from '@/components/atoms/Button';
import { Controller } from 'react-hook-form';
import StyledTextInput from '@/components/atoms/TextField';
import Toast from 'react-native-toast-message';
import { useFormContext } from '@/context/FormContext';
import { StudyService } from '@/apis';

export default function RecruitAdd() {
  const { control, formState, handleSubmit } = useFormContext();
  const showToast = ({ text1 }: { text1: string }) => {
    Toast.show({
      type: 'form',
      text1,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };
  const { title, introduction, content, rule_exp, qualification_exp } = formState.dirtyFields;
  const onSubmit = (data: StudyRequest.Recruit) => {
    if (!title) {
      showToast({ text1: '제목을 입력해주세요' });
    } else if (!introduction) {
      showToast({ text1: '스터디 소개를 입력해주세요' });
    } else if (!content) {
      showToast({ text1: '활동 내용을 입력해주세요' });
    } else if (!rule_exp) {
      showToast({ text1: '스터디 규칙을 입력해주세요' });
    } else if (!qualification_exp) {
      showToast({ text1: '지원 자격을 입력해주세요' });
    } else {
      StudyService()
        .recruit(data)
        .then((res) => {
          showToast({ text1: '스터디 등록이 완료되었습니다.' });
        });
    }
  };

  return (
    <ScrollView>
      <StyledView>
        <Typography variant="heading4">스터디에 대해 소개해주세요.</Typography>
        <Controller
          name="title"
          control={control}
          render={({ field: { onChange, value } }) => (
            <NormalTextInput
              title={'제목'}
              value={value}
              onChangeText={onChange}
              placeholder="글 제목을 입력해주세요."
            />
          )}
        />
        <Controller
          name="introduction"
          control={control}
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
          {/* TODO: 스터디 규칙 목록 선택 시 사용 */}
          {/* <Controller
          name="rules"
          control={control}
          render={({ field: { onChange, value } }) => <StudyRule value={value} onChange={onChange} />}
        /> */}
          <Controller
            name="rule_exp"
            control={control}
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
          name="qualification_exp"
          control={control}
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
        <Button variant="contained" style={{ marginHorizontal: 'auto' }} onPress={handleSubmit(onSubmit)}>
          글 등록하기
        </Button>
      </StyledView>
    </ScrollView>
  );
}
const StyledView = styled(StaticView)`
  padding: 12px 20px 50px 20px;
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
