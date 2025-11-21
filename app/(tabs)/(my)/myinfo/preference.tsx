import React from 'react';
import Typography from '@/components/atoms/Typography';
import { styled } from 'styled-components/native';
import { colors } from '@/theme';
import { AvatarsService } from '@/apis';
import { Alert, ActivityIndicator, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import Chip from '@/components/atoms/Badge';
import RowView from '@/components/atoms/View/RowView';
import IconButton from '@/components/molecules/IconButton';
import SliderSection from '@/components/molecules/SliderSection';
import Button from '@/components/atoms/Button';
import { CustomDropdown } from '@/components/atoms/Dropdown';
import { sgis } from '@/assets/data/sgis';

const CATEGORIES: SharedStudy.Category[] = ['입시', '고시', '취업', '자격증', '사이드프로젝트', '기타'];

const FORM_OPTIONS: { label: string; value: 'ONLINE' | 'OFFLINE' }[] = [
  { label: '온라인', value: 'ONLINE' },
  { label: '오프라인', value: 'OFFLINE' },
];

const DAYS: { label: string; value: SharedStudy.PossibleDays }[] = [
  { label: '월', value: 'MON' },
  { label: '화', value: 'TUE' },
  { label: '수', value: 'WED' },
  { label: '목', value: 'THU' },
  { label: '금', value: 'FRI' },
  { label: '토', value: 'SAT' },
  { label: '일', value: 'SUN' },
];

const TIME_ZONES: { label: string; value: SharedStudy.TimeZone }[] = [
  { label: '오전', value: 'MORNING' },
  { label: '오후', value: 'AFTERNOON' },
  { label: '저녁', value: 'EVENING' },
];

const Index = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [category, setCategory] = React.useState<SharedStudy.Category | null>(null);
  const [form, setForm] = React.useState<'ONLINE' | 'OFFLINE' | null>(null);
  const [possibleDays, setPossibleDays] = React.useState<SharedStudy.PossibleDays[]>([]);
  const [timeZone, setTimeZone] = React.useState<SharedStudy.TimeZone | null>(null);
  const [minParticipationCount, setMinParticipationCount] = React.useState(1);
  const [maxParticipationCount, setMaxParticipationCount] = React.useState(10);
  const [province, setProvince] = React.useState<string>('');
  const [city, setCity] = React.useState<string>('');
  const [provinceitems, setProvinceItems] = React.useState([{ label: '', value: '' }]);
  const [stateitems, setStateitems] = React.useState([{ label: '', value: '' }]);
  const [reset, setReset] = React.useState(0);

  React.useEffect(() => {
    setProvinceItems(Object.keys(sgis).map((key) => ({ label: key, value: key })));
    if (province) {
      setStateitems(sgis[province].map((item) => ({ label: item, value: item })));
    }
  }, [province]);

  const toggleDay = (day: SharedStudy.PossibleDays) => {
    setPossibleDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  const handleReset = () => {
    setCategory(null);
    setForm(null);
    setPossibleDays([]);
    setTimeZone(null);
    setMinParticipationCount(1);
    setMaxParticipationCount(10);
    setProvince('');
    setCity('');
    setReset((prev) => prev + 1);
  };

  const isFormValid = () => {
    return category && form && possibleDays.length > 0 && timeZone && province && city;
  };

  const handleSave = async () => {
    try {
      if (!category || !form || !timeZone || !province || !city) {
        Alert.alert('알림', '모든 항목을 선택해주세요.');
        return;
      }

      if (possibleDays.length === 0) {
        Alert.alert('알림', '참여 가능한 요일을 최소 1개 이상 선택해주세요.');
        return;
      }

      if (minParticipationCount > maxParticipationCount) {
        Alert.alert('알림', '최소 인원이 최대 인원보다 클 수 없습니다.');
        return;
      }

      setIsLoading(true);
      const { updatePreference } = AvatarsService();

      await updatePreference({
        category,
        form,
        possibleDays,
        timeZone,
        minParticipationCount,
        maxParticipationCount,
        province,
        city,
      });

      Alert.alert('완료', '선호 설정이 저장되었습니다.', [
        {
          text: '확인',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('선호 설정 저장 실패:', error);
      Alert.alert('오류', '선호 설정 저장에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 40 }}>
        <ContentWrapper>
          <RowView style={{ justifyContent: 'space-between', marginBottom: 28 }}>
            <Typography variant="heading3">선호 설정</Typography>
            <IconButton name="reset-outline" onPress={handleReset} />
          </RowView>

          <SectionContainer>
            <Typography variant="body2" style={{ marginBottom: 12, color: colors.gray[9] }}>
              관심 카테고리
            </Typography>
            <RowView style={{ gap: 8, flexWrap: 'wrap' }}>
              {CATEGORIES.map((item) => (
                <Chip
                  key={item}
                  variant={category === item ? 'primary' : 'white'}
                  value={item}
                  onPress={() => setCategory(item)}
                />
              ))}
            </RowView>
          </SectionContainer>

          <SectionContainer>
            <Typography variant="body2" style={{ marginBottom: 12, color: colors.gray[9] }}>
              진행 방식
            </Typography>
            <RowView style={{ gap: 8 }}>
              {FORM_OPTIONS.map((item) => (
                <Chip
                  key={item.value}
                  variant={form === item.value ? 'primary' : 'white'}
                  value={item.label}
                  onPress={() => setForm(item.value)}
                />
              ))}
            </RowView>
          </SectionContainer>

          <SectionContainer>
            <RowView style={{ justifyContent: 'space-between', marginBottom: 12 }}>
              <Typography variant="body2" style={{ color: colors.gray[9] }}>
                지역 선택
              </Typography>
            </RowView>

            <RowView style={{ justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
              <View style={{ flex: 1 }}>
                <CustomDropdown
                  key={reset}
                  defaultValue={province}
                  items={provinceitems}
                  placeholder="시/도"
                  onChangeValue={(value: any) => {
                    setProvince(value || '');
                    if (!value) {
                      setCity('');
                    }
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <CustomDropdown
                  key={`${reset}-${province}`}
                  defaultValue={city}
                  items={stateitems}
                  placeholder="구/군"
                  onChangeValue={(value: any) => {
                    setCity(value || '');
                  }}
                />
              </View>
            </RowView>
          </SectionContainer>

          <SectionContainer>
            <Typography variant="body2" style={{ marginBottom: 12, color: colors.gray[9] }}>
              참여 가능 요일
            </Typography>
            <RowView style={{ gap: 8 }}>
              {DAYS.map((item) => (
                <Chip
                  key={item.value}
                  variant={possibleDays.includes(item.value) ? 'primary' : 'white'}
                  value={item.label}
                  onPress={() => toggleDay(item.value)}
                />
              ))}
            </RowView>
          </SectionContainer>

          <SectionContainer>
            <Typography variant="body2" style={{ marginBottom: 12, color: colors.gray[9] }}>
              선호 시간대
            </Typography>
            <RowView style={{ gap: 8 }}>
              {TIME_ZONES.map((item) => (
                <Chip
                  key={item.value}
                  variant={timeZone === item.value ? 'primary' : 'white'}
                  value={item.label}
                  onPress={() => setTimeZone(item.value)}
                />
              ))}
            </RowView>
          </SectionContainer>

          <SectionContainer>
            <SliderSection
              min={1}
              max={10}
              minValue={minParticipationCount}
              maxValue={maxParticipationCount}
              onValueChange={(min, max) => {
                setMinParticipationCount(min);
                setMaxParticipationCount(max);
              }}
            />
          </SectionContainer>

          <Button
            variant="contained"
            fullWidth
            onPress={handleSave}
            disabled={isLoading || !isFormValid()}
            style={{ marginTop: 8, marginBottom: 40 }}
          >
            {isLoading ? <ActivityIndicator color={colors.white} size="small" /> : '저장하기'}
          </Button>
        </ContentWrapper>
      </ScrollView>
    </Container>
  );
};

export default Index;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

const ContentWrapper = styled.View`
  padding: 20px;
  gap: 28px;
`;

const SectionContainer = styled.View`
  gap: 12px;
`;
