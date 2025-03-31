import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, View, Pressable, FlatList, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import Typography from '@/components/atoms/Typography';
import { colors } from '@/theme';
import Icon from '@/components/atoms/Icon';
import { useRouter } from 'expo-router';
import { StudyService } from '@/apis';
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
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Example 1',
    'Example 2',
    'Example 3',
    'Example 4',
    'Example 5',
  ]);

  useEffect(() => {
    if (searchText.length === 0) {
      setSubmitText('');
      setResults([]);
    }
  }, [searchText]);

  useEffect(() => {
    if (submitText.length > 0) {
      StudyService()
        .search(submitText, 1, 10)
        .then((res) => {
          setResults(res.content);
        });
    }
  }, [submitText]);

  const renderItem = ({ item }: { item: string }) => (
    <RecentSearchItem onPress={() => handleRecentSearch(item)}>
      <Icon name="clock" />
      <Typography variant="body2" style={{ color: colors.gray[10] }}>
        {item}
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
      setRecentSearches((prev) => [searchText, ...prev]);
      setSubmitText(searchText);
      Keyboard.dismiss();
    }
  };

  const handleRecentSearch = (item: string) => {
    setSearchText(item);
    setSubmitText(item);
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
          <RecentSearchContainer>
            <Typography variant="subtitle2">최근 검색</Typography>
            <DeleteButton onPress={handleDeleteAll}>
              <Typography variant="body2" style={{ color: colors.gray[7] }}>
                전체 삭제
              </Typography>
            </DeleteButton>
          </RecentSearchContainer>
          <FlatList
            data={recentSearches}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              padding: 0,
              margin: 0,
            }}
          />
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
          <CardList data={results} />
        </View>
      )}
    </OuterContainer>
  );
};

export default SearchScreen;
