import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import IconButton from '@/components/molecules/IconButton';
import BottomSheet from '@/components/molecules/BottomSheet';
import Typography from '@/components/atoms/Typography';
import RowView from '@/components/atoms/View/RowView';
import Chip from '@/components/atoms/Badge';
import CloseHeader from '@/components/molecules/BottomSheet/CloseHeader';
import SliderSection from '@/components/molecules/SliderSection';
import { CustomDropdown } from '@/components/atoms/Dropdown';
import { sgis } from '@/assets/data/sgis';

const Category: SharedStudy.Category[] = ['입시', '고시', '취업', '자격증', '사이드프로젝트', '기타'];
const TimeZone: { label: string; value: SharedStudy.TimeZone }[] = [
  { label: '오전 시간대', value: 'MORNING' },
  { label: '오후 시간대', value: 'AFTERNOON' },
  { label: '저녁 시간대', value: 'EVENING' },
];
const PossibleDays: { label: string; value: SharedStudy.PossibleDays }[] = [
  { label: '월요일', value: 'MON' },
  { label: '화요일', value: 'TUE' },
  { label: '수요일', value: 'WED' },
  { label: '목요일', value: 'THU' },
  { label: '금요일', value: 'FRI' },
  { label: '토요일', value: 'SAT' },
  { label: '일요일', value: 'SUN' },
];

const FilterBottomSheet = ({
  searchData,
  setSearchData,
}: {
  searchData: StudyRequest.Recommendation;
  setSearchData: React.Dispatch<React.SetStateAction<StudyRequest.Recommendation>>;
}) => {
  const [searchDataCopy, setSearchDataCopy] = useState<StudyRequest.Recommendation>(searchData);
  const [province, setProvince] = useState<string | null>(null);
  const [state] = useState<string | null>(null);
  const [provinceitems, setProvinceItems] = useState([{ label: '', value: '' }]);
  const [stateitems, setStateitems] = useState([{ label: '', value: '' }]);
  const [reset, setReset] = useState(0);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onclickClose = async () => {
    await setSearchData(searchDataCopy);
    handleCloseModalPress();
  };

  useEffect(() => {
    setProvinceItems(Object.keys(sgis).map((key) => ({ label: key, value: key })));
    if (province) {
      setStateitems(
        sgis[province].map((item) => {
          return { label: item, value: item };
        }),
      );
    }
  }, [province, state]);

  return (
    <View style={styles.container}>
      <IconButton name="controller" onPress={handlePresentModalPress} />

      <BottomSheet
        snapPoints={['90%']}
        bottomSheetModalRef={bottomSheetModalRef}
        enableContentPanningGesture={false}
        component={
          <View style={{ flex: 1 }}>
            <CloseHeader onPress={onclickClose} />

            <View style={{ flex: 1 }}>
              <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: 16 }}>
                <View style={{ gap: 28, marginBottom: 32 }}>
                  <RowView style={{ justifyContent: 'space-between' }}>
                    <Typography variant="body1">스터디 설정</Typography>
                    <IconButton name="reset-outline" onPress={() => setSearchDataCopy({})} />
                  </RowView>

                  <View style={{ gap: 12 }}>
                    <Typography variant="body3">모임 형태</Typography>
                    <RowView style={{ gap: 8 }}>
                      <Chip
                        variant={searchDataCopy?.form === 'ONLINE' ? 'primary' : 'white'}
                        value="온라인"
                        onPress={() =>
                          setSearchDataCopy({
                            ...searchDataCopy,
                            form: searchDataCopy?.form === 'ONLINE' ? undefined : 'ONLINE',
                          })
                        }
                      />
                      <Chip
                        variant={searchDataCopy?.form === 'OFFLINE' ? 'primary' : 'white'}
                        value="오프라인"
                        onPress={() =>
                          setSearchDataCopy({
                            ...searchDataCopy,
                            form: searchDataCopy?.form === 'OFFLINE' ? undefined : 'OFFLINE',
                          })
                        }
                      />
                    </RowView>
                  </View>

                  <View style={{ gap: 12 }}>
                    <Typography variant="body3">관심 분야</Typography>
                    <RowView style={{ gap: 8 }}>
                      {Category.map((item) => (
                        <Chip
                          key={item}
                          variant={searchDataCopy?.category === item ? 'primary' : 'white'}
                          value={item}
                          onPress={() =>
                            setSearchDataCopy({
                              ...searchDataCopy,
                              category: searchDataCopy?.category === item ? undefined : item,
                            })
                          }
                        />
                      ))}
                    </RowView>
                  </View>

                  <View style={{ gap: 12 }}>
                    <Typography variant="body3">참가 가능 요일</Typography>
                    <RowView style={{ gap: 8 }}>
                      {PossibleDays.map((item) => (
                        <Chip
                          key={item.value}
                          variant={searchDataCopy?.possibleDays?.includes(item.value) ? 'primary' : 'white'}
                          value={item.label}
                          onPress={() => {
                            const newPossibleDays = searchDataCopy.possibleDays?.includes(item.value)
                              ? searchDataCopy.possibleDays.filter((day) => day !== item.value)
                              : [...(searchDataCopy.possibleDays || []), item.value];
                            setSearchDataCopy({ ...searchDataCopy, possibleDays: newPossibleDays });
                          }}
                        />
                      ))}
                    </RowView>
                  </View>
                  <View style={{ gap: 12 }}>
                    <Typography variant="body3">참가 가능 시간대</Typography>
                    <RowView style={{ gap: 8 }}>
                      {TimeZone.map((item) => (
                        <Chip
                          key={item.value}
                          variant={searchDataCopy?.timeZone === item.value ? 'primary' : 'white'}
                          value={item.label}
                          onPress={() =>
                            setSearchDataCopy({
                              ...searchDataCopy,
                              timeZone: searchDataCopy?.timeZone === item.value ? undefined : item.value,
                            })
                          }
                        />
                      ))}
                    </RowView>
                  </View>
                  <SliderSection
                    min={1}
                    max={10}
                    minValue={searchDataCopy.minParticipationCount || 1}
                    maxValue={searchDataCopy.maxParticipationCount || 10}
                    onValueChange={(min, max) =>
                      setSearchDataCopy({ ...searchDataCopy, minParticipationCount: min, maxParticipationCount: max })
                    }
                  />
                </View>

                <RowView style={{ justifyContent: 'space-between', marginBottom: 17.5 }}>
                  <Typography variant="body1">지역 선택</Typography>
                  <IconButton
                    name="reset-outline"
                    onPress={() => {
                      setReset((prev) => prev + 1);
                      setStateitems([{ label: '', value: '' }]);
                      setSearchDataCopy({
                        ...searchDataCopy,
                        province: undefined,
                        city: undefined,
                      });
                    }}
                  />
                </RowView>

                <RowView style={{ justifyContent: 'space-between', gap: 12, paddingBottom: 56 }}>
                  <View style={{ flex: 1 }}>
                    <CustomDropdown
                      key={reset}
                      defaultValue={searchDataCopy.province}
                      items={provinceitems}
                      placeholder="시/도"
                      onChangeValue={(value) => {
                        setProvince(value);
                        setSearchDataCopy({ ...searchDataCopy, province: value || undefined });
                      }}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <CustomDropdown
                      key={reset}
                      defaultValue={searchDataCopy.city}
                      items={stateitems}
                      placeholder="구/군"
                      onChangeValue={(value) => {
                        setSearchDataCopy({ ...searchDataCopy, city: value || undefined });
                      }}
                    />
                  </View>
                </RowView>
              </ScrollView>
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
});

export default FilterBottomSheet;
