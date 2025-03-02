import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
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
import Icon from '@/components/atoms/Icon';
import { colors } from '@/theme';

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
  const [isSearchDataEmpty, setIsSearchDataEmpty] = useState(true);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onclickClose = async () => {
    await setSearchData(searchDataCopy);
    console.log(searchDataCopy);
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

  useEffect(() => {
    setIsSearchDataEmpty(
      !(
        searchDataCopy.form ||
        searchDataCopy.category ||
        searchDataCopy.possibleDays ||
        searchDataCopy.timeZone ||
        searchDataCopy.minParticipationCount ||
        searchDataCopy.minParticipationCount ||
        searchDataCopy.province ||
        searchDataCopy.city
      ),
    );
  }, [searchDataCopy]);

  return (
    <View style={styles.container}>
      <Pressable
        style={{ ...styles.badge, backgroundColor: isSearchDataEmpty ? colors.white : colors.primary }}
        onPress={handlePresentModalPress}
      >
        <Typography
          variant="body3"
          style={{
            color: isSearchDataEmpty ? colors.gray[9] : colors.white,
          }}
        >
          맞춤 스터디 설정
        </Typography>
        <Icon
          name="arrow-down-outline"
          width={16}
          height={16}
          stroke={isSearchDataEmpty ? colors.gray[9] : colors.white}
        />
      </Pressable>
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
                        onPress={() => {
                          if (searchDataCopy?.form === 'ONLINE') {
                            delete searchDataCopy.form;
                            setSearchDataCopy({ ...searchDataCopy });
                          } else {
                            setSearchDataCopy({ ...searchDataCopy, form: 'ONLINE' });
                          }
                        }}
                      />
                      <Chip
                        variant={searchDataCopy?.form === 'OFFLINE' ? 'primary' : 'white'}
                        value="오프라인"
                        onPress={() => {
                          if (searchDataCopy?.form === 'OFFLINE') {
                            delete searchDataCopy.form;
                            setSearchDataCopy({ ...searchDataCopy });
                          } else {
                            setSearchDataCopy({ ...searchDataCopy, form: 'OFFLINE' });
                          }
                        }}
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
                          onPress={() => {
                            if (searchDataCopy?.category === item) {
                              delete searchDataCopy.category;
                              setSearchDataCopy({ ...searchDataCopy });
                            } else {
                              setSearchDataCopy({ ...searchDataCopy, category: item });
                            }
                          }}
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
                            if (newPossibleDays.length === 0) {
                              delete searchDataCopy.possibleDays;
                              setSearchDataCopy({ ...searchDataCopy });
                            } else {
                              setSearchDataCopy({ ...searchDataCopy, possibleDays: newPossibleDays });
                            }
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
                          onPress={() => {
                            if (searchDataCopy?.timeZone === item.value) {
                              delete searchDataCopy.timeZone;
                              setSearchDataCopy({ ...searchDataCopy });
                            } else {
                              setSearchDataCopy({ ...searchDataCopy, timeZone: item.value });
                            }
                          }}
                        />
                      ))}
                    </RowView>
                  </View>
                  <SliderSection
                    min={1}
                    max={10}
                    minValue={searchDataCopy.minParticipationCount || 1}
                    maxValue={searchDataCopy.maxParticipationCount || 10}
                    onValueChange={(min, max) => {
                      if (min === 1 && max === 10) {
                        delete searchDataCopy.minParticipationCount;
                        delete searchDataCopy.maxParticipationCount;
                        setSearchDataCopy({ ...searchDataCopy });
                      } else {
                        setSearchDataCopy({
                          ...searchDataCopy,
                          minParticipationCount: min,
                          maxParticipationCount: max,
                        });
                      }
                    }}
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
                        if (value) {
                          setSearchDataCopy({ ...searchDataCopy, province: value });
                        } else {
                          delete searchDataCopy.province;
                        }
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
                        if (value) setSearchDataCopy({ ...searchDataCopy, city: value });
                        else delete searchDataCopy.city;
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
  badge: {
    borderRadius: 999,
    borderStyle: 'solid',
    borderColor: colors.sub1,
    borderWidth: 1,
    width: 138,
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    color: colors.gray[9],
  },
});

export default FilterBottomSheet;
