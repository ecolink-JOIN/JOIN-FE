import React, { useRef, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  ManageView,
  ManageBox,
  ListComponent,
  ManageBoxView,
  shadowStyles,
} from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
import { Status, Attendance, Approval, KakaoLink } from '@/components/organisms/MyPage/Manage';
import { FlatList, View } from 'react-native';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Button from '@/components/atoms/Button';
import BottomSheetComp from '@/components/molecules/BottomSheet';
import TextField from '@/components/atoms/TextField';
import { ModalWrapper } from '@/components/molecules/ModalViews';
import styled from 'styled-components/native';
import { colors } from '@/theme';
import Icon from '@/components/atoms/Icon';
import { Radio } from '@/components/atoms/Radio';
import { Switch } from '@/components/atoms/Switch';

const Rule = ({
  id,
  bottomSheetModalRef,
}: {
  id: string | string[] | undefined;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
}) => {
  const [kakaolink, setKakaoLink] = React.useState('https://open.kakao.com/o/joinjoinjoi');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [online, setOnline] = useState(true);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <ManageView>
      <Typography variant="heading3">운영 규칙 관리</Typography>
      <ManageBoxView style={[shadowStyles.shadow]}>
        <BoxTitle>
          <Typography
            variant="body3"
            style={{
              color: colors.gray[9],
            }}
          >
            스터디 스케쥴
          </Typography>
          <Icon name="arrow-right" />
        </BoxTitle>
        <BoxTitle>
          <Typography variant="button">스터디 기간</Typography>
          <Typography variant="button" style={{ color: colors.gray[8] }}>
            2024.06.04 - 2024.10.31
          </Typography>
        </BoxTitle>
        <Contents>
          <Typography variant="body3">진행 요일 및 시간</Typography>
          <Content>
            <Typography variant="button" style={{ color: colors.gray[8] }}>
              화요일
            </Typography>
            <Typography variant="button" style={{ color: colors.gray[8] }}>
              20:00 - 22:00
            </Typography>
          </Content>
          <Content>
            <Typography variant="button" style={{ color: colors.gray[8] }}>
              화요일
            </Typography>
            <Typography variant="button" style={{ color: colors.gray[8] }}>
              20:00 - 22:00
            </Typography>
          </Content>
        </Contents>
      </ManageBoxView>
      <Box style={[shadowStyles.shadow]}>
        <Typography variant="button">모임 방법</Typography>
        <RadioGroup>
          <RadioBox onPress={() => setOnline(true)}>
            <Radio selected={online} />
            <Typography variant="body3" style={{ color: online ? colors.black : colors.gray[7] }}>
              온라인
            </Typography>
          </RadioBox>
          <RadioBox
            onPress={() => {
              setOnline(false);
            }}
          >
            <Radio selected={!online} />
            <Typography variant="body3" style={{ color: online ? colors.gray[7] : colors.black }}>
              오프라인
            </Typography>
          </RadioBox>
        </RadioGroup>
      </Box>
      <ManageBoxView style={[shadowStyles.shadow]}>
        <View style={{ borderBottomColor: colors.gray[2], borderBottomWidth: 2, padding: 20, gap: 10 }}>
          <Typography
            variant="body3"
            style={{
              color: colors.gray[9],
            }}
          >
            스터디 규칙
          </Typography>
          <Typography
            variant="caption1"
            style={{
              color: colors.gray[9],
            }}
          >
            스터디 시작 시간 전후 10분 (총 20분간) 출석 가능
          </Typography>
        </View>
        <BoxTitle>
          <Typography variant="body3">벌금</Typography>
          <Switch value={true} />
        </BoxTitle>
      </ManageBoxView>
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef}
        component={
          <View style={{ padding: 20, gap: 12 }}>
            <Typography variant="subtitle1">스터디 카카오톡 링크 수정</Typography>
            <TextField placeholder="카카오톡 링크를 입력해주세요." value={kakaolink} onChangeText={setKakaoLink} />
            <Button
              variant="contained"
              style={{ marginHorizontal: 'auto' }}
              onPress={() => bottomSheetModalRef.current?.dismiss()}
            >
              완료
            </Button>
          </View>
        }
      />
      <ModalWrapper isModalVisible={isModalVisible} toggleModal={toggleModal}>
        <ModalContents>
          <Typography variant="subtitle1">스터디 종료하기</Typography>
          <Typography variant="body3" style={{ color: colors.primary }}>
            2024.06.04 - 2024.10.31
          </Typography>
          <Typography variant="body4" style={{ textAlign: 'center' }}>
            설정된 스터디 기간이 남아있습니다.{'\n'}정말 종료하시겠습니까?
          </Typography>
          <Button variant="contained" onPress={toggleModal} style={{ marginHorizontal: 'auto' }}>
            종료하기
          </Button>
        </ModalContents>
      </ModalWrapper>
    </ManageView>
  );
};

const RuleWrapper = () => {
  const { id } = useLocalSearchParams();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  return <FlatList data={[null]} renderItem={() => <Rule {...{ id, bottomSheetModalRef }} />} />;
};

export default RuleWrapper;

const ModalContents = styled.View`
  gap: 12px;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;

const BoxTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom-color: ${colors.gray[2]};
  border-bottom-width: 2px;
`;

const Contents = styled.View`
  padding: 16px 20px;
  gap: 20px;
`;
const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Box = styled(ManageBoxView)`
  padding: 20px;
`;

const RadioGroup = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 20px;
  padding-bottom: 8px;
  margin-top: 20px;
`;

const RadioBox = styled.Pressable`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
