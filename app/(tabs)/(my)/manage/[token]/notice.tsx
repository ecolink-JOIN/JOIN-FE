import React from 'react';
import { ManageView, ManageBoxView } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import StyledTextInput from '@/components/atoms/TextField';
import styled from 'styled-components/native';
import colors from '@/theme/colors';
import Button from '@/components/atoms/Button';
import { router, useLocalSearchParams } from 'expo-router';
import { NoticeService } from '@/apis';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';
import { useEffect } from 'react';

const Notice = () => {
  const [content, onChangeText] = React.useState('');
  const { token } = useLocalSearchParams<{ token: string }>();

  // 백엔드 공지 조회 API 미구현 안내
  useEffect(() => {
    // TODO: 백엔드 API 미구현 - GET /api/v1/study/{studyToken}/notice
    Alert.alert(
      '안내',
      '현재 공지 조회 기능은 백엔드 API 개발 대기 중입니다.\n\n공지 등록은 가능하지만, 등록된 공지를 다시 확인하는 기능은 추후 제공될 예정입니다.',
      [{ text: '확인' }],
    );
  }, []);

  const onSubmit = () => {
    NoticeService()
      .studyNotice(token, { content: content })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: '공지가 성공적으로 등록되었습니다.',
        });
        router.replace(`/manage/${token}/progress`);
      });
  };

  return (
    <ManageView>
      <Typography variant="heading3">스터디 공지</Typography>
      <BoxView>
        <ReasonInput
          onChangeText={onChangeText}
          value={content}
          placeholder={'스터디 공지를 작성해주세요.'}
          multiline={true}
        />
        <TextLimit variant="body4">{content.length || 0} / 100</TextLimit>
      </BoxView>
      <Button variant="contained" style={{ marginHorizontal: 'auto' }} onPressIn={onSubmit}>
        공지하기
      </Button>
    </ManageView>
  );
};

export default Notice;

const BoxView = styled(ManageBoxView)`
  padding: 20px;
  position: relative;
`;

const ReasonInput = styled(StyledTextInput)`
  padding: 0;
  text-align-vertical: top;
  height: 200px;
  font-size: 16px;
  border-radius: 12px;
  border: none;
`;

const TextLimit = styled(Typography)`
  position: absolute;
  right: 20px;
  bottom: 20px;
  text-align: right;
  font-size: 12px;
  color: ${colors.gray[8]};
`;
