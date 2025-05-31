import React, { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams, router, Href, RelativePathString } from 'expo-router';
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
import { useQuery } from '@tanstack/react-query';
import { StudyService } from '@/apis';

const WeekofDay: Record<SharedStudy.PossibleDays, string> = {
  MON: '월요일',
  TUE: '화요일',
  WED: '수요일',
  THU: '목요일',
  FRI: '금요일',
  SAT: '토요일',
  SUN: '일요일',
};

const Rule = ({
  token,
  bottomSheetModalRef,
}: {
  token: string | string[] | undefined;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
}) => {
  const [value, setvalue] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [online, setOnline] = useState(true);
  const { data } = useQuery({
    queryKey: ['rule', token],
    queryFn: () => StudyService().getRules(token as string),
  });

  // 토스트 메시지 표시 함수
  const showToastNobutton = ({ text1 }: { text1: string }) => {
    Toast.show({
      type: 'formNoButton',
      text1,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  // 모달 토글 함수
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // 바텀시트 토글 함수
  const toggleBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  // 벌금 관리 state
  const [selectedFineType, setSelectedFineType] = useState<'tardiness' | 'absence' | 'nonProof'>();
  const [fineAmounts, setFineAmounts] = useState<{
    tardiness: number;
    absence: number;
    nonProof: number;
  }>({
    tardiness: 0,
    absence: 0,
    nonProof: 0,
  });

  // 데이터 초기화
  useEffect(() => {
    if (data?.fineReasonAmounts) {
      setFineAmounts(data.fineReasonAmounts);
    }
  }, [data]);

  // 각 벌금 수정 모달 열기
  const openFineEdit = (type: 'tardiness' | 'absence' | 'nonProof') => {
    setSelectedFineType(type);
    setvalue(fineAmounts[type].toString());
    toggleBottomSheet();
  };

  // 벌금 금액 수정
  const updateFineAmount = () => {
    if (!selectedFineType || !value) return;

    const newFineAmounts = {
      ...fineAmounts,
      [selectedFineType]: parseInt(value),
    };
    setFineAmounts(newFineAmounts);

    bottomSheetModalRef.current?.dismiss();
    showToastNobutton({ text1: '벌금 금액이 수정되었습니다.' });
  };

  // 모든 규칙 저장
  const saveRules = () => {
    if (!token) return;

    // 기존 규칙을 안전하게 복사하여 새 배열 생성
    const currentRules = Array.isArray(data?.rules)
      ? data.rules.map((rule) => rule as StudyRequest.RuleType)
      : ([] as StudyRequest.RuleType[]);
    const hasFine = currentRules.includes('FINE');

    // FINE 규칙 토글
    const updatedRules = hasFine
      ? currentRules.filter((rule) => rule !== 'FINE')
      : ([...currentRules, 'FINE'] as StudyRequest.RuleType[]);

    // API request 데이터 준비
    const requestData: StudyRequest.PatchRules = {
      form: {
        form: online ? 'ONLINE' : 'OFFLINE',
      },
      rules: updatedRules,
      fine: fineAmounts,
    };

    // API 호출
    StudyService()
      .patchRules(token as string, requestData)
      .then(() => {
        toggleModal();
        showToastNobutton({ text1: '운영 규칙 변경 사항이 성공적으로 반영되었습니다.' });
      })
      .catch((error) => {
        console.error('운영 규칙 저장 오류:', error);
        showToastNobutton({ text1: '저장 중 오류가 발생했습니다. 다시 시도해주세요.' });
      });
  };

  // 온라인/오프라인 전환 핸들러
  const handleModeChange = (isOnline: boolean) => {
    if (!token) return;

    setOnline(isOnline);
    const currentRules = Array.isArray(data?.rules)
      ? data.rules.map((rule) => rule as StudyRequest.RuleType)
      : ([] as StudyRequest.RuleType[]);

    const requestData: StudyRequest.PatchRules = {
      form: {
        form: isOnline ? 'ONLINE' : 'OFFLINE',
      },
      rules: currentRules,
      fine: fineAmounts,
    };

    StudyService()
      .patchRules(token as string, requestData)
      .then(() => {
        showToastNobutton({
          text1: `모임 방법이 ${isOnline ? '온라인' : '오프라인'}으로 변경되었습니다.`,
        });
      })
      .catch(() => {
        setOnline(!isOnline);
        showToastNobutton({ text1: '저장 중 오류가 발생했습니다. 다시 시도해주세요.' });
      });
  };

  // 화면에 표시될 벌금 목록
  const fineListItems = [
    { title: '지각', type: 'tardiness' as const },
    { title: '결석', type: 'absence' as const },
    { title: '미인증', type: 'nonProof' as const },
  ];

  return (
    <ManageView>
      <Typography variant="heading3">운영 규칙 관리</Typography>
      <ManageBoxView style={[shadowStyles.shadow]}>
        <BoxTitle
          onPress={() =>
            router.push({
              pathname: `manage/${token}/study-schedule` as RelativePathString,
              params: {
                schedules: JSON.stringify(data?.schedules),
                stDate: data?.startDate,
                endDate: data?.endDate,
              },
            })
          }
        >
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
            {data?.startDate} - {data?.endDate}
          </Typography>
        </BoxTitle>
        <Contents>
          <Typography variant="body3">진행 요일 및 시간</Typography>
          {data?.schedules?.map((schedule) => (
            <Content key={schedule.endTime + schedule.weekOfDay}>
              <Typography variant="button" style={{ color: colors.gray[8] }}>
                {WeekofDay[schedule.weekOfDay]}
              </Typography>
              <Typography variant="button" style={{ color: colors.gray[8] }}>
                {schedule.stTime} - {schedule.endTime}
              </Typography>
            </Content>
          ))}
        </Contents>
      </ManageBoxView>
      <Box style={[shadowStyles.shadow]}>
        <Typography variant="button">모임 방법</Typography>
        <RadioGroup>
          <RadioBox onPress={() => handleModeChange(true)}>
            <Radio selected={online} />
            <Typography variant="body3" style={{ color: online ? colors.black : colors.gray[7] }}>
              온라인
            </Typography>
          </RadioBox>
          <RadioBox onPress={() => handleModeChange(false)}>
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
            {data?.ruleExp}
          </Typography>
        </View>
        <BoxContents>
          <Typography variant="body3">벌금</Typography>
          <Switch value={Boolean(data?.rules?.includes('FINE'))} onValueChange={saveRules} />
        </BoxContents>
        {fineListItems.map((item) => (
          <BoxContents key={item.type} onPress={() => openFineEdit(item.type)}>
            <Typography variant="body3" style={{ color: colors.gray[9] }}>
              {item.title}
            </Typography>
            <Typography variant="body3" style={{ marginLeft: 'auto' }}>
              {fineAmounts[item.type].toLocaleString()}원
            </Typography>
            <Icon name="arrow-right-outline" stroke={colors.gray[7]} />
          </BoxContents>
        ))}
      </ManageBoxView>
      <BottomSheetComp
        bottomSheetModalRef={bottomSheetModalRef}
        component={
          <View style={{ padding: 40, gap: 12 }}>
            <Typography variant="button">
              {selectedFineType === 'tardiness' ? '지각' : selectedFineType === 'absence' ? '결석' : '미인증'}
            </Typography>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 12 }}>
              <TextField
                placeholder="벌금 가격을 입력해주세요."
                value={value}
                onChangeText={setvalue}
                keyboardType="number-pad"
                style={{ width: '90%' }}
              />
              <Typography variant="body2">원</Typography>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                marginTop: 40,
                justifyContent: 'center',
              }}
            >
              <Button variant="outlined" onPress={() => bottomSheetModalRef.current?.dismiss()}>
                취소
              </Button>
              <Button variant="contained" onPress={updateFineAmount}>
                수정하기
              </Button>
            </View>
          </View>
        }
      />
      <Button onPress={saveRules} variant="contained" style={{ marginHorizontal: 'auto' }}>
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
  const { token } = useLocalSearchParams();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  return <FlatList data={[null]} renderItem={() => <Rule {...{ token, bottomSheetModalRef }} />} />;
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

const BoxBottom = styled.Pressable`
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
