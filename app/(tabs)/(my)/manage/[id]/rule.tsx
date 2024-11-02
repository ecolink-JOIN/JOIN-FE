import React, { useRef, useState } from 'react';
import { useLocalSearchParams, router, Href } from 'expo-router';
import { ManageView, ManageBoxView, shadowStyles } from '@/components/molecules/MyMolecules/ManageView';
import Typography from '@/components/atoms/Typography';
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
import Toast from 'react-native-toast-message';
import { MeetingLocation } from '@/components/molecules/FormControl/RecruitBase';

const Rule = ({
  id,
  bottomSheetModalRef,
}: {
  id: string | string[] | undefined;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
}) => {
  const [value, setvalue] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [online, setOnline] = useState(true);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  const showToastNobutton = ({ text1 }: { text1: string }) => {
    Toast.show({
      type: 'formNoButton',
      text1,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  return (
    <ManageView>
      <Typography variant="heading3">운영 규칙 관리</Typography>
      <ManageBoxView style={[shadowStyles.shadow]}>
        <BoxTitle onPress={() => router.push(`manage/${id}/study-schedule` as Href)}>
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
        {!online && <MeetingLocation />}
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
        <BoxContents>
          <Typography variant="body3">벌금</Typography>
          <Switch value={true} />
        </BoxContents>
        {FineList.map((item, index) => (
          <BoxContents key={index} onPress={toggleBottomSheet}>
            <Typography variant="body3" style={{ color: colors.gray[9] }}>
              {item.title}
            </Typography>
            <Typography variant="body3" style={{ marginLeft: 'auto' }}>
              {item.price}
            </Typography>
            <Icon name="arrow-right-outline" stroke={colors.gray[7]} />
          </BoxContents>
        ))}
        <BoxBottom>
          <Typography variant="button">규칙 안내 메세지 수정</Typography>
          <Icon name="arrow-right" />
        </BoxBottom>
      </ManageBoxView>
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef}
        component={
          <View style={{ padding: 40, gap: 12 }}>
            <Typography variant="button">미인증</Typography>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 12 }}>
              <TextField
                placeholder="벌금 가격을 입력해주세요."
                value={value}
                onChangeText={setvalue}
                style={{ width: '90%' }}
              />
              <Typography variant="body2">원</Typography>
            </View>
            <View
              style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 40, justifyContent: 'center' }}
            >
              <Button variant="outlined" onPress={() => bottomSheetModalRef.current?.dismiss()}>
                취소
              </Button>
              <Button variant="contained" onPress={() => bottomSheetModalRef.current?.dismiss()}>
                수정하기
              </Button>
            </View>
          </View>
        }
      />
      <Button onPress={toggleModal} variant="contained" style={{ marginHorizontal: 'auto' }}>
        저장하기
      </Button>
      <ModalWrapper isModalVisible={isModalVisible} toggleModal={toggleModal}>
        <ModalContents>
          <Typography variant="subtitle1">스터디 스케쥴 수정하기</Typography>
          <Typography variant="body4" style={{ color: colors.black, textAlign: 'center' }}>
            스터디 기간 및 요일, 시간을 수정하면{'\n'}더 이상 회차 자동 생성 기능을 사용할 수 없습니다.{'\n'}
            <Typography variant="body4" style={{ fontFamily: 'Pretendard-Bold' }}>
              이후 회차는 수동으로 직접 생성해야합니다.
            </Typography>
            {'\n'} {'\n'}변경된 스터디 스케줄을 적용하고{'\n'}회차를 ‘수동 생성’으로 바꾸겠습니까?
          </Typography>
          <Button
            variant="contained"
            onPress={() => {
              toggleModal();
              showToastNobutton({ text1: '운영 규칙 변경 사항이 성공적으로 반영되었습니다.' });
            }}
            style={{ marginHorizontal: 'auto' }}
          >
            확인
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
  padding: 20px;
`;

const BoxTitle = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom-color: ${colors.gray[2]};
  border-bottom-width: 2px;
`;

const BoxBottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px 12px 20px;
  border-top-color: ${colors.gray[2]};
  border-top-width: 2px;
`;
const BoxContents = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
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

const FineList = [
  {
    title: '지각',
    price: '1,000원',
  },
  {
    title: '결석',
    price: '2,000원',
  },
  {
    title: '미인증',
    price: '500원',
  },
];
