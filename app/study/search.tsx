import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, View, Pressable, FlatList, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import Icon from '@/components/atoms/Icon';
import { useRouter } from 'expo-router';
import { StudyService, SearchHistoryService } from '@/apis';
import CardList from '@/components/molecules/CardList';
import FilterBottomSheet from '@/components/organisms/FilterBottomSheet';
import { useRecommendationContext } from '@/context/Recommendation';

const OuterContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: white;
`;

const SearchInputContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  background-color: ${colors.white};
  border-radius: 20px;
  padding-left: 10px;
  padding-right: 10px;
  height: 44px;
  flex: 1;
  border-width: 1px;
  border-color: ${colors.primary};
`;

const SearchInput = styled(TextInput)`
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
  font-family: 'Pretendard-Medium';
  font-weight: 500;
  font-size: 16px;
  letter-spacing: -0.08px;
  text-align: left;
`;

const HeaderContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  height: 76px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 20px;
  padding-right: 20px;
`;

const BackButton = styled(Pressable)`
  margin-right: 10px;
  justify-content: center;
`;

const RecentSearchContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 24px;
`;

const DeleteButton = styled(Pressable)``;

const RecentSearchItem = styled(Pressable)`
  flex-direction: row;
  gap: 16px;
  margin-bottom: 12px;
`;
const SearchScreen = () => {
  const { searchData, setSearchData } = useRecommendationContext();
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [submitText, setSubmitText] = useState('');
  const [results, setResults] = useState<StudyResponse.StudyInfo[]>([]);
  const [recentSearches, setRecentSearches] = useState<SearchHistoryResponse.HistoryItem[]>([]);

  // 화면 진입 시 검색 기록 로드
  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const history = await SearchHistoryService().getHistory();
      setRecentSearches(history || []);
    } catch (error) {
      console.error('검색 기록 로드 실패:', error);
      setRecentSearches([]);
    }
  };

  useEffect(() => {
    if (searchText.length === 0) {
      setSubmitText('');
      setResults([]);
    }
  }, [searchText]);

  useEffect(() => {
    if (submitText.length > 0) {
      performSearch();
    }
  }, [submitText, searchData]);

  const performSearch = async () => {
    try {
      const res = await StudyService().search({
        keyword: submitText,
        pageNumber: 1,
        pageSize: 10,
        ...searchData,
      });
      setResults(res.content || []);
      // 검색 성공 시 기록 새로고침
      await loadSearchHistory();
    } catch (error) {
      console.error('검색 실패:', error);
      setResults([]);
    }
  };

  const renderItem = ({ item }: { item: SearchHistoryResponse.HistoryItem }) => (
    <RecentSearchItem onPress={() => handleRecentSearch(item.keyword)}>
      <Icon name="clock" />
      <Typography variant="body2" style={{ color: colors.gray[10] }}>
        {item.keyword}
      </Typography>
    </RecentSearchItem>
  );

  const handleChangeText = (text: string) => {
    setSearchText(text);
  };

  const clearText = () => {
    setSearchText('');
  };

  const handleSearchSubmit = () => {
    if (searchText.trim().length > 0) {
      setSubmitText(searchText);
      Keyboard.dismiss();
    }
  };

  const handleRecentSearch = (keyword: string) => {
    setSearchText(keyword);
    setSubmitText(keyword);
    Keyboard.dismiss();
  };

  const handleDeleteAll = () => {
    setRecentSearches([]);
  };
  return (
    <OuterContainer>
      <HeaderContainer>
        <BackButton onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </BackButton>
        <SearchInputContainer>
          <Icon name="search" fill={colors.primary} />
          <SearchInput
            placeholder="검색어를 입력하세요."
            placeholderTextColor={colors.primary}
            value={searchText}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSearchSubmit}
          />
          {searchText.length > 0 && (
            <Pressable onPress={clearText}>
              <Icon name="close-outline" width={24} height={24} />
            </Pressable>
          )}
        </SearchInputContainer>
      </HeaderContainer>
      {submitText.length === 0 ? (
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ alignItems: 'flex-end' }}>
            <FilterBottomSheet {...{ searchData, setSearchData }} />
          </View>
          <RecentSearchContainer>
            <Typography variant="subtitle2">최근 검색</Typography>
            <DeleteButton onPress={handleDeleteAll}>
              <Typography variant="body2" style={{ color: colors.gray[7] }}>
                전체 삭제
              </Typography>
            </DeleteButton>
          </RecentSearchContainer>
          {recentSearches.length > 0 ? (
            <FlatList
              data={recentSearches}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{
                padding: 0,
                margin: 0,
              }}
            />
          ) : (
            <View style={{ paddingTop: 20 }}>
              <Typography variant="body3" style={{ color: colors.gray[7], textAlign: 'center' }}>
                최근 검색 내역이 없습니다
              </Typography>
            </View>
          )}
        </View>
      ) : (
        <View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 16,
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <Typography variant="subtitle2">총 {results.length}개</Typography>
            <FilterBottomSheet {...{ searchData, setSearchData }} />
          </View>
          {results.length > 0 ? (
            <CardList data={results} />
          ) : (
            <View style={{ paddingTop: 40, paddingHorizontal: 20 }}>
              <Typography variant="body3" style={{ color: colors.gray[7], textAlign: 'center' }}>
                검색 결과가 없습니다
              </Typography>
            </View>
          )}
        </View>
      )}
    </OuterContainer>
  );
};

export default SearchScreen;
